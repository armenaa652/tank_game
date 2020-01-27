var bullets = [];
var balloons = [];
var tanks = [];
var powerSlider;
var angelSlider;

let tankNum = 5;
let tankTurn = 0;

let powerMIN = 1;
let powerMAX = 20;
let powerSTEP = .01;
let angleMIN = -3 * Math.PI / 2;
let angleMAX = Math.PI / 2;
let angleSTEP = .01;

var power = Math.ceil((powerMAX - powerMIN) / 2);
var angle = -Math.PI / 2;

var moveTankRight = false;
var moveTankLeft = false;
var angleTankUp = false;
var angleTankDown = false;
var powerTankUp = false;
var powerTankDown = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    powerSlider = createSlider(powerMIN, powerMAX, power, powerSTEP);
    powerSlider.position(windowWidth / 2 - 75, windowHeight - 32);
    angleSlider = createSlider(angleMIN, angleMAX, angle, angleSTEP);
    angleSlider.position(windowWidth / 2 - 75, windowHeight - 62);
    let balloonSize = 100;
    let balloonAmount = 1;
    for (let i = 0; i < balloonAmount; i++)
        balloons.push(new balloon(random(balloonSize, windowWidth - balloonSize), random(balloonSize, windowHeight - balloonSize), balloonSize));
    terrain = new terrain();
    initialTankPos = terrain.generateHeights();
    //tank = new tank(windowWidth / 6, windowHeight / 2);
    //tanks.push(new tank(initialTankPos[0], initialTankPos[1]));

    for (let i = 0; i < tankNum; i++) {
        tanks.push(new tank(((2 * i + 1) / (2 * tankNum)) * windowWidth, 0));
        tanks[i].angle = angle;
        tanks[i].power = power;
        moveTank(tanks[i].xinit, tanks[i]);
    }

}

function draw() {
    background(135, 206, 250);
    if (tankNum) {
        tanks[tankTurn].showHealthBar();
        for (tank in tanks) {
            if (tanks[tank].health <= 0) {
                tanks.splice(tank, 1);
                //tankTurn = (tankTurn + 1) % tankNum;
                if (!(tankTurn < tank) && tankTurn - 1 > 0)
                    tankTurn--;
                tankNum--;
            }
            else
                tanks[tank].show();
        }
    }
    broken:
    for (let bullet in bullets) {
        bullets[bullet].show();
        bullets[bullet].update();

        for (let balloon in balloons)
            if (bulletHitBalloon(bullets[bullet], balloons[balloon]))
                balloons[balloon].color = bullets[bullet].color;
        for (let tank in tanks)
            if (bulletHitTank(bullets[bullet], tanks[tank])) {
                //tanks[tank].color = [255, 0, 0];
                fill(255, 0, 0);
                ellipse(tanks[tank].xinit, tanks[tank].yinit, tanks[tank].size, tanks[tank].size);
                tanks[tank].health -= 20;
                bullets.splice(bullet, 1);
                break broken;
            }
        if (bullets[bullet].t > 300)
            bullets.splice(bullet, 1);
        if (bulletHitTerrain(bullets[bullet]))
            bullets.splice(bullet, 1);
    }
    terrain.show();

    for (let balloon in balloons) {
        balloons[balloon].show();
        balloons[balloon].update();
    }


    if (tankNum) {
        if (mouseIsPressed) {
            power = powerSlider.value();
            angle = angleSlider.value();
            tanks[tankTurn].angle = angleSlider.value();
        } else {
            powerSlider.value(power);
            angleSlider.value(angle);
            tanks[tankTurn].angle = angleSlider.value();
        }

        if (moveTankRight)
            if (tanks[tankTurn].xinit + tanks[tankTurn].size / 2 < windowWidth) {
                moveTank(tanks[tankTurn].xinit + 5, tanks[tankTurn]);
            }

        if (moveTankLeft)
            if (tanks[tankTurn].xinit - tanks[tankTurn].size / 2 > 0) {
                moveTank(tanks[tankTurn].xinit - 5, tanks[tankTurn]);
            }

        if (angleTankUp)
            if (angle < angleMAX)
                angle += .03;

        if (angleTankDown)
            if (angle > angleMIN)
                angle -= .03;

        if (powerTankUp)
            if (power < powerMAX)
                power += .1;

        if (powerTankDown)
            if (power > powerMIN)
                power -= .1;
    }

}
function mousePressed() {
    if (tankNum)
        tanks[tankTurn].health -= 50;
}
function keyPressed() {
    if (tankNum) {
        if (keyCode == 32)
            bullets.push(new bullet(powerSlider.value(), angleSlider.value(), tanks[tankTurn].xfinal, tanks[tankTurn].yfinal, tanks[tankTurn].color));
        if (keyCode == 221) {
            tanks[tankTurn].power = power;
            tankTurn = (tankTurn + 1) % tankNum;
            powerSlider.value(tanks[tankTurn].power);
            angleSlider.value(tanks[tankTurn].angle);
            angle = angleSlider.value();
            power = powerSlider.value();
        }
        if (keyCode == 219) {
            tanks[tankTurn].power = power;
            tankTurn = (tankTurn + tankNum - 1) % tankNum;
            powerSlider.value(tanks[tankTurn].power);
            angleSlider.value(tanks[tankTurn].angle);
            angle = angleSlider.value();
            power = powerSlider.value();
        }
        if (keyCode == 68)   //d
            moveTankRight = true;
        if (keyCode == 65)   //a
            moveTankLeft = true;
        if (keyCode == 87)   //w
            angleTankDown = true;
        if (keyCode == 83)   //s
            angleTankUp = true;
        if (keyCode == 69)  //e
            powerTankUp = true;
        if (keyCode == 81)  //q
            powerTankDown = true;
    }
}

function keyReleased() {
    if (keyCode == 68)  //d
        moveTankRight = false;
    if (keyCode == 65)  //a
        moveTankLeft = false;
    if (keyCode == 87)  //w
        angleTankDown = false;
    if (keyCode == 83)  //s
        angleTankUp = false;
    if (keyCode == 69)  //e
        powerTankUp = false;
    if (keyCode == 81)  //q
        powerTankDown = false;
}

function bulletHitBalloon(bullet, balloon) {
    if (sqrt(pow((balloon.xpos - bullet.xpos), 2) + pow((balloon.ypos - bullet.ypos), 2)) < abs(balloon.size - bullet.size)) {
        return true;
    } else {
        return false;
    }
}

function moveTank(xpos, tank) {
    let ypos = windowHeight / 2;
    let xindex = 0;
    for (let i = 0, xpoints = 0; i < terrain.arrSize; i++) {
        if (xpos <= xpoints) {
            xindex = i;
            break;
        }
        xpoints += windowWidth / terrain.segments;
    }
    ypos = (terrain.yheights[xindex] - terrain.yheights[xindex - 1]) / (terrain.xheights[xindex] - terrain.xheights[xindex - 1]) * (xpos - terrain.xheights[xindex]) + terrain.yheights[xindex];
    tank.xindex = xindex
    tank.xinit = xpos;
    tank.yinit = ypos;
}

function bulletHitTerrain(bullet) {
    //let ypos = windowHeight / 2;
    let xindex = 0;
    for (let i = 0, xpoints = 0; i < terrain.arrSize; i++) {
        if (bullet.xpos <= xpoints) {
            xindex = i;
            break;
        }
        xpoints += windowWidth / terrain.segments;
    }
    //console.log(xindex);
    ypos = (terrain.yheights[xindex] - terrain.yheights[xindex - 1]) / (terrain.xheights[xindex] - terrain.xheights[xindex - 1]) * (bullet.xpos - terrain.xheights[xindex]) + terrain.yheights[xindex];
    if (ypos <= bullet.ypos) {
        if (abs(terrain.xheights[xindex] - bullet.xpos) < abs(terrain.xheights[xindex - 1] - bullet.xpos))
            deleteTerrain(xindex);
        else
            deleteTerrain(xindex - 1);
        fill(255)
        strokeWeight(0);
        ellipse(bullet.xpos, bullet.ypos + bullet.size * 5, bullet.size * 10, bullet.size * 10);
        return true;
    }
    return false;
}

function deleteTerrain(x) {
    terrain.explodeTerrain(x);
    for (tank in tanks)
        moveTank(tanks[tank].xinit, tanks[tank]);
}

function bulletHitTank(bullet, tank) {
    if (sqrt(pow((tank.xinit - bullet.xpos), 2) + pow((tank.yinit - bullet.ypos), 2)) < abs(tank.size - bullet.size)) {
        return true;
    } else {
        return false;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

class tank {
    constructor(xpos, ypos) {
        this.angle = 0;
        this.power = 0;
        this.xinit = xpos;
        this.yinit = ypos;
        this.xfinal = 0;
        this.yfinal = 0;
        this.length = 50;
        this.size = 50;
        this.speed = .1;
        this.xindex = 0;
        let healthMax = 100;
        this.health = healthMax;
        //this.color = [178, 34, 34];
        this.color = [random(255), random(255), random(255)];
        this.show = function () {
            let xangle = this.length * cos(this.angle);
            let yangle = this.length * sin(this.angle);
            this.xfinal = this.xinit + xangle
            this.yfinal = this.yinit + yangle

            fill(this.color);
            strokeWeight(5);
            line(this.xinit, this.yinit, this.xfinal, this.yfinal);
            strokeWeight(5);
            ellipse(this.xinit, this.yinit, this.size, this.size);
            strokeWeight(1);
        }

        this.showHealthBar = function () {
            let healthWidth = 350;
            let healthHeight = 45
            fill(0);
            strokeWeight(3);
            rectMode(CENTER);
            rect(windowWidth / 2, 50, healthWidth, healthHeight);

            fill(this.color);
            rectMode(CORNER);
            rect(windowWidth / 2 - healthWidth / 2, 50 - healthHeight / 2, healthWidth * (this.health / healthMax), healthHeight);
        }

        this.followMouse = function () {
            if (mouseX >= this.xinit)
                this.angle = atan((mouseY - this.yinit) / (mouseX - this.xinit));
            else
                this.angle = atan((mouseY - this.yinit) / (mouseX - this.xinit)) + PI;

        }

    }
}
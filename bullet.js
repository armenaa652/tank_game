class bullet {
    constructor(power, angle, xpos_init, ypos_init, color) {
        this.size = 10;

        let t = 0;
        let v_ox = power * cos(angle);
        let v_oy = power * sin(angle);
        let a = .1;
        this.xpos = xpos_init;
        this.ypos = ypos_init;

        this.color = color;// = [random(255), random(255), random(255)];
        this.show = function () {
            strokeWeight(2);
            fill(this.color);
            ellipse(this.xpos, this.ypos, this.size, this.size);
            strokeWeight(1);
        }

        this.update = function () {
            this.xpos = v_ox * t + xpos_init;
            this.ypos = .5 * a * t * t + v_oy * t + ypos_init;
            t++;
        }
    }
}
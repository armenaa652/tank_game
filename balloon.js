class balloon {
    constructor(xpos_init, ypos_init, size) {
        this.dirx = random(-1, 1);
        this.diry = random(-1, 1);
        this.xpos = xpos_init;
        this.ypos = ypos_init;
        this.size = size;
        this.color = [255, 255, 255];
        let speed = random(1, 10);
        this.show = function () {
            fill(this.color);
            ellipse(this.xpos, this.ypos, this.size, this.size);
        }
        this.update = function () {
            this.xpos += speed * this.dirx;
            this.ypos += speed * this.diry;
            if (this.xpos + this.size / 2 > windowWidth)
                this.dirx = -this.dirx;
            if (this.xpos - this.size / 2 < 0)
                this.dirx = -this.dirx;
            if (this.ypos + this.size / 2 > windowHeight)
                this.diry = -this.diry;
            if (this.ypos - this.size / 2 < 0)
                this.diry = -this.diry;
        }
    }
}
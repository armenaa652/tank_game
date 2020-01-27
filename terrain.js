class terrain {
    constructor() {
        this.yheights = [];
        this.xheights = [];
        this.segments = floor(random(5, 30));
        this.arrSize = this.segments + 1;
        let groundHeight = windowHeight - 75;
        this.show = function () {
            strokeWeight(5);
            fill(107, 142, 35);
            beginShape();
            vertex(windowWidth, windowHeight);
            vertex(0, windowHeight);
            for (let i = 0; i < this.arrSize; i++)
                vertex(this.xheights[i], this.yheights[i]);
            endShape(CLOSE);
            fill(87, 59, 12)
            beginShape();
            vertex(windowWidth, windowHeight);
            vertex(0, windowHeight);
            vertex(0, groundHeight);
            vertex(windowWidth, groundHeight);
            endShape(CLOSE);
            strokeWeight(1);
        }
        this.explodeTerrain = function (x) {
            if (this.yheights[x] + 100 < groundHeight)
                this.yheights[x] += 100;
            else
                this.yheights[x] = groundHeight;
        }
        this.generateHeights = function () {
            for (let i = 0, xpoints = 0; i < this.arrSize; i++) {
                let offset = floor(random(200));
                this.yheights.push(random(windowHeight / 2 - offset, windowHeight / 2 + offset));
                this.xheights.push(xpoints);
                xpoints += windowWidth / this.segments;
            }
            //this.yheights.length() = this.segments + 1;
            let index = floor(this.arrSize / 2);
            //console.log(this.segments, this.yheights, this.xheights, windowWidth);
            return [this.xheights[index], this.yheights[index]];
        }

    }
}
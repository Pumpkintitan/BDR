class Wall {
    constructor(x1, y1, x2, y2, type) {
        this.l1 = createVector(x1, y1)
        this.l2 = createVector(x2, y2)
        this.type = type
    }

    draw() {
        strokeWeight(2)
        stroke(0)
        line(this.l1.x, this.l1.y, this.l2.x, this.l2.y)
    }


}
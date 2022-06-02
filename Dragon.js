class Dragon {
    constructor(x,y) {
        this.pos = createVector(x, y)
        this.thrust = 0
        this.head = 0
    }

    draw() {
        rectMode(CORNERS);
        translate(this.pos.x, this.pos.y)
        rotate(-this.head)
        fill('blue')
        rect(-10,-20, 10, 20)
        fill('red')
        quad(-10, 0, -10, 10, -30, 40, -20, 15)
        fill('green')
        quad(-10, 0, -10, 10, -30, 40, -20, 15)
    }

    move() {
        this.head += 0.0
        this.pos.x += Math.sin(this.head) * this.thrust
        this.pos.y += Math.cos(this.head) * this.thrust
    }
}
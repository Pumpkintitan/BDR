class Dragon {
    constructor(x,y) {
        this.pos = createVector(x, y)
        this.vel = 0
        this.acc = 0
        this.head = 0
    }

    draw(sh, sw, st, debug) {
        rectMode(CORNERS);
        noStroke()
        translate(this.pos.x, this.pos.y)
        rotate(-this.head)
        if (debug) {
            // body
            fill('black')
            rect(-10,-25, 10, 20)

            // right wing
            fill('red')
            quad(-10, -5, -10, 5, -40*sw, 25*((sw+0.5)/1.5), -30*sw, 0*sw)
            fill('orange')
            quad(-40*sw, 25*((sw+0.5)/1.5), -55*sw, 20*((sw+0.5)/1.5), -70*sw, -15, -30*sw, 0*sw)

            // left wing
            fill('blue')
            quad(10, -5, 10, 5, 40*sw, 25*((sw+0.5)/1.5), 30*sw, 0*sw)
            fill('purple')
            quad(40*sw, 25*((sw+0.5)/1.5), 55*sw, 20*((sw+0.5)/1.5), 70*sw, -15, 30*sw, 0*sw)

            // head
            fill('yellow')
            quad(-10, 20, 10, 20, 13*((sh+1)/2), 30*sh, -13*((sh+1)/2), 30*sh)
            fill('darkgoldenrod')
            quad(-7*((sh+1)/2), 50*sh, 7*((sh+1)/2), 50*sh, 13*((sh+1)/2), 30*sh, -13*((sh+1)/2), 30*sh)

            // tail
            fill('green')
            quad(-7*st, -25, 7*st, -25, 2, -80*st, -2, -80*st)

            // hit box
            noFill()
            stroke(0,255,0)
            rect(-20, -35, 20, 30)
        } else {
            fill('blue')
            rect(-10,-25, 10, 20)
            
            // right wing
            quad(-10, -5, -10, 5, -40*sw, 25*((sw+0.5)/1.5), -30*sw, 0*sw)
            quad(-40*sw, 25*((sw+0.5)/1.5), -55*sw, 20*((sw+0.5)/1.5), -70*sw, -15, -30*sw, 0*sw)

            // left wing
            quad(10, -5, 10, 5, 40*sw, 25*((sw+0.5)/1.5), 30*sw, 0*sw)
            quad(40*sw, 25*((sw+0.5)/1.5), 55*sw, 20*((sw+0.5)/1.5), 70*sw, -15, 30*sw, 0*sw)

            // head
            quad(-10, 20, 10, 20, 13*((sh+1)/2), 30*sh, -13*((sh+1)/2), 30*sh)
            quad(-7*((sh+1)/2), 50*sh, 7*((sh+1)/2), 50*sh, 13*((sh+1)/2), 30*sh, -13*((sh+1)/2), 30*sh)

            // tail
            quad(-7*st, -25, 7*st, -25, 2, -80*st, -2, -80*st)
        }
    }

    move() {
        this.vel += this.acc
        this.pos.x += Math.sin(this.head) * this.vel
        this.pos.y += Math.cos(this.head) * this.vel
    }
}
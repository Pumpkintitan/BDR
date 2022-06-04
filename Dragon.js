class Dragon {
    constructor(x,y,r,g,b) {
        this.pos = createVector(x, y)
        this.vel = 0
        this.acc = 0.01
        this.head = -1
        this.color = [r,g,b]
    }
    
    draw(sh, sw, st, debug) {
        push()
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
            ellipse(0, 0, 60)
        } else {
            let cc = [this.color[0] - 50, this.color[1] - 50, this.color[2] - 50]
            for (let i = 0; i < 3; i++) {
                if(cc[i] < 0) {
                    cc[i] = 0
                }
            }
            fill(cc[0], cc[1], cc[2])
            rect(-10,-25, 10, 20)
            quad(-10, -5, -10, 5, -40*sw, 25*((sw+0.5)/1.5), -30*sw, 0*sw)
            quad(10, -5, 10, 5, 40*sw, 25*((sw+0.5)/1.5), 30*sw, 0*sw)
            quad(-10, 20, 10, 20, 13*((sh+1)/2), 30*sh, -13*((sh+1)/2), 30*sh)
            
            
            fill(this.color[0],this.color[1],this.color[2])
            quad(-40*sw, 25*((sw+0.5)/1.5), -55*sw, 20*((sw+0.5)/1.5), -70*sw, -15, -30*sw, 0*sw)
            quad(40*sw, 25*((sw+0.5)/1.5), 55*sw, 20*((sw+0.5)/1.5), 70*sw, -15, 30*sw, 0*sw)
            quad(-7*((sh+1)/2), 50*sh, 7*((sh+1)/2), 50*sh, 13*((sh+1)/2), 30*sh, -13*((sh+1)/2), 30*sh)
            quad(-7*st, -25, 7*st, -25, 2, -80*st, -2, -80*st)

        }
        pop()
    }

    move() {
        this.head += 0.015
        this.vel += this.acc
        if (this.vel > 5) {
            this.vel = 5
        }
        let sa = Math.sin(this.head)
        let ca = Math.cos(this.head)
        this.pos.x += sa * this.vel
        this.pos.y += ca * this.vel
    }

    undomove() {
        let sa = Math.sin(this.head)
        let ca = Math.cos(this.head)
        this.pos.x -= sa * this.vel
        this.pos.y -= ca * this.vel
        this.vel -= this.acc
        this.head -= 0.01
    }

    checkIntercept(wall) {
        this.move()
        if (collideLineCircle(wall.l1.x, wall.l1.y, wall.l2.x, wall.l2.y, this.pos.x, this.pos.y, 60)){
            this.undomove()
            this.head += Math.PI/2
        }
    }
}
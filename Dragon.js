class Dragon {
    constructor(x,y,r,g,b,h) {
        this.pos = createVector(x, y)
        this.vel = 0
        this.acc = 0
        this.head = h
        this.color = [r,g,b]
        this.scale = 0.5
        this.dead = false
        this.scales = [(Math.random()* 0.8) + 0.7,(Math.random()* 0.8) + 0.7,(Math.random()* 0.8) + 0.7]
        this.rays = []
        for (let i = 0; i < 9; i++) {
            let rr = new Ray(-90 + (i * (45/2)))
            this.rays.push(rr)
        }
        let rr = new Ray(180)
        this.rays.push(rr)
        this.frame = 0
    }
    
    draw(debug, walls) {
        this.frame += 0.1
        let tscalew = this.scales[0] += Math.sin(this.frame) * 0.01
        push()
        rectMode(CORNERS);
        noStroke()
        translate(this.pos.x, this.pos.y)
        rotate(-this.head)
        scale(this.scale)
        if (debug) {
            // body
            fill('black')
            rect(-10,-25, 10, 20)

            // right wing
            fill('red')
            quad(-10, -5, -10, 5, -40*tscalew, 25*((tscalew+0.5)/1.5), -30*tscalew, 0*tscalew)
            fill('orange')
            quad(-40*tscalew, 25*((tscalew+0.5)/1.5), -55*tscalew, 20*((tscalew+0.5)/1.5), -70*tscalew, -15, -30*tscalew, 0*tscalew)

            // left wing
            fill('blue')
            quad(10, -5, 10, 5, 40*tscalew, 25*((tscalew+0.5)/1.5), 30*tscalew, 0*tscalew)
            fill('purple')
            quad(40*tscalew, 25*((tscalew+0.5)/1.5), 55*tscalew, 20*((tscalew+0.5)/1.5), 70*tscalew, -15, 30*tscalew, 0*tscalew)

            // head
            fill('yellow')
            quad(-10, 20, 10, 20, 13*((this.scales[1]+1)/2), 30*this.scales[1], -13*((this.scales[1]+1)/2), 30*this.scales[1])
            fill('darkgoldenrod')
            quad(-7*((this.scales[1]+1)/2), 50*this.scales[1], 7*((this.scales[1]+1)/2), 50*this.scales[1], 13*((this.scales[1]+1)/2), 30*this.scales[1], -13*((this.scales[1]+1)/2), 30*this.scales[1])

            // tail
            fill('green')
            quad(-7*this.scales[2], -25, 7*this.scales[2], -25, 2, -80*this.scales[2], -2, -80*this.scales[2])

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
            quad(-10, -5, -10, 5, -40*tscalew, 25*((tscalew+0.5)/1.5), -30*tscalew, 0*tscalew)
            quad(10, -5, 10, 5, 40*tscalew, 25*((tscalew+0.5)/1.5), 30*tscalew, 0*tscalew)
            quad(-10, 20, 10, 20, 13*((this.scales[1]+1)/2), 30*this.scales[1], -13*((this.scales[1]+1)/2), 30*this.scales[1])
            
            
            fill(this.color[0],this.color[1],this.color[2])
            quad(-40*tscalew, 25*((tscalew+0.5)/1.5), -55*tscalew, 20*((tscalew+0.5)/1.5), -70*tscalew, -15, -30*tscalew, 0*tscalew)
            quad(40*tscalew, 25*((tscalew+0.5)/1.5), 55*tscalew, 20*((tscalew+0.5)/1.5), 70*tscalew, -15, 30*this.scales[0], 0*this.scales[0])
            quad(-7*((this.scales[1]+1)/2), 50*this.scales[1], 7*((this.scales[1]+1)/2), 50*this.scales[1], 13*((this.scales[1]+1)/2), 30*this.scales[1], -13*((this.scales[1]+1)/2), 30*this.scales[1])
            quad(-7*this.scales[2], -25, 7*this.scales[2], -25, 2, -80*this.scales[2], -2, -80*this.scales[2])

        }
        pop()
        if (debug) {
            this.showRays(walls)
        }
    }

    showRays(walls) {
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].draw(this.head, this.pos, walls)
        }
    }

    action() {
        let c = Math.floor(Math.random()*4)
        switch(c) {
            case 0:
                this.acc += 0.01
                break;
            case 1:
                this.acc -= 0.01
                break;
            case 2:
                this.head += 0.03
                break;
            case 3:
                this.head -= 0.03
                break;
        }
    }

    move() {
        this.vel += this.acc
        this.vel *= 0.95
        if (this.vel > 5) {
            this.vel = 5
        }
        if (this.vel < -1) {
            this.vel = -1
        }
        let sa = Math.sin(this.head)
        let ca = Math.cos(this.head)
        this.pos.x += sa * this.vel
        this.pos.y += ca * this.vel
    }

    checkIntercept(wall) {
        if (collideLineCircle(wall.l1.x, wall.l1.y, wall.l2.x, wall.l2.y, this.pos.x, this.pos.y, (this.scale * 60))){
            this.dead = true
        }
    }
}
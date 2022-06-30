class Ray {
    constructor(ang) {
        this.a = ang
        this.len = 1500
    }

    draw(dhead, dpos, walls) {
        this.compute(dhead, dpos, walls)
        let b = radians(this.a)
        let sa = Math.sin(dhead + b)
        let ca = Math.cos(dhead + b)
        stroke('red')
        line(dpos.x, dpos.y, dpos.x + (sa * this.len), dpos.y + (ca * this.len))
    }

    compute(dhead, dpos, walls) {
        let tlen = 1500
        let b = radians(this.a)
        let sa = Math.sin(dhead + b)
        let ca = Math.cos(dhead + b)
        for(let i = 0; i < walls.length; i++) {
            let hit = collideLineLine(dpos.x, dpos.y, dpos.x + (sa * tlen), dpos.y + (ca * tlen), walls[i].l1.x, walls[i].l1.y, walls[i].l2.x, walls[i].l2.y, true)
            if (hit.x) {
                tlen = dist(dpos.x, dpos.y, hit.x, hit.y)
            }
        }
        this.len = tlen
        return tlen
    }
}
//CLASS MÍSSIL
class missileClass {
    constructor(x, y, xNave, yNave, dimension, level, asteroidsNumber) {    // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        
        this.dimension = dimension

        this.level = level
        this.asteroidsNumber = asteroidsNumber
        this.missileActivated = false

        this.xNave = xNave
        this.yNave = yNave

        // (constant) horizontal displacement (velocity): d is a direction angle
        // this.dX = 2 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        // this.dY = 2 * Math.sin(d);

        this.angle = Math.atan2(Nave.y-y, Nave.x-y);
    }

    insert() {
        ctx.drawImage(missile, this.x, this.y, this.dimension, this.dimension+30)
    }

    update() {
        // Movimento horizontal
        if (this.x < Nave.x) {
            this.x += Math.cos(this.angle)
        } else {
            this.x -= Math.cos(this.angle)
        }

        // Movimento vertical
        if (this.y < Nave.y) {
            this.y += Math.sin(this.angle)
        } else {
            this.y -= Math.sin(this.angle)
        }

        // Rotação
        
    }
}
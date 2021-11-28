//CLASS MÍSSIL
class missileClass {
    constructor(x, y, xNave, yNave, dimension, level, asteroidsNumber) {    // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        
        this.dimension = dimension
        
        this.missileActivated = false

        this.xNave = xNave
        this.yNave = yNave

        // (constant) horizontal displacement (velocity): d is a direction angle
        // this.dX = 2 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        // this.dY = 2 * Math.sin(d);

        this.angle = Math.atan2(Nave.y-y, Nave.x-x);
    }

    insert() {
        // Rotação
        ctx.save();
        // ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(missile, this.x, this.y, this.dimension, this.dimension+30)
        ctx.restore();
    }

    update() {
        this.angle = Math.atan2(Nave.y-this.y, Nave.x-this.x);
        this.x += Math.cos(this.angle)
        this.y += Math.sin(this.angle)
    }

    missileColidesNave() {
         if (Nave.x + Nave.W >= this.x
            //NOT to the left
            && Nave.x <= this.x + this.dimension
            //NOT to the right
            && Nave.y + Nave.H >= this.y
            //NOT above
            && Nave.y <= this.y + this.dimension) {
            //NOT below

            console.log('bum do míssil');

            // asteroid.respawnAsteroids();
            init();
        }
    }
}
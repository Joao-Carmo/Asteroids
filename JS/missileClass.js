//CLASS MÍSSIL
class missileClass {
    constructor(x, y, xNave, yNave, xDimension, yDimension, level, asteroidsNumber) {    // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        
        this.xDimension = xDimension
        this.yDimension = yDimension
        
        this.missileActivated = false

        this.xNave = xNave
        this.yNave = yNave

        // (constant) horizontal displacement (velocity): d is a direction angle
        // this.dX = 2 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        // this.dY = 2 * Math.sin(d);

        // this.angle = Math.atan2(Nave.y, Nave.x);
    }

    insert() {
        // Rotação
        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle + Math.PI/2);
        //ctx.drawImage(missile, this.x+75*Math.cos(this.angle), this.y+75*Math.sin(this.angle), this.xDimension, this.yDimension)
        ctx.drawImage(missile, -30/2*Math.cos(this.angle), -60/2*Math.sin(this.angle), this.xDimension, this.yDimension)
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
            && Nave.x <= this.x + this.xDimension
            //NOT to the right
            && Nave.y + Nave.H >= this.y
            //NOT above
            && Nave.y <= this.y + this.yDimension) {
            //NOT below

            console.log('bum do míssil');

            // asteroid.respawnAsteroids();
            lostLive = true
            init();
        }
    }
}
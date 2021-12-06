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

            lives -= 1
            init();
        }
    }

    checkCollision(missile, bullet) {
        // verifica colisão entre 1 inimigo e 1 bala
        if (bullet.x >= missile.x &&
            bullet.x <= missile.x + missile.xDimension &&
            bullet.y >= missile.y &&
            bullet.y <= missile.y + missile.yDimension
        ) {
            return true;
        } else {
            return false;
        }
    }

    missileCollisionWithBullet() {
        for (let i = missiles.length-1; i >= 0; i--) {
            //percorre o array de balas 
            for (let j = Nave.bullets.length-1; j >= 0; j--) {
                //verifica se há colisão entre dois objetos (1 inimigo e 1 bala)
                if (this.checkCollision(missiles[i], Nave.bullets[j])) {
                    point += 200
                    Nave.bullets.splice(j,1)
                    missiles.splice(i,1)
                    break
                }
            }
        }
    }
}
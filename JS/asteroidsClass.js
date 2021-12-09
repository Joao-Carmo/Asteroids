//CLASS ASTEROIDES
class asteroid {
    constructor(x, y, d, c, dimension, xRotation, yRotation, velocity, level, asteroidsNumber) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement (velocity): d is a direction angle
        this.dX = 2 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = 2 * Math.sin(d);
        this.c = c; // color
        this.dimension = dimension
        this.randomAsteroid = Math.round((Math.random() * 2))
        
        this.xRotation = this.x + this.dimension
        this.yRotation = this.y + this.dimension

        this.v = velocity
        this.angle = 0
    }

    update() {
        // check Canvas vertical collisions
        if (this.x < 0 || this.x > W - this.dimension)
            this.dX = -this.dX;
        // check Canvas horizontal collisions
        if (this.y < 0 || this.y > H - this.dimension)
            this.dY = -this.dY;
        this.x += this.dX; // update horizontal position
        this.y += this.dY; // update vertical position
    }

    insert() {
        this.angle += 0.01

        // Rotação
        ctx.save();
        ctx.translate(this.x+this.dimension/2, this.y+this.dimension/2);
        ctx.rotate(this.angle + Math.PI/2);
        ctx.drawImage(asteroidsArray[this.randomAsteroid], -this.dimension/2, -this.dimension/2, this.dimension, this.dimension)
        ctx.restore();
    }

    respawnAsteroids() {
        if (asteroidsNumber == 0 || lostLive) {

            if (lostLive)
                lostLive = false

            if (asteroidsNumber == 0) {
                level += 1
                asteroidsNumber = 16 + (level*4)
                asteroidsDestroyed = true
                Nave.bullets = []
            }

            init()

            if (asteroidsDestroyed) {
                asteroidsDestroyed = false
            }

            if (lostLive)
                lostLive = false
        }
    }

    asteroidsColisionsWithUser() {
        if (Nave.x + Nave.W >= this.x
            //NOT to the left
            &&
            Nave.x <= this.x + this.dimension
            //NOT to the right
            &&
            Nave.y + Nave.H >= this.y
            //NOT above
            &&
            Nave.y <= this.y + this.dimension) {
            //NOT below

            /* they collide! */
            this.resetLevel();
        }
    }

    checkCollision(asteroid, bullet) {
        // verifica colisão entre 1 inimigo e 1 bala
        if (bullet.x >= asteroid.x &&
            bullet.x <= asteroid.x + asteroid.dimension &&
            bullet.y >= asteroid.y &&
            bullet.y <= asteroid.y + asteroid.dimension
        ) {
            return true;
        } else {
            return false;
        }
    }

    asteroidsCollisionWithBullet() {
        let xRotation = Math.random() * W
        let yRotation = Math.random() * H
        let velocity = Math.random()*5
        let direction = Math.random() * 2 * Math.PI;
        for (let i = asteroids.length-1; i >= 0; i--) {
            //percorre o array de balas 
            for (let j = Nave.bullets.length-1; j >= 0; j--) {
                //verifica se há colisão entre dois objetos (1 asteroide e 1 bala)
                if (this.checkCollision(asteroids[i], Nave.bullets[j])) {
                    let x = asteroids[i].x
                    let y = asteroids[i].y
                    let dimension = asteroids[i].dimension
                    let c = asteroids[i].c
                    
                    point += 10
                    Nave.bullets.splice(j,1)
                    if (dimension == 100) {
                        for (let i = 1; i <= 2; i++) {
                            let xRotation = Math.random() * W
                            let yRotation = Math.random() * H
                            let velocity = Math.random()*5
                            let direction = Math.random() * 2 * Math.PI;
                            asteroids.push(new asteroid(x, y, direction, c, 60, xRotation, yRotation, velocity, level, asteroidsNumber))
                        }
                    } else if (dimension == 60) {
                        for (let i = 1; i <= 2; i++) {
                            let xRotation = Math.random() * W
                            let yRotation = Math.random() * H
                            let velocity = Math.random()*5
                            let direction = Math.random() * 2 * Math.PI;
                            asteroids.push(new asteroid(x, y, direction, c, 30, xRotation, yRotation, velocity, level, asteroidsNumber))
                        }
                    }
                    else {
                        asteroidsNumber--
                    }
                    asteroids.splice(i,1)
                    break 
                }
            }
        }
    }
    resetLevel() {
        lives-=1
        Nave.bullets = []
        if (lives >= 1) {
            lostLive = true
            this.respawnAsteroids();
        } else {
            console.log('perdeste!');
        }
    }
}
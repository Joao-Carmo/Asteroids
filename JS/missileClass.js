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
    }

    update() {
        // check Canvas vertical collisions
        if (this.x < 0 || this.x > W - this.dimension)
            this.dX = -this.dX;
        // check Canvas horizontal collisions
        if (this.y < 0 || this.y > H - this.dimension)
            this.dY = -this.dY;
        this.x += this.dX;  // update horizontal position
        this.y += this.dY;  // update vertical position
    }
}
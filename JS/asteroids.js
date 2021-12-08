const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

divCanvas.height = window.innerHeight;
divCanvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Cria míssil
let missile = new Image()
missile.src = 'images/missile_upg.png'

// Asteróides
let asteroid1 = new Image()
asteroid1.src = 'images/asteroid1_upg.png'
let asteroid2 = new Image()
asteroid2.src = 'images/asteroid2_upg.png'
let asteroid3 = new Image()
asteroid3.src = 'images/asteroid3_upg.png'

// Array de asteróides
let asteroidsArray = [asteroid1, asteroid2, asteroid3]

// Aparência nave
let imgNave = 'nave'
let nave = new Image();

// Função que permite mudar a aparência da nave
function changeShip(change, nave) {
    document.querySelector('#divBtnResume').innerHTML = `
        <button type="button" class="btn btn-outline-success" onclick="escPressed('button')">RESUME</button>
        <button style="width: 100%;" type="button" class="btn btn-outline-warning mt-2" onclick="init(true, true)">RESTART</button>

        <div class="row justify-content-center mt-2" id="btnNaves">
            <button type="button" class="btn btn-outline-light my-2 col-3" onclick="changeShip(true, 'nave')">
                <img src="images/nave.png" width="100%">
            </button>
            <button type="button" class="btn btn-outline-light my-2 mx-3 col-3" onclick="changeShip(true, 'nave4')">
                <img src="images/nave4.png" width="100%">
            </button>
            <button type="button" class="btn btn-outline-light my-2 col-3" onclick="changeShip(true, 'nave3')">
                <img src="images/nave3.png" width="100%">
            </button>
        </div>
    `

    if (change) {
        imgNave = nave
    }
}

const W = canvas.width
const H = canvas.height

let asteroids = new Array(); // setup as many asteroids as wanted
let missiles = new Array(); // setup as many missiles as wanted

let asteroidsNumber = 16
let level = 0
let lives = 3
let lostLive = false
let asteroidsDestroyed = false
let paused = false

let point = 0

window.onload = () => {
    init(true);
    render(); //start the animation
};

const naveW = 100
const naveH = 50

let rightKey = false; // teclado direito
let leftKey = false
let upKey = false
let downKey = false
let xNave = W/2
let yNave = H/2

let xMouse
let yMouse
let angle = 0
let bulletPos = 0

ctx.font = "bold 20px Courier New "
ctx.textAlign = "center"
ctx.textBaseline = "middle"
ctx.fillStyle = "white"




let Nave = {
    x: xNave,
    y: yNave,
    dX: 0,
    dY: 0,
    a: 0.05,
    W: 65,
    H: 35,
    bullets: [],

    draw() {
        ctx.drawImage(nave, this.x, this.y, this.W, this.H)
    },
    update() {
        if (rightKey && this.x < W - naveW)
            // xNave++; //UPDATE BALL
            this.dX += this.a
        else if (!rightKey && this.dX > 0)
            this.dX -= this.a
        if (leftKey && this.x > 0)
            // xNave--
            this.dX -= this.a
        else if (!leftKey && this.dX < 0)
            this.dX += this.a
        if (upKey && this.y > 0)
            // yNave--
            this.dY -= this.a
        else if (!upKey && this.dY < 0) 
            this.dY += this.a
        if (downKey && this.y < H - naveH)
            // yNave++
            this.dY += this.a
        else if (!downKey && this.dY > 0)
            this.dY -= this.a


        if (this.x >= 0 && this.x <= W - naveW)
            this.x+= this.dX
        else if (this.x < 0) {
            this.x = 0
            this.dX = 0
        }
        else if (this.x > W - naveW) {
            this.x = W - naveW
            this.dX = 0 
        }
        if (this.y >= 0 && this.y <= H - naveH)
            this.y+= this.dY
        else if (this.y < 0) {
            this.y = 0
            this.dY = 0
        }
        else if (this.y > H - naveH) {
            this.y = H - naveH
            this.dY = 0
        }
    },

    createBullet(angle) {
            this.bullets.push({
                x: this.x + naveW / 2 -20,
                y: this.y + naveH / 2,
                W: 5,
                H: 5,
                angle: angle,
                distance: 0,
            })
    },

    drawBullets() { // AQUI
        // desenha todas as balas
        for (let i = 0; i < this.bullets.length; i++) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.bullets[i].x, this.bullets[i].y, this.bullets[i].W, this.bullets[i].H);
        }
    },

    updateBullets() { // AQUI
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].distance > W) {
                this.bullets.splice(i,1)
                continue
            }

            this.bullets[i].x += 7 * Math.cos(this.bullets[i].angle)
            this.bullets[i].y += 7 * Math.sin(this.bullets[i].angle)

            //calcula a distância percorrida pela bala
            this.bullets[i].distance += Math.sqrt(Math.pow(7 * Math.cos(this.bullets[i].angle),2) + Math.pow(7 * Math.sin(this.bullets[i].angle),2))
        }
    }
}

// Disparar balas através do click
canvas.addEventListener('click', e => {
    xMouse = e.offsetX - naveW / 2 +20;
    yMouse = e.offsetY - naveH / 2;
    angle = Math.atan2(yMouse - Nave.y, xMouse - Nave.x);

    Nave.createBullet(angle)
});

// Movimento nave -> Quando pressionar tornar verdadeiro / quando largar tornar falso
window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);
window.addEventListener('keydown', escPressed);

function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        rightKey = true;
    } else if (e.key == 'ArrowLeft') {
        leftKey = true;
    } else if (e.key == 'ArrowUp') {
        upKey = true;
    } else if (e.key == 'ArrowDown') {
        downKey = true;
    }
    e.preventDefault()
}

function ArrowReleased(e) {
    if (e.key == 'ArrowRight') {
        rightKey = false;
    } else if (e.key == 'ArrowLeft') {
        leftKey = false;
    } else if (e.key == 'ArrowUp') {
        upKey = false;
    } else if (e.key == 'ArrowDown') {
        downKey = false;
    }
    e.preventDefault()
}

function escPressed(e) {

    document.querySelector('#divBtnResume').innerHTML = `
        <div>
            <button style="width: 100%;" type="button" class="btn btn-outline-success" onclick="escPressed('button')">RESUME</button>
            <button style="width: 100%;" type="button" class="btn btn-outline-warning my-2" onclick="init(true, true)">RESTART</button>
            <button style="width: 100%;" type="button" class="btn btn-outline-light" onclick="changeShip(false, 'nave')">CHANGE SPACESHIP</button>
        </div>
    `

    // entra quando clicados nos botões que pausam e resumem o jogo
    if (e == 'button') {
        paused = !paused
    }

    // entra quando clicado no botão escape
    if (e.key == 'Escape') {
        paused = !paused
    }

    if (paused == true) {
        document.querySelector('#divPause').style.visibility = 'visible'
        document.querySelector('#btnPause').style.visibility = 'hidden'
    } else {
        document.querySelector('#divPause').style.visibility = 'hidden'
        document.querySelector('#btnPause').style.visibility = 'visible'
    }
}

function init(firstCycle = false, button = false) {
    // setup asteroids
    Nave.x = W/2 - 65/2
    Nave.y = H/2 - 35/2

    // enters if only if user clicked on the button 'restart' on the paused menu
    if (button) {
        escPressed('button')
        lives = 3
        asteroidsNumber = 16
        level = 0
        point = 0
    }

    // clears function
    if (level < 3) {
        missiles = []
    }

    if ((level >= 3 && asteroidsDestroyed) || (level >= 3 && lostLive)) {
        missiles = []

        for (let i = 0; i < level - 2; i++) {

            let posInit = [
                { x: 5, y: 5 },
                { x: 5, y: H-100-5 },
                { x: W-100-5, y: H-100-5 },
                { x: W-100-5, y: 5 },
                { x: W/2, y: 5 },
                { x: W/2, y: H-100-5 },
                { x: 5, y: H/2 },
                { x: W-100-5, y: H/2 }
            ]

            let pos = Math.round((Math.random() * 7))
            let xInit = posInit[pos].x
            let yInit = posInit[pos].y

            // alert('x: '+xInit+' / y: '+yInit)
            // no asteroid spawns directly on top of the user
            if (xInit > W/2 - Nave.W*2 && xInit < W/2 + Nave.W*2) {
                xInit = 60
            }

            let xNave = Nave.x
            let yNave = Nave.y

            // push new object into array
            missiles.push(new missileClass(xInit, yInit, xNave, yNave, 30, 70, level, asteroidsNumber))
        }
    }

    if (lostLive || firstCycle || asteroidsDestroyed) {
        asteroids = []

        for (let i = 0; i < 4 + level; i++) {
            let color = `white`;

            let posInit = [
                { x: 5, y: 5 },
                { x: 5, y: H-100-5 },
                { x: W-100-5, y: H-100-5 },
                { x: W-100-5, y: 5 },
                { x: W/2, y: 5 },
                { x: W/2, y: H-100-5 },
                { x: 5, y: H/2 },
                { x: W-100-5, y: H/2 }
            ]

            let pos = Math.round((Math.random() * 7))
            let xInit = posInit[pos].x
            let yInit = posInit[pos].y

            // random direction
            let direction = Math.random() * 2 * Math.PI;

            // random rotation
            let xRotation = Math.random() * W
            let yRotation = Math.random() * H
            let velocity = Math.random()*5

            // push new object into array
            asteroids.push(new asteroid(xInit, yInit, direction, color, 100, xRotation, yRotation, velocity, level, asteroidsNumber))
        }
    } else {
        for (let i = 0; i < asteroids.length; i++) {

            let posInit = [
                { x: 5, y: 5 },
                { x: 5, y: H-100-5 },
                { x: W-100-5, y: H-100-5 },
                { x: W-100-5, y: 5 },
                { x: W/2, y: 5 },
                { x: W/2, y: H-100-5 },
                { x: 5, y: H/2 },
                { x: W-100-5, y: H/2 }
            ]

            let pos = Math.round((Math.random() * 7))
            asteroids[i].x = posInit[pos].x
            asteroids[i].y = posInit[pos].y
        }
    }
}

function render() {

    nave.src = `images/${imgNave}.png`;

    document.querySelector('#pLevel').innerHTML = `Level: ${level}`

    if (!paused) {
        if (lives>=1) {
            // Limpa o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // desenha e atualiza a nave e as suas balas correspondentes
            Nave.draw()
            Nave.update()
            Nave.drawBullets();
            Nave.updateBullets();

            // draw & update all objects
            asteroids.forEach(asteroid => {
                asteroid.update();
                asteroid.insert();
                asteroid.asteroidsCollisionWithBullet()
                asteroid.respawnAsteroids();
                asteroid.asteroidsColisionsWithUser();
            });

            missiles.forEach(missileClass => {
                missileClass.insert();
                missileClass.update();
                missileClass.missileColidesNave();
                missileClass.missileCollisionWithBullet()
            })
                // vidas
                ctx.fillStyle = "white"
                ctx.font = "bold 20px Courier New "
                ctx.fillText(`Vidas: ${lives}       Pontuação: ${point}` , W/2, 20);

        } else {
            ctx.fillStyle = "red"
            ctx.strokeStyle = "black"
            ctx.font = "bold 60px Courier New "
            ctx.fillText('YOU LOSE!', W/2,H/2)
            ctx.strokeText('YOU LOSE!', W/2,H/2)

            let btnStart = document.querySelector("#start")
            btnStart.style.visibility = 'visible'

            btnStart.addEventListener('click',function () {
                btnStart.style.visibility = 'hidden'
                console.log('start'+lostLive)
                lives = 3
                asteroidsNumber = 16
                level = 0
                point = 0
                init(true)
            })    
        }    
    }

    //new frame
    window.requestAnimationFrame(render);

}
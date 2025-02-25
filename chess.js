const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 600;

let car = { x: 175, y: 500, width: 50, height: 100, speed: 5 };
let obstacles = [];
let gameOver = false;

function drawCar() {
    ctx.fillStyle = "blue";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obs => {
        obs.y += 5;
        if (obs.y > canvas.height) {
            obstacles.shift();
            obstacles.push({ x: Math.random() * 350, y: -100, width: 50, height: 100 });
        }
        if (obs.x < car.x + car.width && obs.x + obs.width > car.x && obs.y < car.y + car.height && obs.y + obs.height > car.y) {
            gameOver = true;
        }
    });
}

function gameLoop() {
    if (gameOver) {
        alert("Game Over!");
        document.location.reload();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    updateObstacles();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && car.x > 0) {
        car.x -= car.speed;
    }
    if (event.key === "ArrowRight" && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
});

obstacles.push({ x: Math.random() * 350, y: -100, width: 50, height: 100 });
gameLoop();

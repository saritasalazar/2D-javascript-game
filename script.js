let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

let pressRight = false;
let pressLeft = false;

document.addEventListener("keydown", handleKeyDown,false);
document.addEventListener("keyup", handleKeyUp, false);

function handleKeyDown(e) {
    if(e.key === "Right" || e.key == "ArrowRight"){
        pressRight = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        pressLeft = true;
    }
}

function handleKeyUp(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        pressRight = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        pressLeft = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;

    if(pressRight) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(pressLeft) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

setInterval(draw, 10);
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

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y:0 };
    }
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++) {
       let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
       let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
       bricks[c][r].x = brickX;
       bricks[c][r].y = brickY;
       ctx.beginPath();
       ctx.rect(brickX, brickY, brickWidth, brickHeight);
       ctx.fillStyle = "#0095DD";
       ctx.fill();
       ctx.closePath();
        }
    }
}

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
    drawBricks();
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
   if(y + dy < ballRadius) {
       dy = -dy;
   } 
   else if(y + dy > canvas.height-ballRadius) {
       if(x > paddleX && x < paddleX + paddleWidth){
           dy = -dy;
       } 
   else {
    alert("GAME OVER");
       document.location.reload();
    clearInterval(interval);   }
   }  

    if(pressRight && paddleX < canvas.width-paddleWidth) {
        paddleX +=7;
    }
    else if(pressLeft && paddleX > 0) {
        paddleX -= 7;
        }
        x += dx;
        y += dy;
    }


let interval = setInterval(draw,10);
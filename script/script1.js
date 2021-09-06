
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const rad = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

const barHeight = 10;
const barWidth = 75;
let barX = (canvas.width - barWidth) / 2; 
let rightClicked = false;
let leftClicked = false;
const brickRow = 5;
const brickCol = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;

let bricks =[];
for(let c=0; c<brickCol; c++){
    bricks[c]=[];
    for(let r=0; r<brickRow; r++){
        bricks[c][r]={x: 0, y:0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandller, false );
document.addEventListener("keyup", keyUpHandler, false );
document.addEventListener("mousemove",mouseMoveHandler, false);

function keyDownHandller(e) {
    if(e.key=="Right" || e.key=="ArrowRight"){
        rightClicked = true;
    }
    else if(e.key=="Left" || e.key=="ArrowLeft"){
        leftClicked = true;
    }
}
function keyUpHandler(e){
    if(e.key=="Right" || e.key=="ArrowRight"){
        rightClicked = false;
    }
    else if(e.key=="Left" || e.key=="ArrowLeft"){
        leftClicked = false;
    }
}
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        barX = relativeX - barWidth/2;
    }
}
function collisionDetection() {
    for(let c=0; c<brickCol; c++) {
        for(let r=0; r<brickRow; r++) {
            let b = bricks[c][r];
            if(b.status ==1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    console.log(c)
                    score++;
                    console.log(c)
                    if(score == brickRow*brickCol) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval); 
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBar() {
    ctx.beginPath();
    ctx.rect(barX, canvas.height-barHeight, barWidth, barHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(let c=0; c<brickCol; c++) {
        for(let r=0; r<brickRow; r++) {
            if(bricks[c][r].status == 1){
                let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
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
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawBar();
    drawScore();
    collisionDetection();

    if(x + dx > canvas.width-rad || x + dx < rad) {
        dx = -dx;
    }
    if(y + dy < rad) {
        dy = -dy;
    } else if(y + dy > canvas.height-rad) {
        if(x > barX && x < barX + barWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if(rightClicked && barX < canvas.width-barWidth) {
        barX += 7;
    }
    else if(leftClicked && barX > 0) {
        barX -= 7;
    }
    x += dx;
    y += dy;
}


const interval = setInterval(draw, 10);

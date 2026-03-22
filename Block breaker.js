
/* =========================
   js/main.js
========================= */
import {createPaddle,createBall,createBricks} from './objects.js';
import {initGL} from './renderer.js';
import {createGame} from './game.js';

const canvas=document.getElementById("glcanvas");
const {rect,clear}=initGL(canvas);

const paddle=createPaddle();
const ball=createBall();
const bricks=createBricks();

const game=createGame({paddle,ball,bricks});

// Buttons
document.getElementById("startBtn").onclick=()=>game.start();
document.getElementById("pauseBtn").onclick=()=>game.pause();

function render(){
  clear();
  rect(paddle.x,paddle.y,paddle.w,paddle.h,[0,1,0,1]);
  rect(ball.x,ball.y,ball.r,ball.r,[1,1,1,1]);
  bricks.forEach(b=>{ if(b.alive) rect(b.x,b.y,b.w,b.h,[1,0,0,1]); });
}

function loop(){
  game.update();
  render();
  requestAnimationFrame(loop);
}

// Controls with boundary
window.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft") paddle.x-=paddle.speed;
  if(e.key==="ArrowRight") paddle.x+=paddle.speed;

  // clamp inside screen
  if(paddle.x < -1) paddle.x = -1;
  if(paddle.x + paddle.w > 1) paddle.x = 1 - paddle.w;
});

loop();

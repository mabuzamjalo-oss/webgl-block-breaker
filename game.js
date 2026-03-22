/* =========================
   js/game.js
========================= */
export function createGame(objs){
  let {paddle,ball,bricks}=objs;
  let score=0;
  let lives=3;
  let running=false;

  function start(){ running=true; }
  function pause(){ running=!running; }

  function update(){
    if(!running) return;

    ball.x+=ball.dx;
    ball.y+=ball.dy;

    if(ball.x>1||ball.x<-1) ball.dx*=-1;
    if(ball.y>1) ball.dy*=-1;

    // paddle collision
    if(ball.y < paddle.y + paddle.h && ball.x > paddle.x && ball.x < paddle.x+paddle.w){
      let hit = (ball.x - (paddle.x + paddle.w/2)) / (paddle.w/2);
      ball.dx = hit * 0.03;
      ball.dy *= -1;
    }

    // bricks
    bricks.forEach(b=>{
      if(b.alive && ball.x>b.x && ball.x<b.x+b.w && ball.y>b.y && ball.y<b.y+b.h){
        b.alive=false;
        ball.dy*=-1;
        score+=10;
      }
    });

    if(ball.y<-1){
      lives--;
      ball.x=0; ball.y=-0.7;
      if(lives<=0){ running=false; alert("Game Over"); }
    }

    document.getElementById("score").textContent="Score: "+score;
    document.getElementById("lives").textContent="Lives: "+lives;
  }

  return {update,start,pause,paddle,ball,bricks};
}

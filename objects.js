/* =========================
   js/objects.js
========================= */
export function createPaddle(){ return {x:0,y:-0.9,w:0.3,h:0.05,speed:0.05}; }
export function createBall(){ return {x:0,y:-0.7,dx:0.01,dy:0.015,r:0.03}; }
export function createBricks(){
  let bricks=[];
  for(let i=0;i<5;i++){
    for(let j=0;j<8;j++){
      bricks.push({x:-0.9+j*0.25,y:0.7-i*0.15,w:0.2,h:0.1,alive:true});
    }
  }
  return bricks;
}

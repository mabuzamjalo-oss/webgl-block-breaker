/* =========================
   js/renderer.js
========================= */
export function initGL(canvas){
  const gl = canvas.getContext("webgl");

  const vs=`attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0,1);}`;
  const fs=`precision mediump float;uniform vec4 uColor;void main(){gl_FragColor=uColor;}`;

  function shader(type,src){let s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}

  const program=gl.createProgram();
  gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));
  gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(program);
  gl.useProgram(program);

  const pos=gl.getAttribLocation(program,"aPosition");
  const col=gl.getUniformLocation(program,"uColor");

  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);

  function rect(x,y,w,h,color){
    const v=new Float32Array([x,y,x+w,y,x,y+h,x+w,y+h]);
    gl.bufferData(gl.ARRAY_BUFFER,v,gl.STATIC_DRAW);
    gl.uniform4fv(col,color);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  }

  function clear(){ gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }

  return {rect,clear};
}

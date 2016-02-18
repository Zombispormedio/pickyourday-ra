var videoStreaming;
var gl;
function initWebGl(video){
    videoStreaming=video;
    
    var image=new Image();
    image.src="img/default.jpg";
    image.onload=function(){
        render(image);
    }
    
}

function render(image){
      var canvas = document.getElementById("canvas");
     gl = getGLContext("canvas");

    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    var prg = gl.createProgram();
    gl.attachShader(prg, vertexShader);
    gl.attachShader(prg, fragmentShader);
    gl.linkProgram(prg);
    gl.useProgram(prg);
    
    var positionLocation=gl.getAttribLocation(prg, "a_position");
    var texCoordLocation=gl.getAttribLocation(prg, "a_texCoord");
    
    var texCoordBuffer=gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
         0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0,0);
    
    var texture=gl.createTexture();
   
    
      var resolutionLocation = gl.getUniformLocation(prg, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    
      var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      setRectangle(gl, 0, 0, canvas.width, canvas.height);
    loadTexture(texture, image);
     gl.drawArrays(gl.TRIANGLES, 0, 6);
    
     setInterval(function(){
          loadTexture(texture,  videoStreaming);
     gl.drawArrays(gl.TRIANGLES, 0, 6);
         
     }, 15);
    
     
    
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2]), gl.STATIC_DRAW);
}


function loadTexture(texture, image){
     gl.bindTexture(gl.TEXTURE_2D, texture);
    
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
 
}



var videoStreaming, gl, detector, canvas_ar, context_detector, videotexture, prg, attribs={}, uniforms={}, buffers={}, lastTime = 0,rCube = 0;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var mvMatrixStack = [];

function mvPushMatrix(){
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix(){
    if(mvMatrixStack.length == 0)
        throw "invalid popMatrix";
    mvMatrix =mvMatrixStack.pop();
}

function degToRad(d){
    return d * Math.PI / 180;
}

function initWebGl(video){
    videoStreaming=video;


    gl = getGLContext("canvas");

    createDetector({width:canvas.width, height:canvas.height});

    createProgram()
    getAttributes();
    getUniform();
    createVideo();
    createPicky();

    gl.enable(gl.DEPTH_TEST);



    tick();





}

function tick(){
    requestAnimFrame(tick);

    draw();
    animate();
}



function draw(){
    context_detector.drawImage(videoStreaming, 0, 0);
    canvas_ar.changed=true;

    gl.viewport(0, 0, gl.viewportWidth,gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    drawVideo();

    gl.clear(gl.DEPTH_BUFFER_BIT);

    detector.detect( function(marker){
        onMarkerCreated(marker)
        drawPicky();
    }, function(marker){
        onMarkerUpdated(marker)
        drawPicky();
    }, onMarkerDestroyed );



}

function createVideo(){
    videotexture=gl.createTexture();
    var canvas = document.getElementById("canvas");
    setVideo(gl, 0, 0, canvas.width, canvas.height);

    gl.uniform2f(uniforms.resolutionLocation, canvas.width, canvas.height);
}


function createPicky(){
    var index =  picky.iv;
    buffers.pickyIndex = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,  buffers.pickyIndex);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,  null);
    buffers.pickyIndex.itemSize = 1;
    buffers.pickyIndex.numItems = index.length;

    var vertex =  picky.v;
    buffers.pickyVertex = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER,    buffers.pickyVertex);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    buffers.pickyVertex.itemSize = 3;
    buffers.pickyVertex.numItems = vertex.length/3;


}

function createProgram(){
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    prg = gl.createProgram();
    gl.attachShader(prg, vertexShader);
    gl.attachShader(prg, fragmentShader);
    gl.linkProgram(prg);
    gl.useProgram(prg);
}

function getAttributes(){
    attribs.positionLocation=gl.getAttribLocation(prg, "a_position");
    attribs.positionVideoLocation=gl.getAttribLocation(prg, "a_video_position");
    attribs.texCoordLocation=gl.getAttribLocation(prg, "a_texCoord");
}

function getUniform(){
    uniforms.resolutionLocation = gl.getUniformLocation(prg, "u_resolution");
    uniforms.videoLocation = gl.getUniformLocation(prg, "u_video");
    uniforms.pMatrixUniform = gl.getUniformLocation(prg, "uPMatrix");
    uniforms.mvMatrixUniform = gl.getUniformLocation(prg, "uMVMatrix");
}


function drawVideo(){
    gl.uniform1i(uniforms.videoLocation, true);

    gl.bindBuffer(gl.ARRAY_BUFFER,  buffers.rectangle);
    gl.enableVertexAttribArray(  attribs.positionVideoLocation);
    gl.vertexAttribPointer(  attribs.positionVideoLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoordBuffer);
    gl.enableVertexAttribArray(attribs.texCoordLocation);
    gl.vertexAttribPointer(attribs.texCoordLocation, 2, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    loadTexture(videotexture,  videoStreaming);
    gl.drawArrays(gl.TRIANGLES, 0, 6);


    gl.disableVertexAttribArray(  attribs.positionVideoLocation);
    gl.disableVertexAttribArray(attribs.texCoordLocation);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.uniform1i(uniforms.videoLocation, false);
}

function drawPicky(){

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0, 0.0, -7.0]);
    mat4.translate(mvMatrix, [0, 0.0, 0.0]);

    mvPushMatrix();
    mat4.rotate(mvMatrix, degToRad(rCube),[1,1,1]);


    gl.bindBuffer(gl.ARRAY_BUFFER,  buffers.pickyVertex);
    gl.enableVertexAttribArray(  attribs.positionLocation);
    gl.vertexAttribPointer(attribs.positionLocation, 3, gl.FLOAT, false,0,0);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.pickyIndex);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, buffers.pickyIndex.numItems, gl.UNSIGNED_SHORT, 0);
    mvPopMatrix();
    gl.disableVertexAttribArray( attribs.positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}




function setVideo(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;

    buffers.rectangle= gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,  buffers.rectangle);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,  null);


    buffers.texCoordBuffer=gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0,  0.0,
        1.0,  0.0,
        0.0,  1.0,
        0.0,  1.0,
        1.0,  0.0,
        1.0,  1.0
    ]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}


function loadTexture(tex, image){
    gl.bindTexture(gl.TEXTURE_2D, tex);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);


}

function setMatrixUniforms(){

    gl.uniformMatrix4fv( uniforms.pMatrixUniform , false, pMatrix);
    gl.uniformMatrix4fv( uniforms.mvMatrixUniform ,false, mvMatrix);
}


function animate(){
    var timeNow = new Date().getTime();
    if(lastTime != 0){
        var elapsed =timeNow - lastTime;

        rCube += (75 * elapsed) / 1000.0;

    }

    lastTime = timeNow;
}


(function(){
    'use strict';

    // 変数
    var gl, canvas;

    window.addEventListener('load', function(){
        // canvas の初期化
        canvas = document.getElementById('canvas');
        canvas.width = 512;
        canvas.height = 512;

        ////////////////////////////
        // 初期化
        ////////////////////////////
        
        // WeebGLの初期化(WebGL 2.0)
        gl = canvas.getContext('webgl2');

        // シェーダプログラムの初期化
        // 頂点シェーダ
        var vsSource = [
            "attribute vec2 vertex;",

            "void main(void) {",
                "gl_Position = vec4(vertex, 0.0, 1.0);",
            "}"
        ].join("\n");

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vsSource);
        gl.compileShader(vertexShader);
        gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);

        // フラグメントシェーダ
        var fsSource = [
            "void main(void) {",
                "gl_FragColor = vec4(1.0f, 1.0f, 0.0f, 1.0f);",
            "}"
        ].join("\n");

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fsSource);
        gl.compileShader(fragmentShader);
        gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);

        // シェーダプログラム
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.getProgramParameter(program, gl.LINK_STATUS);
        gl.useProgram(program);

        // 頂点属性
        var vertexAttr = gl.getAttribLocation(program, "vertex");
        gl.enableVertexAttribArray(vertexAttr);
        gl.vertexAttribPointer(vertexAttr, 2, gl.FLOAT, false, 0, 0);

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        
        ////////////////////////////
        // 描画
        ////////////////////////////

        // 画面クリア
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        var vertices = [
           0.00, -0.25,
          -0.25, +0.25,
          +0.25, +0.25,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 1);

    }, false);

})();

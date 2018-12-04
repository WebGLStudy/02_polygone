(function(){
    'use strict';

    // 変数
    var gl, canvas;

    window.addEventListener('load', function(){
        ////////////////////////////
        // 初期化
        ////////////////////////////
        
        // canvas の初期化
        canvas = document.getElementById('canvas');
        canvas.width = 512;
        canvas.height = 512;

        // WeebGLの初期化(WebGL 2.0)
        gl = canvas.getContext('webgl2');

        // シェーダプログラムの初期化
        // 頂点シェーダ
        var vsSource = [
            '#version 300 es',
            'in vec2 position;',

            'void main(void) {',
                'gl_Position = vec4(position, 0.0, 1.0);',
            '}'
        ].join('\n');

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vsSource);
        gl.compileShader(vertexShader);
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
            alert(gl.getShaderInfoLog(vertexShader));
        }

        // フラグメントシェーダ
        var fsSource = [
            '#version 300 es',
            'precision highp float;',
            
            'out vec4 outColor;',
            
            'void main(void) {',
                'outColor = vec4(1.0, 1.0, 0.0, 1.0);',
            '}'
        ].join('\n');

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fsSource);
        gl.compileShader(fragmentShader);
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
            alert(gl.getShaderInfoLog(fragmentShader));
        }

        // シェーダ「プログラム」の初期化
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            alert(gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        // モデルの構築
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var vertices = [
           0.0, +0.4,
           0.5, -0.4,
          -0.0, -0.4
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        var posAttr = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
       
        ////////////////////////////
        // 描画
        ////////////////////////////

        // 画面クリア
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // ポリゴンの描画
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
        
        // GPUに画面更新を促す
        gl.flush();

    }, false);

})();

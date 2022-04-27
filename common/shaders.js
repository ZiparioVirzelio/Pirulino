//const gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
const canvas = document.getElementById("OUT")
const gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));

const Shaders = {
    vsSource :`
    attribute vec3 aPosition;
    uniform mat4 viewMatrix;
    uniform mat4 uM;
    uniform mat4 projMatrix;
    void main(void){
        vec4 pos = projMatrix * viewMatrix * uM * vec4(aPosition, 1.0);
        gl_Position =  pos;
         gl_PointSize = 5.0;
    }
    `,


    fsSource :`
    precision lowp float;
    uniform vec4 uColor;
     void main(void){
        gl_FragColor = uColor;    
     }
    `,

    setup: function(gl){
        this.program = gl.createProgram()
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER)
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

        gl.shaderSource(this.vertexShader,this.vsSource)
        gl.compileShader(this.vertexShader)

        gl.shaderSource(this.fragmentShader,this.fsSource)
        gl.compileShader(this.fragmentShader)

        gl.attachShader(this.program,this.vertexShader)
        gl.attachShader(this.program,this.fragmentShader)

        gl.linkProgram(this.program)
    },

    bindAttribute: function(gl, id, number){
        this[id] = number
        gl.bindAttribLocation(this.program, this[id], id)
    },
    bindUniform: function(gl,id){
        this[id] = gl.getUniformLocation(this.program, id)
    }
}

Shaders.setup(gl)
Shaders.bindAttribute(gl, "aPosition", 0)
Shaders.bindUniform(gl, "uM")
Shaders.bindUniform(gl, "projMatrix")
Shaders.bindUniform(gl, "viewMatrix")
Shaders.bindUniform(gl, "uColor")


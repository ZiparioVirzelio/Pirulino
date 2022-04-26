
function setup(){
    gl.enable(gl.DEPTH_TEST)
    gl.useProgram(Shaders.program)
    gl.clearColor(0.8,0.8,0.8,0.8)
    gl.clear(gl.COLOR_BUFFER_BIT,gl.DEPTH_BUFFER_BIT)
    var cameraMatrix = glMatrix.mat4.create()

    glMatrix.mat4.lookAt(cameraMatrix,[0,5,10],[0,0,0],[0,1,0])
    gl.uniformMatrix4fv(Shaders['viewMatrix'],false,cameraMatrix)

    var projetionMatrix = identity()
    glMatrix.mat4.perspective(projetionMatrix,3.14/4,1.0,0.15,15000)

    gl.uniformMatrix4fv(Shaders['projMatrix'],false,projetionMatrix)
}


function createScene(){
    var shape = new Cube(true)
    var shape2 = new Cube(false)
    var cube = new Drawable(gl,"pancrazio",[1,0,1],shape)
    var cube2 = new Drawable(gl,"pancrazio",[1,1,0],shape2)
    var graph = new sceneNode(null)
    var node1 = new sceneNode(cube)
    var node2 = new sceneNode(cube2)
    graph.addFiglio(node1)
    node1.addFiglio(node2)
    cube.createObject()
    cube2.createObject()
    //Il pattern e' del tipo
    /*
    * creo la struttura di gerarchia
    * istanzio la roba in gpu
    * transformazioni
    * calcolo matrici
    * disegna oggetti*/
    cube.translate([0,0,0])
    cube.rotateY(3.14/3)
    cube2.translate([1,0,0])
    graph.calcScene()

    cube.drawObject()
    cube2.drawObject()




}

function drawScene(){
    var graph = createScene()
   // window.requestAnimationFrame(drawScene)
}
setup()
drawScene()

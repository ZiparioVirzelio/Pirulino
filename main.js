
function setup(){
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.useProgram(Shaders.program)
    gl.clearColor(0.3,0.8,0.8,0.8)
    gl.clear(gl.COLOR_BUFFER_BIT,gl.DEPTH_BUFFER_BIT)
    var cameraMatrix = glMatrix.mat4.create()

    glMatrix.mat4.lookAt(cameraMatrix,[0,5,10],[0,0,0],[0,1,0])
    gl.uniformMatrix4fv(Shaders['viewMatrix'],false,cameraMatrix)

    var projetionMatrix = identity()
    glMatrix.mat4.perspective(projetionMatrix,3.14/4,1.0,0.15,150)

    gl.uniformMatrix4fv(Shaders['projMatrix'],false,projetionMatrix)
}


function createScene(){
    var shape = theCube
    var shape2 = theCubeContour
    var shape3 = theCubePoints
    var cube = new Drawable(gl,"pancrazio",[0,0,1],shape)
    var cube2 = new Drawable(gl,"pancrazio",[0,1,0],shape2)
    var cube3 = new Drawable(gl,"pancrazio",[1,0,0],shape3)

    var graph = new sceneNode(null)
    var node1 = new sceneNode(cube)
    var node2 = new sceneNode(cube2)
    var node3 = new sceneNode(cube3)
    graph.addFiglio(node1)
    node1.addFiglio(node2)
    node2.addFiglio(node3)
    cube.createObject()
    cube2.createObject()
    cube3.createObject()
    //Il pattern e' del tipo
    /*
    * creo la struttura di gerarchia
    * istanzio la roba in gpu
    * transformazioni
    * calcolo matrici
    * disegna oggetti*/
    //cube.translate([0,0,0])
    //cube.rotateY(3.14/3)
    cube2.translate([0,2,0])
    cube3.translate([2,0,0])
    graph.calcScene()
    //node1.redrawScene()
    return node1



}



yo = createScene()
function drawScene(){
    //yo.element.rotateX(0.01)
    yo.element.rotateY(0.01)
    //yo.element.rotateZ(0.01)


    yo.calcSceneDraw()
    window.requestAnimationFrame(drawScene)
}
setup()
drawScene()

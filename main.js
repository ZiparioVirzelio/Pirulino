
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
    var cube = new Drawable(gl,new Cube(true))
    var cube2 = new Drawable(gl,new Cube(true))
    var element = new sceneElement("cube",[1,0,0],cube)
    var element2 = new sceneElement("cube2",[1,0,1,],cube2)
    element.translate([1,1,1])
    element2.rotateY(3.14/10)
    //element2.translate([1,1,1])
    var node2 = new sceneNode(element2,[])
    return new sceneNode(element, [node2])
}

function drawScene(){
    var graph = createScene()
    graph.drawGraph()
   // window.requestAnimationFrame(drawScene)
}
setup()
drawScene()

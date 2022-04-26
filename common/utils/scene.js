/* For reference :
* A shape object is an object with:
*
*   draws only edges
*   this.isContour  : bool
*   Vertex array
*   this.vertexs    : Float32Array gl.FLOAT
*   Indexs array
*   this.indexs     : Uint16Array gl.UNSIGNED_SHORT
* */


class sceneElement {
    constructor(name = "Default_element",color = [1,0,1]){
        this.name = name
        this.color = color
        this.rotationMatrix = glMatrix.mat4.create()
        this.scaleMatrix = glMatrix.mat4.create()
        this.translationMatrix = glMatrix.mat4.create()
        //Father frame
        this.fMatrix = glMatrix.mat4.create()

    }
    rotateX(angle){
        glMatrix.mat4.rotateX(this.rotationMatrix,this.rotationMatrix,angle)
    }
    rotateY(angle){
        glMatrix.mat4.rotateY(this.rotationMatrix,this.rotationMatrix,angle)
    }
    rotateZ(angle){
        glMatrix.mat4.rotateZ(this.rotationMatrix,this.rotationMatrix,angle)
    }
    translate(translationVector){
        glMatrix.mat4.translate(this.translationMatrix,this.translationMatrix,translationVector)
    }
    scale(scaleVector){
        glMatrix.mat4.scale(this.scaleMatrix,this.scaleMatrix,scaleVector)
    }
    getFrame(){
        var tmp = glMatrix.mat4.create()
        //TransScalRot (TSR) Matrix composition -> father matrix * son matrix * vertex
        // We express points in father's perspective so we can have global coordinates
        // as father matrix * son matrix * vertex and that's basically it

        // tmp = T * S
        glMatrix.mat4.mul(tmp,this.translationMatrix,this.scaleMatrix)
        //(T * S) = T * S * R
        glMatrix.mat4.mul(tmp,tmp,this.rotationMatrix)
        glMatrix.mat4.mul(tmp,this.fMatrix,tmp)
        return tmp
    }
    setFatherFrame(frame){
        glMatrix.mat4.copy(this.fMatrix,frame)
    }
    setColor(color) {
        this.color = color
    }
    getColor(){
        return this.color
    }


}

class sceneNode {
    constructor(element,figli = []) {
        if(figli == null)
            alert("[Scene node constructor] passed null params")
        this.element = element
        this.figli = figli
    }
    getDrawable(){
        return this.element
    }
    addFiglio(drawab){
        this.figli.push(drawab)
    }
    calcScene(){
        sceneNode.recCalcScene(this,identity())
    }
    static recCalcScene(sNode,acc){
        if(sNode.element == null){
            sNode.figli.forEach((figlio)=>{
                sceneNode.recCalcScene(figlio,acc)
            })
            return
        }
        sNode.element.setFatherFrame(acc)
        sNode.figli.forEach((figlio) =>{
            sceneNode.recCalcScene(figlio,sNode.element.getFrame())
        })

    }






}

class Drawable extends sceneElement{

    constructor(gl,name = "Default_element",color = [1,0,0],shape = null) {
        super(name,color)
        this.shape = shape
        this.order = 0
        this.gl = gl
        this.vBuffer = this.gl.createBuffer()
        this.iBuffer = this.gl.createBuffer()
        if(this.shape != null){
            if (this.shape.isContour) {
                this.typeOfDraw = this.gl.LINES
            } else {
                this.typeOfDraw = this.gl.TRIANGLES
            }
        }
    }
    drawObject(){
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vBuffer)
        this.gl.enableVertexAttribArray(Shaders['aPosition'])
        this.gl.vertexAttribPointer(Shaders['aPosition'],3,gl.FLOAT,false,0,0)

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.iBuffer)
        this.gl.uniform4f(Shaders['uColor'],...this.color,1)
        this.gl.uniformMatrix4fv(Shaders['uM'],false,this.getFrame())
        this.gl.drawElements(this.typeOfDraw,this.shape.indexs.length,this.gl.UNSIGNED_SHORT,0)
        this.gl.disableVertexAttribArray(Shaders["aPosition"])
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null)
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null)
    }
    createObject(){
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER,this.shape.vertexs,this.gl.STATIC_DRAW)
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.iBuffer)
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.shape.indexs,this.gl.STATIC_DRAW)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null)
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null)
    }
    setOrder(order){
        this.order = order
    }


}
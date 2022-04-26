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


class Drawable{
    constructor(gl,shape = null) {
        this.shape = shape
        this.gl = gl
        this.vBuffer = this.gl.createBuffer()
        this.iBuffer = this.gl.createBuffer()
    }
    createObject(){
        //https://stackoverflow.com/questions/2647867/how-can-i-determine-if-a-variable-is-undefined-or-null
        if(this.shape == null){
            return
        }
        if(this.shape.isContour) {
            this.typeOfDraw = this.gl.LINES
        }else{
            this.typeOfDraw = this.gl.TRIANGLES
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER,this.shape.vertexs,this.gl.STATIC_DRAW)

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.iBuffer)
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.shape.indexs,this.gl.STATIC_DRAW)

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null)
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null)
    }

}

class sceneElement {
    constructor(name = "Default_element",color = [1,0,1],drawable = null){
        this.name = name
        this.color = color
        this.drawable= drawable
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
    getDrawable(){
        return this.drawable
    }
    drawObject(){
        this.drawable.gl.bindBuffer(this.drawable.gl.ARRAY_BUFFER,this.drawable.vBuffer)
        this.drawable.gl.enableVertexAttribArray(Shaders['aPosition'])
        this.drawable.gl.vertexAttribPointer(Shaders['aPosition'],3,gl.FLOAT,false,0,0)

        this.drawable.gl.bindBuffer(this.drawable.gl.ELEMENT_ARRAY_BUFFER,this.drawable.iBuffer)
        this.drawable.gl.uniform4f(Shaders['uColor'],...this.color,1)
        this.drawable.gl.uniformMatrix4fv(Shaders['uM'],false,this.getFrame())
        this.drawable.gl.drawElements(this.drawable.typeOfDraw,this.drawable.shape.indexs.length,this.drawable.gl.UNSIGNED_SHORT,0)
        this.drawable.gl.disableVertexAttribArray(Shaders["aPosition"])
        this.drawable.gl.bindBuffer(this.drawable.gl.ARRAY_BUFFER,null)
        this.drawable.gl.bindBuffer(this.drawable.gl.ELEMENT_ARRAY_BUFFER,null)
    }


}

class sceneNode {
    constructor(sceneElement,figli = []) {
        if(sceneElement == null || figli == null)
            alert("[Scene node constructor] passed null params")
        this.element = sceneElement
        this.figli = figli
    }
    drawGraph(){
        //insert parallel code here
        //Todo graph traversal
        if(this.element.drawable != null){
            this.element.drawable.createObject()
            this.element.drawObject()
            this.figli[0].element.setFatherFrame(this.element.getFrame())
            this.figli[0].element.drawable.createObject()
            this.figli[0].element.drawObject()
        }

    }



}
class SceneNode{

    constructor(drawable) {
        this.drawable = drawable
        this.figli = []
    }
    addFiglio(node){
        node.drawable.setFatherFrame(this.drawable.getFrame())
        this.figli.push(node)
    }
    getDrawable(){
        return this.drawable
    }


}
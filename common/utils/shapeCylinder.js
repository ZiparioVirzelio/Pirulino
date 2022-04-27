const cyVertexGen = function (resolution) {
    let angle = 0
    let step = (Math.PI*2)/resolution
    let lowY = -1.0
    let highY = +1.0

    let out = [0.0, lowY, 0.0]
    //lowerCircle
    for(let i=1; i<=resolution; i++){
        out.push(Math.cos(angle), lowY, Math.sin(angle))
        angle += step
    }
    out.push(0.0,highY,0.0)


    angle = 0
    //upperCircle
    for(let i=0; i<resolution;i++){
        out.push(Math.cos(angle), highY, Math.sin(angle))
        angle += step
    }

    return out
}
const cyIndexContourGen = function(resolution){
    let out = []
    //lowerCircle
    for(let i=1; i<resolution; i++){
        out.push(i,i+1)
    }
    out.push(resolution,1)
    //upperCircle
    for(let i=1; i<resolution; i++){
        out.push(resolution+1+i, resolution+2+i)
    }
    out.push(resolution+2, 2*resolution+1)
    return out
}

//questa versione crea le linee anche per gli spigoli laterali (da usare solo con resolution bassa)
const cyIndexContourGen2 = function(resolution){
    let out = []
    //lowerCircle
    for(let i=1; i<resolution; i++){
        out.push(i,i+1)
    }
    out.push(resolution,1)
    //upperCircle
    for(let i=1; i<resolution; i++){
        out.push(resolution+1+i, resolution+2+i)
    }
    out.push(resolution+2, 2*resolution+1)
    //lateral edges
    for(let i = 1; i<=resolution; i++)
        out.push(i,i+resolution+1)


    return out
}
const cyIndexGen = function (resolution){
    let out= []
    //lowerCircle
    for (let i = 1; i<resolution; i++){
        out.push(i+1,0, i)
    }
    out.push(1, 0,resolution)


    //upperCircle
    for(let i = 1; i<resolution; i++){

        out.push(i+resolution+1, resolution+1,i+resolution+2)
    }

    out.push( 2*resolution+1,resolution+1,resolution+2)

    //lateralFaces
    for(let i = 1; i<resolution; i++){
        out.push(i+resolution+1,i+1, i)
        out.push(i+resolution+2,i+1,i+resolution+1)
    }

    out.push(resolution*2 + 1,1, resolution,)
    out.push(resolution+2, 1,resolution*2 + 1)


    return out
}



const theCylinder10 = {
    drawingType : "TRIANGLES",

    vertexs: new Float32Array(cyVertexGen(10)),

    indexs : new Uint16Array(cyIndexGen(10))
}











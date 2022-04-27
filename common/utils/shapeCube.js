const theCube = {

    drawingType : "TRIANGLES",
    ////////////////////////////////////////////////////////////
    vertexs: new Float32Array([
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0
    ]),

    // triangles definition
    ////////////////////////////////////////////////////////////
    indexs : new Uint16Array([
        0, 1, 2, 2, 1, 3,  // front
        5, 4, 7, 7, 4, 6,  // back
        4, 0, 6, 6, 0, 2,  // left
        1, 5, 3, 3, 5, 7,  // right
        2, 3, 6, 6, 3, 7,  // top
        4, 5, 0, 0, 5, 1   // bottom
    ])
}

const theCubeContour = {
    drawingType : "LINES",
    ////////////////////////////////////////////////////////////
    vertexs: new Float32Array([
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0
    ]),

    // triangles definition
    ////////////////////////////////////////////////////////////
    indexs : new Uint16Array([
        0,1, 1,3, 3,2, 2,0, //front
        5,7, 7,6, 6,4, 4,5, //back
        1,5, 3,7, 2,6, 0,4, //bridges
    ])
}
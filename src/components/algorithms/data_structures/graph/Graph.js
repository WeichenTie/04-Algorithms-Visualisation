class WeightedBiGraph {
    constructor(vertices) {
        this.adjacencyMatrix = []
        this.verticesList = [];
        
        this.initGraph(vertices);
    }

    initGraph(vertices) {
        for(let i = 0; i <vertices; i++) {
        let row = [];
            for (let j = 0; j < vertices; j++) {
                row.push(0);
            }
            this.adjacencyMatrix.push(row);
        }
    }


    addVertex(vertex) {
        verticesList.push(vertex);
    }
    addForwardEdge(start, end, weight) {
        
    }
    addBidirectionalEdge(v1, v2, weight) {
        addForwardEdge(v1, v2, weight);
        addForwardEdge(v2, v1, weight);
    }
}

export default WeightedBiGraph;
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    addVertex(vertex) {
        this.adjacencyList.set(vertex, new Map());
    }
    removeVertex(vertex) {
        for (let verts of this.adjacencyList.keys()) {
            if (verts === vertex) continue;
            for (let vert of this.adjacencyList.get(verts).keys()) {
                this.removeEdge(verts, vertex);
            }
        }
        this.adjacencyList.delete(vertex);
    }
    addEdge(src, dest, weight) {
        this.adjacencyList.get(src).set(dest, weight);
    }
    removeEdge(src, dest) {
        this.adjacencyList.get(src).delete(dest);
    }
    getEdgeWeight(src, dest) {
        return this.adjacencyList.get(src).get(dest)
    }
    getOutboundEdges(vertex) {
        return this.adjacencyList.get(vertex).entries();
    }
}
class Graph {
    constructor() {
        this.adjacencyList = new Map();
        this.numVertex = 0;
    }
    addVertex(vertex) {
        this.adjacencyList.set(vertex, new Map());
        this.numVertex++;
    }
    removeVertex(vertex) {
        for (let verts of this.adjacencyList.keys()) {
            if (verts === vertex) continue;
            for (let vert of this.adjacencyList.get(verts).keys()) {
                this.removeEdge(verts, vertex);
            }
        }
        this.adjacencyList.delete(vertex);
        this.numVertex--;
    }
    addEdge(src, dest, weight, path=null) {
        if (path != null) {
            weight = path.length;
        }
        this.adjacencyList.get(src).set(dest, {weight:weight, path:path});
    }
    removeEdge(src, dest) {
        this.adjacencyList.get(src).delete(dest);
    }
    getEdgeWeight(src, dest) {
        return this.adjacencyList.get(src).get(dest).weight;
    }
    getEdgePath(src, dest) {
        return this.adjacencyList.get(src).get(dest).path;
    }
    getOutboundEdges(vertex) {
        return this.adjacencyList.get(vertex).entries();
    }
}
export default Graph;
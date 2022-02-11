function ClosestNeighbour(graph) {
    const visited = new Set();
    const path = [];
    const getClosestUnvisited = (vert) => {
        let closest = [-1, {weight: Infinity, path:[]}]
        for (let edge of graph.getOutboundEdges(vert)) {
            if (edge[1].weight < closest[1].weight &&
                !visited.has(edge[0]) &&
                (path.length === graph.numVertex - 2 || edge[0] != graph.numVertex - 1)
            ) {
                closest = edge;
            }
        }
        if (closest[0] > vert) {
            closest[1].path = closest[1].path.reverse();
        }
        return closest;
    }
    const linkEdges = (vert) => {
        if (vert === -1) {
            return;
        }
        visited.add(vert);
        const newEdge = getClosestUnvisited(vert);
        path.push(newEdge[1].path)
        linkEdges(newEdge[0]);
    }
    linkEdges(0);
    return path;
}

export default ClosestNeighbour;
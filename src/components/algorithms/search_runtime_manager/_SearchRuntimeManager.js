import Graph from '../data_structures/graph/Graph'
import PathfindingWrapper from '@/components/algorithms/pathfinding/PathfindingWrapper'

const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms));
// For this function to work, a start and end node must be provided
function SearchRuntimeManager (data) {
    // Check if start and end are provided otherwise return false
    // This will be handled by frontend with an alert
    const init = () => {
        // Add start node to graph
        graph.addVertex(0);
        vertices.set(0, data.startingPosition);
        //Add intermediate nodes to the graph
        for (let i = 0; i < data.flags.length; i++) {
            graph.addVertex(i + 1)
            vertices.set(i + 1, data.flags[i]);
        }
        // Add end node to graph
        graph.addVertex(1 + data.flags.length);
        vertices.set(1 + data.flags.length, data.endingPosition);
    }


    // Loop through each n(n + 1)/2 possible node combination 
    const searchAllPaths = async () => {
        for (let src = 0; src < graph.numVertex; src++) {
            for (let dest = src + 1; dest < graph.numVertex; dest++) {
                // Get the path
                const path = await PathfindingWrapper(
                    data,
                    await data.pathAlgorithm(data, vertices.get(src), vertices.get(dest))
                ).runAlgorithm();
                // Add that edge
                if (path === null) {
                    await asyncWait(750);
                    data.isPathFinding = false;
                    data.rerenderBoard();
                    return;
                }
                if (src === 0 || dest === graph.numVertex - 1) {
                    graph.addEdge(src, dest, path.length ,path.reverse());
                } else {
                    graph.addEdge(src, dest, path.length, path);
                    graph.addEdge(dest, src, path.length, path.reverse());
                }

                await asyncWait(750);
                data.rerenderBoard();
                
            }
        }
        data.isPathFinding = false;
    }

    const _searchAllPaths = async () => {
        let src = 0;
        let dest = 1;
        const runSearch = async () => {
            
            
            
            
            src++;
        }
        return runSearch;
    }
    
    // Traverse graph from start to finish
    const link = async () => {
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
            if (closest[0] < vert) {
                closest[1].path = closest[1].path.reverse();
            }
            return closest;
        }

        const linkEdges = (vert) => {
            console.log(vert);
            console.table(visited)
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


    const instantLoop = async () => {
        for (let src = 0; src < graph.numVertex; src++) {
            for (let dest = src + 1; dest < graph.numVertex; dest++) {
                // Get the path
                const path = await PathfindingWrapper(
                    data,
                    await data.pathAlgorithm(data, vertices.get(src), vertices.get(dest))
                ).runAlgorithm();
                if (path === null) {
                    data.isPathFinding = false;
                    data.rerenderBoard();
                    return;
                }
                if (src === 0 || dest === graph.numVertex - 1) {
                    graph.addEdge(src, dest, path.length ,path.reverse());
                } else {
                    graph.addEdge(src, dest, path.length, path);
                    graph.addEdge(dest, src, path.length, path.reverse());
                }
            }
        }
        data.isPathFinding = false;

    }
    const stepLoop = async () => {

    }
    const timedLoop = async () => {

    }



    // Run
    const run = async () => {
        if (data.renderSpeed === 0) {
            instantLoop();
        }
        else if (data.renderSpeed === -1) {
            await stepLoop();
        }
        else {
            await timedLoop();
        }
    }



    if (data.startingPosition === null || data.endingPosition === null) return ()=>{data.isPathFinding = false};
    let vertices = new Map();
    const graph = new Graph();
    init();



    return run;
}

export default SearchRuntimeManager;

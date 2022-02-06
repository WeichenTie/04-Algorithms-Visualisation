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
                    await asyncWait(1000);
                    data.isPathFinding = false;
                    data.rerenderBoard();
                    return;
                }
                if (src === 0 || dest === graph.numVertex - 1) {
                    graph.addEdge(src, dest, path.length ,path);
                } else {
                    graph.addEdge(src, dest, path.length, path);
                    graph.addEdge(dest, src, path.length, path.reverse());
                }

                await asyncWait(1000);
                data.rerenderBoard();
                
            }
        }
        console.table(graph.getEdgePath(0,1));
        data.isPathFinding = false;
    }
    
    
    
    
    // Traverse graph from start to finish
    
    // Display shortest path



    if (data.startingPosition === null || data.endingPosition === null) return ()=>{data.isPathFinding = false};
    let vertices = new Map();
    const graph = new Graph();
    init();
    return searchAllPaths;
}

export default SearchRuntimeManager;

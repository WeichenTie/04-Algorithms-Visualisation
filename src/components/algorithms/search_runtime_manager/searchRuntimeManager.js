import Graph from '../data_structures/graph/Graph'
import PathfindingWrapper from '@/components/algorithms/pathfinding/PathfindingWrapper'
import LinkerWrapper from '../linker/LinkerWrapper';

const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms));
// For this function to work, a start and end node must be provided
function SearchRuntimeManager(data) {
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

    // Searches each possible path between nodes
    const doSearch = () => {
        let src = 0;
        let dest = 1;
        const run = async () => {
            if (src >= graph.numVertex - 1) {
                return true;
            }
            // Run path finder
            const path = await PathfindingWrapper(
                data,
                await data.pathAlgorithm(data, vertices.get(src), vertices.get(dest)))
                .runAlgorithm();
            // Check if no path exist
            if (path === null) {
                data.rerenderBoard();
                return true;
            }
            // Adds edge to graph if path is found 
            graph.addEdge(src, dest, path.weight, path.path);
            graph.addEdge(dest, src, path.weight, path.path);
            // Incrementing
            dest++;
            if (dest >= graph.numVertex) {
                src++;
                dest = src + 1;
            }
            return false;
        }
        return run;
    }

    const stepper = async () => {
        if (!doneSearch) {
            doneSearch = await search();
            return false;
        } 
        else {
            await (LinkerWrapper(data, data.linkerAlgorithm, graph)).runAlgorithm();
            data.isPathFinding = false;
            return true;
        }
    }

    const timedLoop = async () => {
        return new Promise((resolve, reject) => {
            const runTimedLoop = async () => {
                // Search completely stopped
                if (!data.isPathFinding) {
                    clearTimeout(timeout);
                    resolve();
                }
                // Set to instant render
                else if (data.renderSpeed === 0 || data.isLive) {
                    clearTimeout(timeout);
                    await runAlgorithm();
                    resolve();
                }
                // Set to step mode
                else if (data.renderSpeed === -1) {
                    clearTimeout(timeout);
                    await runAlgorithm();
                    resolve();
                }
                // Run algorithm and check if it is done
                else {
                    if (await stepper()) {
                        clearTimeout(timeout);
                        resolve();
                    } else {
                        await asyncWait(Math.min(data.renderSpeed / 100 * 2500, 1000));
                        data.rerenderBoard();
                        timeout = setTimeout(() => runTimedLoop(), data.renderSpeed);
                    }
                }
            }
            let timeout = setTimeout(() => runTimedLoop(), data.renderSpeed);
        });
    }

    const instantLoop = async () => {
        while (!await search()) {
            continue;
        }
        data.rerenderBoard();
        await (LinkerWrapper(data, data.linkerAlgorithm, graph)).runAlgorithm();
        data.isPathFinding = false;
    }

    const stepLoop = async () => {
        // return new Promise((resolve, reject) => {
        //     const interval = setInterval(async () => {
        //         // Maze Generation completely stopped
        //         if (!data.isPathFinding) {
        //             resolve();
        //             clearInterval(interval);
        //         }
        //         // Set to instant render
        //         else if (data.renderSpeed === 0) {
        //             clearInterval(interval);
        //             await runAlgorithm();
        //             resolve();
        //         }
        //         // Set to timed render
        //         else if (data.renderSpeed !== -1) {
        //             clearInterval(interval);
        //             await runAlgorithm();
        //             resolve();
        //         }
        //         // Run algorithm and check if it is done
        //         else if (data.shouldStep) {
        //             if (stepper()) {
        //                 resolve();
        //                 clearInterval(interval);
        //             }
        //             data.shouldStep = false;
        //         }
        //     }, 20);
        // });
    }

    const runAlgorithm = async () => {
        if (data.renderSpeed === 0 || data.isLive) {
            await instantLoop();
        }
        else if (data.renderSpeed === -1) {
            await stepLoop();
        }
        else {
            await timedLoop();
        }
    }

    if (data.startingPosition === null || data.endingPosition === null) return () => { data.isPathFinding = false };
    let doneSearch = false;
    let doneLink = false;
    let vertices = new Map();
    const graph = new Graph();
    const search = doSearch();
    init();
    return runAlgorithm;
}

export default SearchRuntimeManager;

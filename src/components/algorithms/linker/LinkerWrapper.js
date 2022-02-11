import ClosestNeighbour from './ClosestNeighbour'

function LinkerWrapper(data, algorithm, graph) {
    
    const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms));
    

    let ind = 0;
    let subInd = 0;
    const doIteration = async () => {
        data.highlightAlgoDetailCell(path[ind][subInd], "temp3");
        subInd++;
        if (subInd >= path[ind].length) {
            subInd = 0;
            ind++;
        }
        return !(ind < path.length - 1);
    }

    const instantLoop = async () => {
        let _ind = 0;
        let _subInd = 0;
        while (_ind < path.length - 1) {
            data.highlightAlgoDetailCell(path[_ind][_subInd], "temp3");
            _subInd++;
            if (_subInd >= path[_ind].length) {
                _subInd = 0;
                _ind++;
            }
        }
        data.isPathFinding = false;
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
                    if (await doIteration()) {
                        clearTimeout(timeout);
                        resolve();
                    } else {
                        timeout = setTimeout(() => runTimedLoop(), data.renderSpeed);
                    }
                }
            }
            let timeout = setTimeout(() => runTimedLoop(), data.renderSpeed);
        });
    }

    const runAlgorithm = async () => {
        if (data.renderSpeed === 0 || data.isLive) {
            await instantLoop();
        }
        else if (data.renderSpeed === -1) {
            //await stepLoop();
        }
        else {
            await timedLoop();
        }
    }
    const path = algorithm(graph);
    return {runAlgorithm};
}

export default LinkerWrapper;
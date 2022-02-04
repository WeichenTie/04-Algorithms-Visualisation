function MazeGenWrapper(data, algorithm, endAction=(()=>{})) {
    let done = false;

    const timedLoop = async () => {
        return new Promise((resolve, reject) => {
            const runTimedLoop = async () => {
                // Maze Generation completely stopped
                if (!data.isGeneratingMaze) {
                    clearTimeout(timeout);
                    resolve();
                }
                // Set to instant render
                else if (data.renderSpeed === 0) {
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
                    if (stepper()) {
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
    const instantLoop = () => {
        while (!algorithm()) {
            continue;
        }
        done = true;
    }

    const stepper = () => {
        for (let i = 0; i < data.stepSize; i++) {
            if (algorithm()) {
                done = true;
                return true;
            }
        }
        return false;
    }

    const stepLoop = async () => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                // Maze Generation completely stopped
                if (!data.isGeneratingMaze) {
                    resolve();
                    clearInterval(interval);
                }
                // Set to instant render
                else if (data.renderSpeed === 0) {
                    clearInterval(interval);
                    await runAlgorithm();
                    resolve();
                }
                // Set to timed render
                else if (data.renderSpeed !== -1) {
                    clearInterval(interval);
                    await runAlgorithm();
                    resolve();
                }
                // Run algorithm and check if it is done
                else if (data.shouldStep) {
                    if (stepper()) {
                        resolve();
                        clearInterval(interval);
                    }
                    data.shouldStep = false;
                }
            }, 20);
        });
    }
    const runAlgorithm = async () => {
        if (data.renderSpeed === 0) {
            instantLoop();
        }
        else if (data.renderSpeed === -1) {
            await stepLoop();
        }
        else {
            await timedLoop();
        }
        if (done) {
            endAction();
        }
    }
    return { runAlgorithm, instantLoop };
}

export default MazeGenWrapper;
function PathfindingWrapper(data, algorithm) {
    const timedLoop = async () => {
        return new Promise((resolve, reject) => {
            const runTimedLoop = async () => {
                // Maze Generation completely stopped
                if (!data.isGeneratingMaze) {
                    clearTimeout(timeout);
                    resolve(true);
                }
                // Set to instant render
                else if (data.renderSpeed === 0) {
                    clearTimeout(timeout);
                    instantLoop();
                    resolve(true);
                }
                // Set to step mode
                else if (data.renderSpeed === -1) {
                    await stepLoop();
                    clearTimeout(timeout);
                    resolve(false);
                }
                // Run algorithm and check if it is done
                else if (algorithm()) {
                    clearTimeout(timeout);
                    resolve(true);
                }
                else {
                    timeout = setTimeout(() => runTimedLoop(), data.renderSpeed);
                }
            }
            let timeout = setTimeout(() => runTimedLoop(), data.renderSpeed);
        });
    }

    const instantLoop = () => {
        while (!algorithm()) {
            continue;
        }
    }

    const stepper = () => {
        for (let i = 0; i < data.stepSize; i++) {
            if (algorithm()) {
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
                    resolve(true);
                    clearInterval(interval);
                }
                // Set to instant render
                else if (data.renderSpeed === 0) {
                    instantLoop()
                    clearInterval(interval);
                    resolve(true);
                }
                // Set to instant render
                else if (data.renderSpeed !== -1) {
                    await timedLoop();
                    clearInterval(interval);
                    resolve(false);
                }
                // Run algorithm and check if it is done
                else if (data.shouldStep) {
                    if (stepper()) {
                        resolve(true);
                        clearInterval(interval);
                    }
                    data.shouldStep = false;
                }
            }, 20);
        });
    }
    const runAlgorithm = async () => {
        let {done} = {done : false};
        if (data.renderSpeed === 0) {
            instantLoop();
            done = true;
        }
        else if (data.renderSpeed === -1) {
            await stepLoop().then((e) => {done = e});
        }
        else {
            await timedLoop().then((e) => {done = e});
        }

    }
    return { runAlgorithm, instantLoop };
}
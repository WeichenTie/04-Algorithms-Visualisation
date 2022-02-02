function GenMazeAlternateWall (data, endHook=()=>{}) {
    // setup
    let done = false;
    // values
    let index = 0;
    
    const algorithmIteration = () => {
        for (let i = 0; i < data.tableSize; i += 4) {
            data.draw([i, index], "wall");
        }
        for (let i = 2; i < data.tableSize; i += 4) {
            data.draw([i, data.tableSize - 1 - index], "wall");
        }
        index += 2;
        if (index >= data.tableSize) {
            clearInterval(loop);
            done = true;
            endHook();
        }
    }
    const loop = setInterval(() => {
        if (done || !data.isRunning) return; 
        algorithmIteration();
    }, data.renderSpeed);
}
 
export default GenMazeAlternateWall;
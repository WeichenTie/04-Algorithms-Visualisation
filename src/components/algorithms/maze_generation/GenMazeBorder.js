function GenMazeBorder (data, endHook=()=>{}) {
    // setup
    let done = false;
    // values
    let index = 0;
    endHook
    const algorithmIteration = () => {
        data.draw([0, index], "wall");
        data.draw([index, 0], "wall");
        data.draw([data.tableSize-1, data.tableSize-index-1], "wall");
        data.draw([data.tableSize-index-1, data.tableSize-1], "wall");
        index++;
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
 
export default GenMazeBorder;
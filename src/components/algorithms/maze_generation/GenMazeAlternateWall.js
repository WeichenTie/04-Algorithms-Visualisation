function GenMazeAlternateWall (data) {
    // values
    let index = 0;
    
    const algorithmIteration = () => {
        if (index >= data.tableSize) return true;
        for (let i = 0; i < data.tableSize; i += 4) {
            data.draw([i, index], "wall");
        }
        for (let i = 2; i < data.tableSize; i += 4) {
            data.draw([i, data.tableSize - 1 - index], "wall");
        }
        index += 2;
        return index >= data.tableSize;
    }
    return algorithmIteration;
}
 
export default GenMazeAlternateWall;
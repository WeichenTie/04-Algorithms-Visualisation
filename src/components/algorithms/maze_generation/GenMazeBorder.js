async function GenMazeBorder (data) {
    // values
    let index = 0;
    const algorithmIteration = () => {
        if (index >= data.tableSize) return true;
        data.forceDraw([0, index], "wall");
        data.forceDraw([index, 0], "wall");
        data.forceDraw([data.tableSize-1, data.tableSize-index-1], "wall");
        data.forceDraw([data.tableSize-index-1, data.tableSize-1], "wall");
        index++;
        return index >= data.tableSize;
    }
    return algorithmIteration;
}
 
export default GenMazeBorder;
function GenMazeBorder (data) {
    // values
    let index = 0;
    const algorithmIteration = () => {
        if (index >= data.tableSize) return true;
        data.draw([0, index], "wall");
        data.draw([index, 0], "wall");
        data.draw([data.tableSize-1, data.tableSize-index-1], "wall");
        data.draw([data.tableSize-index-1, data.tableSize-1], "wall");
        index++;
        return index >= data.tableSize;
    }
    return algorithmIteration;
}
 
export default GenMazeBorder;
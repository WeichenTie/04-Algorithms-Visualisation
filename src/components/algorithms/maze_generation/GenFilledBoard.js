async function GenFilledBoard (data, filler) {
    // values
    let index = 0;
    
    const algorithmIteration = () => {
        if (index >= data.tableSize) return true;
        for (let i = 0; i < data.tableSize; i++) {
            data.draw([index, i], filler);
        }
        index += 1;
        return index >= data.tableSize;
    }
    return algorithmIteration;
}
 
export default GenFilledBoard;
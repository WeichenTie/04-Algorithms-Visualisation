async function GenFilledBoard (data, filler='wall') {
    // values
    let index = 0;
    
    const algorithmIteration = () => {
        if (index >= data.tableSize) return true;
        for (let i = 0; i < data.tableSize; i++) {
            data.forceDraw([index, i], filler);
        }
        index += 1;
        return index >= data.tableSize;
    }
    return algorithmIteration;
}
 
export default GenFilledBoard;
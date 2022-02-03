import GenMazeAlternateWall from "./GenMazeAlternateWall";
import GenMazeBorder from "./GenMazeBorder";

function GenPrimsMaze (data, wallStyle=()=>{return "wall"}) {
    function mapper(position) {
        return position[0]*data.tableSize + position[1];
    }
    //----------------------------------------
    //
    // Prims Start here 
    //
    //-----------------------------------------
    data.fillBoard("unvisited");
    data.fillBoard(wallStyle());
    function inBounds(x, y) {
        return (x > 0 && x < data.tableSize - 1) && (y > 0 && y < data.tableSize - 1)
    }
    function getNeighboursWithValue(next, value) {
        const neighbours = [];
        if (inBounds(next[1] + 2, next[0]) && data.board[next[0]][next[1] + 2] === value) {
            neighbours.push([next[0], next[1] + 2]);
        }
        if (inBounds(next[1] - 2, next[0]) && data.board[next[0]][next[1] - 2] === value) {
            neighbours.push([next[0], next[1] - 2]);
        }
        if (inBounds(next[1], next[0] + 2) && data.board[next[0] + 2][next[1]] === value) {
            neighbours.push([next[0] + 2, next[1]]);
        }
        if (inBounds(next[1], next[0] - 2) && data.board[next[0] - 2][next[1]] === value) {
            neighbours.push([next[0] - 2, next[1]]);
        }
        return neighbours;
    }
    function getCenter(a, b) {
        return [(a[0] + b[0])/2, (a[1] + b[1])/2];
    }
    function mapClear(position) {
        data.draw(position, "unvisited");
    }

    // Pick a cell mark it as part of the maze and add walls to options
    let next = [-1 , -1];
    while (!inBounds(next[1], next[0])) {
        next = [Math.floor(Math.random() * data.tableSize / 2) * 2 - 1, Math.floor(Math.random() * data.tableSize / 2) * 2 - 1];
    }
    let options = new Map();
    [...getNeighboursWithValue(next, -1), next].forEach((e) => options.set(mapper(e), e));
    mapClear(next);
    
    const algorithmIteration = () => {
        if (options.size === 0) return true;
        // pick random wall from list
        const optArr = []
        const iter = options.values();
        for (let val = iter.next(); !val.done; val=iter.next()) {
            optArr.push(val.value);
        }
        next = optArr[Math.floor(Math.random() * optArr.length)];
        options.delete(mapper(next));

        const nextNeighbours = getNeighboursWithValue(next, 0);
        if (nextNeighbours.length > 0) {
            const n = nextNeighbours[Math.floor(Math.random() * nextNeighbours.length)];
            mapClear(n);
            mapClear(next);
            mapClear(getCenter(n, next));
        }
        getNeighboursWithValue(next, -1).forEach((e) => options.set(mapper(e), e));

        return options.size === 0;
    }

    return algorithmIteration;
}

export default GenPrimsMaze
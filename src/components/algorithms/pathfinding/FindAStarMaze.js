
import PriorityQueue from "js-priority-queue";

function FindAStarMaze(data, start, end) {
    function posToInt(position) {
        return position[0] * data.tableSize + position[1];
    }
    function intToPos(int) {
        const x = int % data.tableSize;
        const y = (int - x) / data.tableSize;
        return [y , x];
    }
    function comparator(a, b) {
        let aScore = scores.get(a);
        let bScore = scores.get(b);
        return (aScore.g + aScore.h) - (bScore.g + bScore.h);
    }

    // Manhattan distance
    function calculateH(position) {
        return Math.abs(position[0] - end[0]) + Math.abs(position[1] - end[1]);
    }

    function inBounds(x, y) {
        return (x >= 0 && x < data.tableSize) && (y >= 0 && y < data.tableSize)
    }

    function addNeighbours(pos) {
        const position = intToPos(pos);
        function getTentative_gScore(neighbour) {
            return scores.get(pos).g + data.board[neighbour[0]][neighbour[1]] >= 0 ? data.board[neighbour[0]][neighbour[1]] + 1 : 1;
        }
        function processNeighbour(neighbour) {
            if (!scores.has(posToInt(neighbour))) { // never been visited
                scores.set(posToInt(neighbour), {g: Infinity, f: Infinity, h: calculateH(neighbour)})
            }
            const t_GScore = getTentative_gScore(neighbour);
            if (t_GScore < scores.get(posToInt(neighbour)).g) {
                path.set(posToInt(neighbour), pos);
                const neighScore = scores.get(posToInt(neighbour));
                neighScore.g = t_GScore;
                neighScore.f = t_GScore + neighScore.h;
                if (!openSet.has(posToInt(neighbour))) {
                    open.queue(posToInt(neighbour));
                    openSet.add(posToInt(neighbour));
                    path.set(posToInt(neighbour), pos);
                }
            }
        }
        if (inBounds(position[1] + 1, position[0]) && data.board[position[0]][position[1] + 1] !== -1) {
            processNeighbour([position[0], position[1] + 1]);
        }
        if (inBounds(position[1] - 1, position[0]) && data.board[position[0]][position[1] - 1] !== -1) {
            processNeighbour([position[0], position[1] - 1]);
        }
        if (inBounds(position[1], position[0] + 1) && data.board[position[0] + 1][position[1]] !== -1) {
            processNeighbour([position[0] + 1, position[1]]);
        }
        if (inBounds(position[1], position[0] - 1) && data.board[position[0] - 1][position[1]] !== -1) {
            processNeighbour([position[0] - 1, position[1]]);
        }
    }

    // Declare open and closed list
    const open = new PriorityQueue({ comparator: (a, b) => {return comparator(a, b)}});
    const openSet = new Set();

    const scores = new Map();
    let weight = 0;
    const path = new Map();

    // add starting node to the the open list
    open.queue(posToInt(start));
    scores.set(posToInt(start), {g: 0, h: calculateH(start), f: calculateH(start)});
    openSet.add(posToInt(start));
    
    const algorithmIteration = () => {
        if (open.length === 0) return null;
        let curNode = open.dequeue();
        openSet.delete(posToInt(curNode));
        if (curNode === posToInt(end)) {
            let shortestPath = [];
            // Get the shortest path as a list
            shortestPath.push(intToPos(curNode));
            let n = path.get(curNode);
            while (n != null) {
                const position = intToPos(n);
                shortestPath.push(position);
                weight += data.board[position[0]][position[1]];
                n = path.get(n);
            }
            for (let b of shortestPath) {
                data.highlightAlgoDetailCell(b , "temp1", false);
            }
            return {path: shortestPath, weight: weight};
        }
        data.highlightAlgoDetailCell(intToPos(curNode), "temp2", false);
        addNeighbours(curNode);
        //return [];
        return false;
    }
    return algorithmIteration;
}

export default FindAStarMaze;

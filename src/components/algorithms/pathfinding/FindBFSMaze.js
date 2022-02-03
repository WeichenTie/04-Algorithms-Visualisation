import LinkedList from "../data_structures/linked_list/LinkedList";
import Node from "../data_structures/linked_list/Node"
function FindBFSMaze(data, start, end) {
    function mapper(position) {
        return position[0] * data.tableSize + position[1];
    }

    function equalPosition(pos1, pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    }

    function visit(position) {
        visited.set(mapper(position), position)
    }

    function hasVisited(position) {
        //console.log(visited.has(mapper(position)))
        return visited.has(mapper(position));
    }

    function inBounds(x, y) {
        return (x >= 0 && x < data.tableSize) && (y >= 0 && y < data.tableSize)
    }
    
    function getUnvisitedNeighboursWithValue(position, value) {
        const neighbours = [];
        if (inBounds(position[1] + 1, position[0]) && data.board[position[0]][position[1] + 1] === value && !hasVisited([position[0], position[1] + 1])) {
            neighbours.push([position[0], position[1] + 1]);
        }
        if (inBounds(position[1] - 1, position[0]) && data.board[position[0]][position[1] - 1] === value && !hasVisited([position[0], position[1] - 1])) {
            neighbours.push([position[0], position[1] - 1]);
        }
        if (inBounds(position[1], position[0] + 1) && data.board[position[0] + 1][position[1]] === value && !hasVisited([position[0] + 1, position[1]])) {
            neighbours.push([position[0] + 1, position[1]]);
        }
        if (inBounds(position[1], position[0] - 1) && data.board[position[0] - 1][position[1]] === value && !hasVisited([position[0] - 1, position[1]])) {
            neighbours.push([position[0] - 1, position[1]]);
        }
        return neighbours;
    }


    const visited = new Map();
    visit(start);
    const queue = new LinkedList();
    queue.push(start);

    
    const algorithmIteration = () => {
        if (queue.isEmpty()) return true;
        const curNode = queue.shift();
        data.highlightAlgoDetailCell(curNode, "temp", false)
        if (curNode[0] === end[0] && curNode[1] === end[1]) {
            console.log("found");
            clearInterval(inter);
            return true;
        }
        const neighbours = getUnvisitedNeighboursWithValue(curNode, 0);
        neighbours.forEach(neighbour => {
            console.log(hasVisited(neighbour));
            visit(neighbour);
            queue.push(neighbour);
        });
    }

    const inter = setInterval(()=>algorithmIteration(), 10);
}

export default FindBFSMaze;
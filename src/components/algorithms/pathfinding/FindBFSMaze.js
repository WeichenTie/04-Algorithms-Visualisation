import LinkedList from "../data_structures/linked_list/LinkedList";
import Node from "../data_structures/linked_list/Node"
function FindBFSMaze(data, start, end) {
    console.log(start);
    console.log(end);
    function mapper(position) {
        return position[0] * data.tableSize + position[1];
    }

    function equalPosition(pos1, pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    }

    function visit(curPos, prevPos) {
        const n = (prevPos === null) ? new Node(curPos) : new Node(curPos, visited.get(mapper(prevPos)));
        visited.set(mapper(curPos), n)
    }

    function hasVisited(position) {
        return visited.has(mapper(position));
    }

    function inBounds(x, y) {
        return (x >= 0 && x < data.tableSize) && (y >= 0 && y < data.tableSize)
    }
    
    function getUnvisitedNeighbours(position) {
        const neighbours = [];
        if (inBounds(position[1] + 1, position[0]) && data.board[position[0]][position[1] + 1] !== -1 && !hasVisited([position[0], position[1] + 1])) {
            neighbours.push([position[0], position[1] + 1]);
        }
        if (inBounds(position[1] - 1, position[0]) && data.board[position[0]][position[1] - 1] !== -1 && !hasVisited([position[0], position[1] - 1])) {
            neighbours.push([position[0], position[1] - 1]);
        }
        if (inBounds(position[1], position[0] + 1) && data.board[position[0] + 1][position[1]] !== -1 && !hasVisited([position[0] + 1, position[1]])) {
            neighbours.push([position[0] + 1, position[1]]);
        }
        if (inBounds(position[1], position[0] - 1) && data.board[position[0] - 1][position[1]] !== -1 && !hasVisited([position[0] - 1, position[1]])) {
            neighbours.push([position[0] - 1, position[1]]);
        }
        return neighbours;
    }


    const visited = new Map();
    visit(start, null);
    const queue = new LinkedList();
    queue.push(start);

    
    const algorithmIteration = () => {
        if (queue.isEmpty()) return null;
        const curNode = queue.shift();
        data.highlightAlgoDetailCell(curNode, "temp2", false)
        if (curNode[0] === end[0] && curNode[1] === end[1]) {
            let shortestPath = [];
            // Get the shortest path as a list
            let n = visited.get(mapper(curNode));
            while (n != null) {
                shortestPath.push(n.value);
                n = n.prev;
            }

            for (let b of shortestPath) {
                data.highlightAlgoDetailCell(b , "temp1", false);
            }
            return shortestPath;
        }
        const neighbours = getUnvisitedNeighbours(curNode);
        neighbours.forEach(neighbour => {
            visit(neighbour, curNode);
            queue.push(neighbour);
        });
        return false;
    }
    return algorithmIteration;
}

export default FindBFSMaze;
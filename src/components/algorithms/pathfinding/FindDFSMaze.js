import LinkedList from "../data_structures/linked_list/LinkedList";
import Node from "../data_structures/linked_list/Node"
function FindDFSMaze(data, start, end) {
    function mapper(position) {
        return position[0] * data.tableSize + position[1];
    }

    function equalPosition(pos1, pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    }

    function visit(curPos, prevPos) {
        visited.set(mapper(curPos), prevPos)
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

    const path = new Map();
    const visited = new Map();
    const stack = new LinkedList();
    stack.push(start);
    let prevNode = null;
    
    const algorithmIteration = () => {
        if (stack.isEmpty()) return null; // not found
        let curNode = stack.pop();
        while (hasVisited(curNode)) {
            if (stack.isEmpty()) return null;
            curNode = stack.pop();
        }
        if (equalPosition(curNode, end)) {
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
        visit(curNode, prevNode);
        prevNode = curNode;
        data.highlightAlgoDetailCell(curNode, "temp2", false)
        const neighbours = getUnvisitedNeighbours(curNode);
        neighbours.forEach(neighbour => {
            stack.push(neighbour);
            let n = !path.has(mapper(curNode)) ? new Node(neighbour) : new Node(neighbour, path.get(mapper(curNode)));
            path.set(mapper(neighbour), n);
        });
        return false;
    }
    return algorithmIteration;
}

export default FindDFSMaze;

import PriorityQueue from "js-priority-queue";

class Cell {
    constructor(value, g, h, parent) {
        this.value = value;
        this.g = g;
        this.h = h;
    } 
}


function FindAStarMaze(data, start, end) {
    function posToInt(position) {
        return position[0] * data.tableSize + position[1];
    }
    function intToPos(int) {
        x = int % data.tableSize;
        y = (int - x) / data.tableSize;
        return [y , x];
    }

    function comparator(a, b) {
        return cells.get(b).f - cells.get(a).f;
    }

    const cells = new Map();
    // Declare open and closed list
    const open = new PriorityQueue({ comparator: function(a, b) { return b - a; }});
    const closed = new Set();

    // add starting node to the the open list
    open.queue(posToInt(start));

    while (openSet.length > 0) {

    }






    
    
}
<template lang="">
    <div class="grid">
        <SidebarOptions
            @on-brush-select="selectedBrush=$event"
            @on-run="handleStart"
            @on-stop="isRunning=false"
            @on-clear="fillBoard"
        />
        <div class='board'>
            <table :key="key">
                <tr v-for='(row, yIndex) in this.board' :key="yIndex" :id="'row-'+ yIndex">
                    <td v-for="(cell, xIndex) in row" 
                        :key="xIndex" 
                        :id="`${yIndex}-${xIndex}`" 
                        :ref="`${yIndex}-${xIndex}`"
                        :class="'unvisited'"
                        v-on:mousedown="handleMouseDown($event)"
                        v-on:mouseenter="handleMouseEnter($event)"
                        v-on:mouseup="handleMouseUp()"
                        :style="{
                            width: this.cellSize+'px',
                            height: this.cellSize+'px'
                        }"
                    >
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script lang="js">
import SidebarOptions from './SidebarOptions';
import GenPrimsMaze from './algorithms/maze_generation/GenPrimsMaze'
import GenMazeAlternateWall from './algorithms/maze_generation/GenMazeAlternateWall';
import GenMazeBorder from './algorithms/maze_generation/GenMazeBorder';
export default {
    components: {
        SidebarOptions,
    },
    data() {
        return {
            //Testing 
            key: 1,
            // Immutable data
            tableSize: 35,
            cellSize: 25,
            maxFlags: 8,
            brushValueMap: new Map(),
            valueBrushMap: new Map(),
            // Setting
            isRunning: false,
            renderSpeed: 50,
            selectedBrush: "wall",
            // Algorithms
            algorithm: null,
            linker: null,
            // BoardState
            board: [],
            flags:[],
            pathCells:[], // Cells that are highlighted to display searched areas
            startingPosition: null,
            endingPosition: null,
            // Temp Cell State
            lastValidPosition: null, // For dragging a cell
        }
    },
    beforeMount() {
        // Setup the mappers
        this.brushValueMap.set('unvisited', 0);
        this.brushValueMap.set('wall', -1);
        this.brushValueMap.set('start-node', -2);
        this.brushValueMap.set('end-node', -3);
        this.brushValueMap.set('weight', -4);
        this.brushValueMap.set('flag', -5);

        this.valueBrushMap.set(0, 'unvisited');
        this.valueBrushMap.set(-1, 'wall');
        this.valueBrushMap.set(-2, 'start-node');
        this.valueBrushMap.set(-3, 'end-node');
        this.valueBrushMap.set(-4, 'weight');
        this.valueBrushMap.set(-5, 'flag');
        // Populate the board
        this.board = this.newBoard();

        // Init starting and ending positions
        //this.startingPosition = [(this.tableSize - 1) / 2, (this.tableSize - 1) / 2 - 1];
        //this.endingPosition = [(this.tableSize - 1) / 2, (this.tableSize - 1) / 2 + 1];
        this.startingPosition = [0,0];
        this.endingPosition = [0,1];
        
    },
    mounted(){
        this.highlightCell(this.startingPosition, "start-node");
        this.highlightCell(this.endingPosition, "end-node");
        this.board[this.startingPosition[0]][this.startingPosition[1]] = this.brushValueMap.get("start-node");
        this.board[this.endingPosition[0]][this.endingPosition[1]] = this.brushValueMap.get("end-node");
    },

    methods: {
        //-----------------------------------------------------
        // Utils
        //-----------------------------------------------------
        newBoard: function () {
            const board = [];
            for (let i = 0; i < this.tableSize; i++) {
                const row = [];
                for (let j = 0; j < this.tableSize; j++) {
                    row.push(0);
                }
                board.push(row);
            }
            return board;
        },

        //-----------------------------------------------------
        // Handlers
        //-----------------------------------------------------
        // Actions taken when a cell is pressed
        handleMouseDown: function (event){
            if (event.buttons !== 1) return; // Returns if not left click
            const position = event.target.id.split('-');
            // Dragging behaviour
            if (this.selectedBrush === "drag") {
                if (this.isEmpty(position)) return;
                this.lastValidPosition = position;
            }
            // Drawing behaviour
            else {
                this.draw(position);
            }
        },
        handleMouseEnter: function (event){
            if (event.buttons !== 1) return; // Returns if not left click
            const position = event.target.id.split('-');
            if (this.selectedBrush === "drag") {
                if (this.lastValidPosition === null) return;
                else if (!this.isEmpty(position)) return;
                
                this.draw(position, this.valueBrushMap.get(this.board[this.lastValidPosition[0]][this.lastValidPosition[1]]));
                this.draw(this.lastValidPosition, "unvisited");
                this.lastValidPosition = position;
            }
            // Drawing behaviour
            else {
                this.draw(position);
            }
        },
        handleMouseUp: function () {
            this.lastValidPosition = null;
        },

        handleStart: function () {
            if (this.isRunning) return;
            this.isRunning = true;
            GenPrimsMaze(this);
        },
        //-----------------------------------------------------
        // Algorithms
        //-----------------------------------------------------

        //-----------------------------------------------------
        // Cell manipulation 
        //-----------------------------------------------------
        isEmpty: function(position) {
            return this.board[position[0]][position[1]] == 0;
        },
        
        draw: function(position, selectedBrush=this.selectedBrush, isAnimated=true) {
            const brush = selectedBrush + (isAnimated? "-animated":"");
            if (this.isEmpty(position) || brush === "unvisited" || brush === "unvisited-animated") {
                this.highlightCell(position, brush);
                this.board[position[0]][position[1]] = this.brushValueMap.get(selectedBrush);
            }
        },

        // Highlight cell at position with specific colour via classname manipulation
        highlightCell: function(position, highlight) {
            const pos = `${position[0]}-${position[1]}`;
            this.$refs[pos][0].classList.value = [highlight];
        },

        // Clears the board
        fillBoard: function(filler) {
            for (let i = 0; i < this.tableSize; i++) {
                for (let j = 0; j < this.tableSize; j++) {
                    this.draw([i,j], filler);
                }
            }
        },
        //-----------------------------------------------------
        // Rerendering functions
        //-----------------------------------------------------
        reRenderBoard: function(cellsToClear) {
            cellsToClear.forEach(element => {
                console.log(this.board + " : " + element);
            });
        },
        trueRerenderBoard: function() {
            this.board.forEach((row)=>console.log(row));
        },

    },
}



</script>

<style lang="scss">
@keyframes wallAnimation {
    0%{
        transform: scale(0);
        background-color: rgb(224, 187, 228);
        border-radius: 15px;
    }
    50% {
        transform: scale(1.3);
    }
    75% {
        border-radius: 6px;
    }
    
}
@keyframes unvisitedAnimation {
    0%{
        transform: scale(0);
        background-color:  #FEC8D8;
    }
    25%{
        border-radius: 15px;
    }
    50% {
        transform: scale(1.3);
        }
    75% {
        border-radius: 15px;
    }
    100%{
        transform:scale(0);
        background-color: rgb(255, 255, 255);
    }
    
}

.grid {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
}

.board {
    color: black;
}
table {
    table-layout: fixed;
    border-collapse: collapse;
    box-shadow: 0 0 10px #957DAD;
    width: fit-content;
    margin: 40px auto 100px;
    background-color: white;
}
td {
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    padding: 0;
    margin: 0;
    border: 1px solid rgb(201, 200, 255);
    cursor: pointer;
    
}
.start-node {
    background-color: rgb(145, 255, 0);
    &:hover {
        background-color: rgba(49, 255, 159, 0.863);
    }
}
.end-node {
    background-color: rgb(255, 155, 25);
    &:hover {
        background-color: rgba(255, 217, 49, 0.294);
    }
}
.wall-animated {
    background-color: #957DAD;
    animation: wallAnimation linear 0.4s;
}
.unvisited-animated {
    background-color: rgb(255, 255, 255);
    animation: unvisitedAnimation linear 0.4s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.294);
    }
}
</style>
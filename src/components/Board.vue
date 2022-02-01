
<template lang="">
    <SidebarOptions
        @on-brush-select="selectedBrush=$event"
    />
    <div class='board'>
        <table>
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
                ></td>
            </tr>
        </table>
    </div>
</template>

<script>
import SidebarOptions from './SidebarOptions'
export default {
    components: {
        SidebarOptions
    },
    data() {
        return {
            // Immutable data
            numRows: 5,
            numCols: 5,
            cellSize: 75,
            maxFlags: 8,
            brushValueMap: new Map(),
            valueBrushMap: new Map(),
            // Setting
            isRunning: true,
            renderSpeed: 1,
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

        this.valueBrushMap.set(-0, 'unvisited');
        this.valueBrushMap.set(-1, 'wall');
        this.valueBrushMap.set(-2, 'start-node');
        this.valueBrushMap.set(-3, 'end-node');
        this.valueBrushMap.set(-4, 'weight');
        this.valueBrushMap.set(-5, 'flag');
        // Populate the board
        for (let i = 0; i < this.numRows; i++) {
            const row = [];
            for (let j = 0; j < this.numCols; j++) {
                row.push(0);
            }
            this.board.push(row);
        }

        // Init starting and ending positions
        this.startingPosition = [(this.numRows - 1) / 2, (this.numCols - 1) / 2 - 1];
        this.endingPosition = [(this.numRows - 1) / 2, (this.numCols - 1) / 2 + 1];
    },
    mounted(){
        this.highlightCell(this.startingPosition, "start-node");
        this.highlightCell(this.endingPosition, "end-node");
        this.board[this.startingPosition[0]][this.startingPosition[1]] = this.brushValueMap.get("start-node");
        this.board[this.endingPosition[0]][this.endingPosition[1]] = this.brushValueMap.get("end-node");
    },

    methods: {
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
                console.log("starting drag at: " + this.lastValidPosition);
            }
            // Drawing behaviour
            else {
                this.draw(position);
            }

            
            //this.highlightCell(event.target.id.split('-'), this.selectedBrush);
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
        handleMouseUp: function (){
            this.lastValidPosition = null;
        },
        //-----------------------------------------------------
        // Cell manipulation 
        //-----------------------------------------------------
        isEmpty: function(position) {
            return this.board[position[0]][position[1]] == 0;
        },
        
        draw: function(position, selectedBrush=this.selectedBrush) {
            if (this.isEmpty(position) || selectedBrush === "unvisited") {
                this.highlightCell(position, selectedBrush);
                this.board[position[0]][position[1]] = this.brushValueMap.get(selectedBrush);
            }
        },

        // Highlight cell at position with specific colour via classname manipulation
        highlightCell: function(position, highlight) {
            const pos = `${position[0]}-${position[1]}`;
            this.$refs[pos][0].classList = [highlight];
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

<style lang="scss" scoped>
.board {
    color: black;
    table {
        table-layout: fixed;
        border-collapse: collapse;
        width: fit-content;
        margin: 40px auto;
    }
    td {
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        padding: 0;
        margin: 0;
        border: 1px solid rgb(201, 200, 255);
        cursor: pointer;
        &:hover {
            background-color: rgba(255, 239, 148, 0.294);
        }
        &.wall {
            background-color: rgb(133, 25, 255);
            &:hover {
            background-color: rgba(155, 49, 255, 0.294);
            }
        }
        &.weight {
            background-color: rgb(53, 89, 143);
            &:hover {
            background-color: rgba(33, 106, 155, 0.294);
            }
        }
        &.flag {
            background-color: rgb(167, 82, 82);
            &:hover {
            background-color: rgba(155, 33, 100, 0.294);
            }
        }
        &.start-node {
            background-color: rgb(145, 255, 0);
            &:hover {
            background-color: rgba(49, 255, 159, 0.863);
            }
        }
        &.end-node {
            background-color: rgb(255, 155, 25);
            &:hover {
            background-color: rgba(255, 217, 49, 0.294);
            }
        }
    }

}
</style>
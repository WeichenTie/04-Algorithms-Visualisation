
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
                    v-on:mousedown="handleCellSelect($event)"
                    v-on:mouseenter="handleCellSelect($event)"
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
            // Setting
            isRunning: false,
            renderSpeed: 1,
            selectedBrush: "wall",
            // Algorithms
            algorithm: null,
            linker: null,
            // BoardState
            board: [],
            flags:[],
            startingPosition: null,
            endingPosition: null,
            // Temp Cell State
            lastValidPosition: null,
        }
    },
    beforeMount() {
        // Initialise the board
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
    },

    methods: {
        //-----------------------------------------------------
        // Handlers
        //-----------------------------------------------------
        // Actions taken when a cell is pressed/dragged on
        handleCellSelect: function (event){
            if (event.buttons !== 1) return; // Returns if not left click
            this.highlightCell(event.target.id.split('-'), this.selectedBrush);
        },
        //-----------------------------------------------------
        // Cell manipulation 
        //-----------------------------------------------------
        // Highlight cell at position with specific colour via classname manipulation
        highlightCell: function(position, hightlight) {
            const pos = `${position[0]}-${position[1]}`;
            this.$refs[pos][0].classList = [hightlight];
        },





        //-----------------------------------------------------
        // Rerendering functions
        //-----------------------------------------------------
        reRenderBoard: function(cellsToClear) {
            cellsToClear.forEach(element => {
                console.log(this.board + " : " + element);
            });
        },
        trueRerenderBoard: function(cellsToClear) {
            cellsToClear.forEach(element => {
                console.log(this.board + " : " + element);
            });
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
<template lang="">
    <div class="grid">
        <!-- START OF HORRIBLE CODE  -->
        <SidebarOptions
            @on-brush-select="selectedBrush=$event"
            @on-generate-maze="handleStartMaze"
            @on-search="handleStartSearch"
            @on-stop="isGeneratingMaze=false"
            @on-clear="fillBoard"
            @on-weight-change="weight=$event"
            @on-render-speed-change="renderSpeed=Number($event)"
            @on-toggle-grid="isGridShowing=Boolean($event)"
            @on-toggle-animation="isAnimating=Boolean($event)"
        />
        <!-- END OF HORRIBLE CODE  -->
        <div class='board'>
            <table
                :style="{ // To satisfy mozilla browsers
                    width: this.cellSize*this.tableSize +'px',
                    height: this.cellSize*this.tableSize +'px',
                    cursor: this.getCursorStyle()
                }">
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
                            height: this.cellSize+'px',
                            border: this.isGridShowing ? '#1f1f1f5b 1px dotted' : 'none',
                        }"
                    >
                    </td>
                </tr>
            </table>
        </div>
        <div class="graph"
            :style="{
                height: this.cellSize*this.tableSize +'px'
            }"
        >

        </div>
    </div>
    
</template>
<script lang="js">
import SidebarOptions from './SidebarOptions';
import GenPrimsMaze from './algorithms/maze_generation/GenPrimsMaze';
import GenMazeAlternateWall from './algorithms/maze_generation/GenMazeAlternateWall';
import GenMazeBorder from './algorithms/maze_generation/GenMazeBorder';
import GenRecursiveDivisionMaze from './algorithms/maze_generation/GenRecursiveDivisionMaze';
import FindBFSMaze from './algorithms/pathfinding/FindBFSMaze';
import FindDFSMaze from './algorithms/pathfinding/FindDFSMaze';
import FindAStarMaze from './algorithms/pathfinding/FindAStarMaze';
import FindBestFSMaze from './algorithms/pathfinding/FindBestFSMaze';
import MazeGenWrapper from './algorithms/maze_generation/MazeGenWrapper';
import GenFilledBoard from './algorithms/maze_generation/GenFilledBoard';
import PathfindingWrapper from './algorithms/pathfinding/PathfindingWrapper';
import SearchRuntimeManager from './algorithms/search_runtime_manager/SearchRuntimeManager';
export default {
    components: {
        SidebarOptions,
    },
    data() {
        return {
            // Immutable data
            tableSize: 35,
            cellSize: 25,
            maxFlags: 8,
            brushValueMap: new Map(),
            valueBrushMap: new Map(),
            // Events
            // Animation Settings
            showAlgorithmDetails: true,
            renderSpeed: 10,
            isAnimating:true,
            tracerMarks:[],
            isDragging: false,
            // UI
            isGridShowing: true,
            // Algorithms
            isGeneratingMaze: false,
            isPathFinding: false,
            shouldStep: false,
            stepSize:1,
            mazeAlgorithm: GenPrimsMaze,
            pathAlgorithm: FindAStarMaze,
            linkerAlgorithm: null,
            isLive: true,
            // BoardState
            selectedBrush: "wall",
            weight: 1,
            isDirty: false,
            board: [],
            flags: [],
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
        this.startingPosition = [(this.tableSize - 1) / 2, (this.tableSize - 1) / 2 - 10];
        this.endingPosition = [(this.tableSize - 1) / 2, (this.tableSize - 1) / 2 + 10];
        
    },
    mounted(){
        this.forceDraw(this.startingPosition, "start-node");
        this.forceDraw(this.endingPosition, "end-node");
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
            if (this.isGeneratingMaze || this.isPathFinding) return;
            let position = event.target.id.split('-').map(pos => {
                return Number(pos);
            });
            // Dragging behaviour
            if (this.selectedBrush === "drag") {
                if (this.isEmpty(position)) return;
                this.isDragging = true;
                this.lastValidPosition = position;
            }
            // Drawing behaviour
            else {
                this.draw(position);
            }
            if (this.isLive) {
                this.rerenderBoard();
                SearchRuntimeManager(this)();
            }
        },
        handleMouseEnter: function (event) {
            if (this.isGeneratingMaze || this.isPathFinding) return;
            if (event.buttons !== 1) return; // Returns if not left click
            let position = event.target.id.split('-').map(pos => {
                return Number(pos);
            });
            if (this.selectedBrush === "drag") {
                if (this.lastValidPosition === null) return;
                else if (!this.isEmpty(position)) return;
                this.rerenderBoard();
                const lastValPosBrush = this.valueBrushMap.get(this.board[this.lastValidPosition[0]][this.lastValidPosition[1]]);
                this.draw(this.lastValidPosition, "unvisited");
                this.draw(position, lastValPosBrush);
                this.lastValidPosition = position;
            }
            // Drawing behaviour
            else {
                this.draw(position);
            }
            if (this.isLive) {
                this.rerenderBoard();
                SearchRuntimeManager(this)();
            }
        },
        handleMouseUp: function () {
            this.lastValidPosition = null;
            this.isDragging = false;
        },
        handleStartMaze: async function () {
            if (this.isGeneratingMaze) return;
            this.isGeneratingMaze = true;
            this.rerenderBoard();
            await MazeGenWrapper(this, await this.mazeAlgorithm(this), ()=>{this.isGeneratingMaze = false}).runAlgorithm();
        },
        handleStartSearch: async function () {
            if (this.isPathFinding) return;
            this.isPathFinding = true;
            this.rerenderBoard();
            await SearchRuntimeManager(this)();
            //await PathfindingWrapper(this, await this.pathAlgorithm(this, this.startingPosition, this.endingPosition), ()=>{this.isPathFinding = false}).runAlgorithm();
        },
        handleStep: function () {
            this.shouldStep = true;
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
        
        draw: function(position, selectedBrush=this.selectedBrush, isAnimated=(this.isAnimating && !this.isLive)) {
            if (selectedBrush === "unvisited") {
                this.forceDraw(position, selectedBrush, isAnimated);
            }
            else if (this.isEmpty(position)) {
                if (selectedBrush === "end-node") {
                    if (this.endingPosition !== null) return;
                    this.endingPosition = position;
                }
                else if (selectedBrush === "start-node") {
                    if (this.startingPosition !== null) return;
                    this.startingPosition = position;
                }
                else if (selectedBrush === "flag") {
                    if (this.flags.length <= 6) {
                        this.flags.push(position);
                    } else {
                        return;
                    }
                }
                this.forceDraw(position, selectedBrush, isAnimated)
            }
        },
        forceDraw: function(position, selectedBrush=this.selectedBrush, isAnimated=isAnimated=(this.isAnimating && !this.isLive)) {
            const brush = selectedBrush + (isAnimated? "-animated":"");
            if (this.board[position[0]][position[1]] === -2) { // start node
                this.startingPosition = null;
            }
            else if (this.board[position[0]][position[1]] === -3) {
                this.endingPosition = null;
            }
            else if (this.board[position[0]][position[1]] === -5) {
                for (let i = 0; i < this.flags.length; i++) {
                    if (this.flags[i][0] === position[0] && this.flags[i][1] === position[1]) {
                        this.flags.splice(i, 1);
                    }
                }
            }
            this.rerenderBoard();
            this.highlightCell(position, brush);
            this.board[position[0]][position[1]] = this.brushValueMap.get(selectedBrush);
        },

        // Highlight cell at position with specific colour via classname manipulation
        highlightCell: function(position, highlight) {
            const pos = `${position[0]}-${position[1]}`;
            this.$refs[pos][0].classList.value = [highlight];
        },

        // Temporary highlight cell at position with specific colour via classname manipulation
        highlightAlgoDetailCell: function(position, highlight, isAnimated=(this.isAnimating && !this.isLive)) {
            const brush = highlight + (isAnimated? "-animated":"");
            const pos = `${position[0]}-${position[1]}`;
            const list = this.$refs[pos][0].classList.value.split(" ");
            if (list[0].includes("unvisited")) {
                this.tracerMarks.push(pos);
                this.$refs[pos][0].classList.value = `${list[0]} ${brush}`;
            }
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
        rerenderBoard: function() {
            while (this.tracerMarks.length > 0) {
                const pos = this.tracerMarks.pop();
                //const list = this.$refs[pos][0].classList.value.split(" ");
                this.$refs[pos][0].classList.value = "unvisited" ;//`${list[0]}`;
            }
            this.tracerMarks = [];
        },
        trueRerenderBoard: function() {
            this.board.forEach((row)=>console.log(row));
        },

        //-----------------------------------------------------
        // Styling functions
        //-----------------------------------------------------
        getCursorStyle: function() {
            if (this.isGeneratingMaze || this.isPathFinding) {
                return "not-allowed";
            }
            else if (this.selectedBrush === "drag") {
                if (this.isDragging) return 'grabbing';
                else return "grab";
            }
            else {
                return "pointer"
            }
        }
    },
}



</script>

<style lang="scss">
$table-radius: 10px;


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
        background-color:  #CFD1FC;
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
@keyframes flagAnimation {
    0%{
        transform: scale(0);
        background-color: rgb(255, 180, 180);
        border-radius: 15px;
    }
    50% {
        transform: scale(1.3);
    }
    75% {
        border-radius: 6px;
    } 
}

@keyframes detailsRedAnimation {
    0%{
        transform: scale(0);
    }
    25% {
        border-radius: 15px;
    }
    50% {
        border: rgb(229, 30, 255) solid 5px;
    }
    75% {
        border-radius: 6px;
    } 
}
@keyframes searchingAnimation {
    0%{
        transform: scale(0);
        border-radius: 15px;
        background-color: #9900ff;
    }
    25% {
        
        }
    50% {
        transform: scale(1.3);
        background-color: #ab2dff;
    }
    75% {
        background-color: #ffd038;
    } 
}
//--------------------------------------------------
// Walls
.wall {
    background-color: #8a66ff;
}
.wall-animated {
    background-color: #8a66ff;
    animation: wallAnimation linear 0.4s;
}
//--------------------------------------------------
// Unvisited
.unvisited {
    background-color: rgb(255, 255, 255);
}
.unvisited-animated {
    background-color: rgb(255, 255, 255);
    animation: unvisitedAnimation linear 0.4s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.294);
    }
}


.flag {
    background-color: rgb(255, 98, 98);
}
.flag-animated {
    background-color: rgb(255, 98, 98);
    animation: flagAnimation linear 0.4s;
}

.grid {
    margin-top: 40px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.board {
    color: black;
    width: fit-content;
    padding: 5px;
    border: 6px solid #1f1f1f;
    border-radius: 0 15px 15px;
    margin: 0 auto 100px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px #957DAD;
}
table {
    table-layout: fixed;
    border-collapse:collapse;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    :first-child {
        :first-child {
            border-radius: $table-radius 0 0 0;
        }
        :last-child {
            border-radius: 0 $table-radius 0 0;
        }
    }
    :last-child {
        :first-child {
            border-radius: 0 0 0 $table-radius;
        }
        :last-child {
            border-radius: 0 0 $table-radius 0;
        }
    }
}
tr {
    box-sizing: content-box;
    width: 100%;
}
td {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
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

.start-node-animated {
    background-color: rgb(145, 255, 0);
    &:hover {
        background-color: rgba(49, 255, 159, 0.863);
    }
}
.end-node-animated {
    background-color: rgb(255, 155, 25);
    &:hover {
        background-color: rgba(255, 217, 49, 0.294);
    }
}
.red-detail {
    animation: detailsRedAnimation linear 1s;
}
.temp-animated {
    background-color: #cdff8b;
}

.temp1-animated {
    background-color: #ffd900;
}
.temp2-animated {
    animation: searchingAnimation ease-in 0.4s;
    background-color: #cdfffb;
}
.temp3-animated {
    background-color: #2f00ff;
}

.temp {
    background-color: #cdff8b;
}

.temp1 {
    background-color: #ffd900;
}
.temp2 {
    background-color: #cdfffb;
}
.temp3 {
    background-color: #2f00ff;
}

//------------------------------------------------------
.graph {
    width: 400px;
    background-color: #1f1f1f;
}

</style>
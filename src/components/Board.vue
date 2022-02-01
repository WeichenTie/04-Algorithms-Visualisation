
<template lang="">
    <div class='board' v-show="this.isMounted">
        <table>
            <tr v-for='(row, yIndex) in this.board' :key="yIndex" :id="'row-'+ yIndex">
                <td v-for="(cell, xIndex) in row" :key="xIndex" :id="`${yIndex}-${xIndex}`" :ref="`${yIndex}-${xIndex}`" v-on:mouseenter="handleMouseEnter($event)"></td>
            </tr>
        </table>
    </div>
</template>


<script>
export default {
    data() {
        return {
            nodeSize: 0,
            board: [],
            hoveredCell: null,
            isMounted:false,
            selectedBrush: "wall"
        }
    },
    beforeMount() {
        const numRows = (window.innerHeight*0.7) / 25;
        const numCols = (window.innerWidth * 0.7) / 25;
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push(0);
            }
            this.board.push(row);
        }
    },
    mounted(){
        this.isMounted = true;
    },

    methods: {
        handleMouseEnter: function (event){
            if (event.buttons === 1) {
               // console.log(event)
                this.$refs[event.target.id][0].classList.add(this.selectedBrush);
                console.log(this.$refs[event.target.id][0].classList);
                
            }
            
        },
    },
}



</script>
<style lang="scss">
.board {
    color: black;
    table {
        
    }
    td {
        background-color: rgb(226, 226, 226);
        width: 25px;
        height: 25px;
        padding: 0;
        margin: 0;
        border: 0;
        &:hover {
            background-color: rgb(153, 0, 0);
        }
    }
    .wall {
        background-color: red;
    }
}
</style>
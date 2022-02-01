<template lang="">
    <h1>Pathfinding Visualisation</h1>
    <div class="navbar">
        <div class="options">
            <div class="option" id="algorithm">Select Algorithm</div>
            <div class="option" id="generate-maze">Generate Maze</div>
            <div class="option" id="speed">Speed</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
};
</script>

<style lang="scss" scoped>
h1 {
    background-color: var(--main-colour);
    display:block;
    margin: 0;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    transition: ease-in 0.2s;
    cursor: pointer;
    &:hover {
        color: var(--complement-colour);
    }
}
.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 68px;
    box-shadow: 0 2px 5px grey;
    .options {
        display: flex;
        width: 500px;
        flex-direction: row;
        .option {
            color: black;
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 68px;
            margin: 0;
            font-size: 1em;
            padding: 0 10px;
            transition: ease-in 0.2s;
            &:hover {
                cursor: pointer;
                background-color: rgb(83, 129, 156);
                color: white;
            }
        }
    }
}
</style>

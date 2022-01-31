<template lang="">
  <div class="navbar">
    <h1>Pathfinding Visualisation</h1>
    <div class="options">
      <div class="option" id="algorithm">Select Algorithm</div>
      <div class="option" id="generate-maze">Generate Maze</div>
      <div class="option" id="speed">Speed</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="sass" scoped>
.navbar
    display: flex
    justify-content: space-around
    align-items: center
    width: 100%
    height: 68px
    background-color: var(--main-colour)
    h1
        display:block
        margin: 0
        width:fit-content
        transition: ease-in 0.2s
        cursor: pointer
        &:hover
            color: var(--complement-colour)


    .options
        width: 500px
        display: flex
        flex-direction: row
        .option
            width: max-content
            margin: 0
            font-size: 1.2em
            padding: 0 30px
</style>

<template>
  <h1>Pathfinding Visualisation</h1>
  
  <Board/>
</template>

<script>
import Board from './components/Board'

export default {
  name: 'App',
  components: {
    Board
  },
  data() {
    return {
    }
  },
  method: {

  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap');
:root {
  --main-colour: rgb(47, 117, 184);
  --complement-colour: #FFD585;
}
html {
  margin: 0;
  padding: 0;
  background-color: rgb(255, 255, 255);
  //background-image: url("./assets/background.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

head {
  padding: 0;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto Slab', serif;
}

h1 {
    background-color: var(--main-colour);
    color: white;
    display:block;
    margin: 0;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    transition: ease-in 0.2s;
    cursor: pointer;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

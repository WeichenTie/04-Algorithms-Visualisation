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
  --main-colour: #0081a7;
  --complement-colour: #FFD585;
}
html {
  margin: 0;
  padding: 0;
}

head {
  padding: 0;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto Slab', serif;
  overflow: hidden;
}

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

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  .board {
    
  }
}
</style>

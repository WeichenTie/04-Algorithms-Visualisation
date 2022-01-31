<template>
  <Navbar/>
  <Board/>
</template>

<script>
import Navbar from './components/Navbar'
import Board from './components/Board'
export default {
  name: 'App',
  components: {
    Navbar,
    Board
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap');
body {
  margin: 0;
  font-family: 'Roboto Slab', serif;
  color: white;
  height:120vh;
}
:root {
  --main-colour: #0081a7;
  --complement-colour: #FFD585;
}

#app {
}
</style>

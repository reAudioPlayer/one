<template>
  <div class="appRoot">
    <div class="interface">
      <Sidebar />
      <Body />
    </div>
    <Player />
  </div>
</template>

<script>
import Body from './components/Body.vue'
import Player from './components/Player.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Body,
    Player
  }
}
</script>

<style>
@import "./assets/css/variables.css";
@import "./assets/css/scrollbars.css";

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: var(--background-gradient);
  color: var(--font) !important;
}

div.interface {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

div.appRoot {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

html, body {
  margin: 0;
  padding: 0;
}
</style>

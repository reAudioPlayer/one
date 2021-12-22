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
import "v-contextmenu/dist/themes/dark.css";

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

.v-contextmenu {
  background: var(--hover-4) !important;
  font-family: var(--font-family) !important;
  border: none !important;
  box-shadow: 2px 2px 8px 0 var(--hover-4) !important;
  --webkit-box-shadow: 2px 2px 8px 0 var(--hover-4) !important;
}

.v-contextmenu-item {
  color: var(--font) !important;
  margin: 5px;
  padding: 10px 22px 10px 15px;
  border-radius: 5px;
}

.v-contextmenu-item--hover {
  background: var(--hover-3) !important;
}

</style>

<style>
@import "./assets/css/variables.css";
@import "./assets/css/scrollbars.css";

#app {
  font-family: var(--font-family) !important;
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

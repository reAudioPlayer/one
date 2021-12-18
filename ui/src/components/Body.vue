<template>
  <div class="body">
      <playlist ref="playlist" />
  </div>
</template>

<script>
import Playlist from './body/Playlist.vue'
export default {
  components: { Playlist },
  name: 'Body'
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons+Outlined");
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons+Round");

    div.body {
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
        max-width: calc(100vw - var(--sidebar-width));
        max-height: calc(100vh - var(--player-height));
    }
</style>

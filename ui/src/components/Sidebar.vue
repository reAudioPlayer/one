<template>
  <div class="sidebar">
    <h2>reAudioPlayer Online</h2>
    <br>
    <nav-entry icon="home" name="Home" />
    <nav-entry icon="search" name="Search" />
    <nav-entry icon="library_music" name="Your Library" />
    <br>
    <nav-entry icon="add_circle" name="Create Playlist" />
    <nav-entry icon="favorite" name="Liked Songs" />
    <hr>
    <div class="playlistList">
      <a href="/">Mainstage 21</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
      <a href="/">Mainstage 22</a>
    </div>
  </div>
</template>

<script>
import NavEntry from './Sidebar/NavEntry.vue'
export default {
  name: 'Sidebar',
  components: {
    NavEntry
  }
}
</script>

<style scoped>
    .playlistList {
      flex-grow: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    .playlistList>a {
      font-size: 0.92em;
      text-decoration: none;
      color: var(--font-darker);
      margin-bottom: 4px;
      margin-top: 4px;
    }

    .playlistList>a:hover {
      color: var(--font)
    }

    hr {
      width: 100%;
    }
    div.sidebar {
        background: var(--glass-gradient);
        width: var(--sidebar-width);
        display: flex;
        flex-direction: column;
        padding: 20px;
        max-height: calc(100vh - var(--player-height) - 40px);
    }

    h2 {
      margin: 0;
    }
</style>

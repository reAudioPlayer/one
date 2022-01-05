<template>
  <div class="sidebar">
    <h2>reAudioPlayer Online</h2>
    <br>
    <nav-entry href="/" icon="home" name="Home" />
    <nav-entry href="/search" icon="search" name="Search" />
    <nav-entry href="/collection/playlists" icon="library_music" name="Your Library" />
    <br>
    <nav-entry href="/playlist/create" icon="add_circle" name="Create Playlist" />
    <nav-entry href="/collection/tracks" icon="favorite" name="Liked Songs" />
    <hr>
    <div class="playlistList">
      <router-link v-for="(element, index) in playlists" :key="index" :to="element.href">{{element.name}}</router-link>
    </div>
  </div>
</template>

<script>
import NavEntry from './Sidebar/NavEntry.vue'
export default {
  name: 'Sidebar',
  components: {
    NavEntry
  },
  data() {
    fetch("http://localhost:1234/api/playlists")
      .then(x => x.json())
      .then(jdata => {
        for (let i = 0; i < jdata.length; i++)
        {
          this.playlists.push({
            "name": jdata[i],
            "href": `/playlist/${i}`
          })
        }
      })

    return {
      playlists: [ ]
    }
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
      padding: 0px 10px;
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
        background: var(--sidebar-background);
        width: calc(var(--sidebar-width) + 20px);
        min-width: calc(var(--sidebar-width) + 20px);
        display: flex;
        flex-direction: column;
        padding: 10px;
        max-height: calc(100vh - var(--player-height) - 20px);
    }

    h2 {
      margin: 0;
      padding: 10px;
    }
</style>

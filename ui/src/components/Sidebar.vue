<template>
  <div class="sidebar">
    <h2 @click="onLogoClick">reAudioPlayer One</h2>
    <nav-entry href="/" icon="home" name="Home" />
    <nav-entry href="/search" icon="search" name="Search" />
    <nav-entry href="/collection/playlists" icon="library_music" name="Your Library" :hasChildSites="true" parentHref="/collection" />
    <br v-if="showNewsTab || showSportsTab">
    <nav-entry v-if="showNewsTab" href="/news" icon="newspaper" name="News" :hasChildSites="true" />
    <nav-entry v-if="showSportsTab" href="/sports" icon="sports_soccer" name="Sports" :hasChildSites="true" />
    <br>
    <nav-entry href="/playlist/create" icon="add_circle" name="Create Playlist" />
    <nav-entry href="/collection/tracks" icon="favorite" name="Liked Songs" />
    <hr>
    <div class="playlistList">
      <router-link v-for="(element, index) in playlists" :key="index" :to="element.href">{{element.name}}</router-link>
    </div>
    <img v-if="expandCover" @click="hideCover" :src="cover" class="cover" />
  </div>
</template>

<script>
  import NavEntry from './Sidebar/NavEntry.vue'

  import Hashids from 'hashids'
  const hashids = new Hashids("reapOne.playlist", 22)

  export default {
    name: 'Sidebar',
    components: {
      NavEntry
    },
    props: {
      expandCover: Boolean
    },
    mounted() {
      fetch("/api/playlists")
        .then(x => x.json())
        .then(jdata => {
          for (let i = 0; i < jdata.length; i++) {
            this.playlists.push({
              "name": jdata[i],
              "href": `/playlist/${hashids.encode(i)}`
            })
          }
        })
    },
    data() {
      const connect = () => {
        console.log("attempting reconnect")
        let ws = new WebSocket('ws://localhost:1234/ws');

        ws.onclose = () => {
          console.log("ws closed")

          setTimeout(connect, 1000);
        }
        
        ws.onopen = () => {
          console.log("ws connected")
        }

        ws.onmessage = msg => {
          const jdata = JSON.parse(msg.data);
          this.updateData(jdata)
        }
      }
      connect()

      return {
        playlists: [],
        cover: "/assets/img/music_placeholder.png",
        showSportsTab: window.localStorage.getItem("sidebar.showSportsTab") == "true",
        showNewsTab: window.localStorage.getItem("sidebar.showNewsTab") == "true"
      }
    },
    methods: {
      hideCover() {
        this.$emit("expandCover", false)
      },
      onLogoClick() {
        this.$router.push("/preferences")
      },
      updateData(jdata) {
        if (jdata.path == "player.song")
        {
          this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"
          return;
        }
      }
    }
  }
</script>

<style scoped>

  h2 {
    margin-bottom: 0;
  }

  .cover {
    height: calc(var(--sidebar-width) + 40px);
    width: calc(var(--sidebar-width) + 40px);
    transform: translate(-10px, 10px);
  }

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
    color: var(--font-colour)
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
    z-index: 1;
  }

  h2:hover {
    cursor: pointer;
  }

  h2 {
    margin: 0;
    padding: 10px;
  }
</style>
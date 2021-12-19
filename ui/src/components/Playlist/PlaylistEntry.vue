<template>
  <div @click="onselect" class="playlistEntry" :class="{ 'selected': highlighted }">
        <span ref="idOrPlay" @mouseover="displayPlay" @mouseleave="displayId" class="id">{{id}}</span>
        <div class="track">
            <img :src="cover">
            <div class="trackwrapper">
                <span class="title">{{title}}</span>
                <span class="artist">{{artist}}</span>
            </div>
        </div>
        <span class="album">{{album}}</span>
  </div>
</template>

<script>
export default {
  name: 'PlaylistEntry',
  props: {
      id: Number,
      artist: {
          type: String,
          default: "N/A"
      },
      cover: {
          type: String,
          default: "/assets/img/music_placeholder.png"
      },
      title: {
          type: String,
          default: "N/A"
      },
      album: {
          type: String,
          default: "N/A"
      }
  },
  data() {
      return {
          highlighted: false
      }
  },
  methods: {
      onselect() {
          this.highlighted = !this.highlighted
      },
      displayPlay() {
          const element = this.$refs.idOrPlay
          element.innerHTML = "play_arrow"
          element.classList.add("material-icons-round")
      },
      displayId() {
          const element = this.$refs.idOrPlay
          element.innerHTML = this.id
          element.classList.remove("material-icons-round")
      }
  }
}
</script>

<style scoped>
    div.playlistEntry {
        padding-top: 7px;
        padding-bottom: 7px;
        height: var(--playlistEntry-height);
        display: flex;
        flex-direction: row;
        color: var(--font-darker);
        font-size: 0.91em;
        border-radius: 5px;
    }

    div.playlistEntry:hover {
        background-color: var(--hover-1);
    }

    div.playlistEntry.selected {
        background-color: var(--hover-2);
    }

    .id {
        width: 50px;
        text-align: right;
        line-height: var(--playlistEntry-height);
    }

    .id:hover {
        cursor: pointer;
    }

    .track {
        width: 40vw;
        margin: auto;
        margin-left: 10px;
        display: flex;
        flex-direction: row;
    }

    .title {
        color: var(--font);
    }

    .album {
        flex-grow: 1;
        margin-left: 5px;
        line-height: var(--playlistEntry-height);
    }

    img {
        height: 40px;
        margin-right: 10px;
        display: inline;
        border-radius: 5px;
    }

    .trackwrapper {
        display: flex;
        flex-direction: column;
    }
</style>

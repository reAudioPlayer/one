<template>
  <div class="player">
    <div class="left">
      <img :src="cover">
      <div class="titleartist">
        <span class="title">{{title}}</span>
        <span class="artist">{{artist}}</span>
      </div>
      <span @click="favourited = !favourited"
        class="favourite material-icons-round">{{favourited ? "favorite" : "favorite_border"}}</span>
    </div>
    <div class="centre">
      <div class="upper">
        <span class="material-icons-round defaultbtn">shuffle</span>
        <span @click="get('last')" class="material-icons-round defaultbtn">skip_previous</span>
        <span @click="get('playPause')" class="material-icons-round circle">play_circle</span>
        <span @click="get('next')" class="material-icons-round defaultbtn">skip_next</span>
        <span class="material-icons-round defaultbtn">repeat</span>
      </div>
      <div class="lower">
        <span class="positionLabel">0:00</span>
        <input type="range" class="progress">
        <span class="positionLabel">{{durationStr}}</span>
      </div>
    </div>
    <div class="right">
      <span class="material-icons-round defaultbtn">volume_up</span>
      <input @change="volumechange" ref="volume" type="range" class="volume">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    props: {
      favourite: {
        type: Boolean,
        default: false
      }
    },
    data() {
      let ws = new WebSocket('ws://localhost:1234/ws');
      const ctx = this

      ws.onmessage = function(msg) {
        const jdata = JSON.parse(msg.data);
        ctx.updateData(jdata)
      }

      return {
        favourited: this.favourite,
        title: "N/A",
        artist: "N/A",
        durationStr: "0:00",
        cover: "/assets/img/music_placeholder.png"
      }
    },
    methods: {
      get(endpoint) {
        fetch(`http://localhost:1234/api/${endpoint}`)
      },
      volumechange() {
        fetch("http://localhost:1234/api/setVolume", {
          method: "POST",
          body: JSON.stringify({
            value: this.$refs.volume.value
          })
        })
      },
      updateData(jdata) {
        this.title = jdata?.title || "N/A"
        this.artist = jdata?.artist || "N/A"
        this.durationStr = jdata?.duration || "N/A"
        this.cover = jdata?.cover || "/assets/img/music_placeholder.png"
      }
    }
  }
</script>

<style scoped>
  div.player {
    background: var(--glass-gradient);
    height: calc(var(--player-height) - 20px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    /*height: 100%;*/
  }

  .favourite {
    line-height: calc(var(--player-height) - 40px);
    margin-left: 20px;
    font-size: 1.2em;
  }

  .favourite:hover {
    cursor: pointer;
  }

  .left {
    max-height: calc(var(--player-height) - 40px);
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 25vw;
  }

  .left>img {
    height: calc(var(--player-height) - 40px);
    border-radius: 5px;
  }

  .left>.titleartist {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: center;

    max-width: 20vw;
  }

  .left>.titleartist>.title {
    font-size: 0.9em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .left>.titleartist>.artist {
    font-size: 0.7em;
    color: var(--font-darker);
  }

  .centre {
    max-height: calc(var(--player-height) - 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .centre>.upper {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .centre>.lower {
    line-height: 25px;
    height: 25px;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .positionLabel {
    font-size: 0.7em;
    color: var(--font-darker)
  }

  input[type="range"].progress {
    width: 40vw;
  }

  input[type="range"]:hover {
    cursor: pointer;
  }

  .defaultbtn {
    font-size: 1.4em;
    color: var(--font-darker);
    margin-left: 10px;
    margin-right: 10px;
  }

  .defaultbtn:hover {
    color: var(--font);
    cursor: pointer;
  }

  .circle {
    font-size: 2.4em;
    width: 40px;
  }

  .defaultbtn,
  .circle {
    line-height: 24px;
    text-align: center;
  }

  .circle:hover {
    font-size: 2.5em;
    cursor: pointer;
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 25vw;
  }
</style>
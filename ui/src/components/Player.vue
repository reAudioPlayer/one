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
        <span @click="get('playPause')" class="material-icons-round circle">{{playing ? "pause_circle" : "play_circle"}}</span>
        <span @click="get('next')" class="material-icons-round defaultbtn">skip_next</span>
        <span class="material-icons-round defaultbtn">repeat</span>
      </div>
      <div class="lower">
        <span class="positionLabel">{{progresslbl}}</span>
        <input @change="progresschange" v-model="progress" max="1000" type="range" class="progress">
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
      const ctx = this

      function connect() {
        console.log("attempting reconnect")
        let ws = new WebSocket('ws://localhost:1234/ws');

        ws.onclose = function() {
          console.log("ws closed")

          setTimeout(connect, 1000);
        }
        
        ws.onopen = () => {
          console.log("ws connected")
        }

        ws.onmessage = function(msg) {
          const jdata = JSON.parse(msg.data);
          ctx.updateData(jdata)
        }
      }
      connect()

      setInterval(() => {
        if (!ctx.playing)
        {
          return;
        }
        const duration = Number(ctx.durationStr.split(':')[0]) * 60 + Number(ctx.durationStr.split(':')[1])
        let progress = Number(ctx.progresslbl.split(':')[0]) * 60 + Number(ctx.progresslbl.split(':')[1])
        progress+=1;
        ctx.progress = progress / duration * 1000;
        ctx.progresslbl = `${Math.floor(progress / 60)}:${ctx.zeroPad(progress % 60, 2)}`
      }, 1000)

      fetch("http://localhost:1234/api/getVolume")
        .then(x => x.text())
        .then(value => {
          this.$refs.volume.value = value
        })

      return {
        favourited: this.favourite,
        title: "N/A",
        artist: "N/A",
        durationStr: "0:00",
        cover: "/assets/img/music_placeholder.png",
        playing: false,
        progress: 0,
        progresslbl: "0:00"
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
      zeroPad(num, places) {
        return String(num).padStart(places, '0')
      },
      progresschange() {
        let duration = Number(this.durationStr.split(':')[0]) * 60 + Number(this.durationStr.split(':')[1])
        let value = this.progress * duration / 1000
        this.progresslbl = `${Math.floor(value / 60)}:${this.zeroPad(Math.round(value % 60), 2)}`
        fetch("http://localhost:1234/api/setPos", {
          method: "POST",
          body: JSON.stringify({
            value
          })
        })
      },
      updateData(jdata) {
        if (jdata.path == "player.song")
        {
          this.title = jdata?.data?.title || "N/A"
          this.artist = jdata?.data?.artist || "N/A"
          this.durationStr = jdata?.data?.duration || "N/A"
          this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"
          this.progresslbl = "0:00"
          return;
        }
        if (jdata.path == "player.playState")
        {
          this.playing = jdata?.data || false
          return
        }
        if (jdata.path == "player.posSync")
        {
          let value = jdata?.data || 0
          this.progresslbl = `${Math.floor(value / 60)}:${this.zeroPad(Math.round(value % 60), 2)}`
        }
      }
    }
  }
</script>

<style scoped>
  div.player {
    background: var(--player-background);
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
    color: var(--font-darker);
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
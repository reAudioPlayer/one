<template>
  <div class="player">
    <div class="left">
      <img v-if="expandCover" @click="onExpandCover" :src="cover" />
      <div class="titleartist">
        <span class="title">
            <router-link class="linkOnHover" to="/player">
            <Marquee :text="title" /></router-link>
        </span>
        <span class="artist">
          <router-link class="linkOnHover" :to="`/search/${artist}`">
            <Marquee :text="artist" /></router-link>
        </span>
      </div>
      <span
        @click="favourited = !favourited"
        class="favourite material-icons-round">
        {{ favourited ? "favorite" : "favorite_border" }}</span>
    </div>
    <div class="centre">
      <div class="upper">
        <span @click="shuffle = !shuffle" class="material-icons-round defaultbtn">{{ shuffle ? "shuffle_on" : "shuffle" }}</span>
        <span @click="get('last')" class="material-icons-round defaultbtn">skip_previous</span>
        <span @click="get('playPause')" class="material-icons-round circle">{{playing ? "pause_circle" : "play_circle"}}</span>
        <span @click="get('next')" class="material-icons-round defaultbtn">skip_next</span>
        <span @click="songLoop = !songLoop" class="material-icons-round defaultbtn">{{ songLoop ? "repeat_one" : "repeat" }}</span>
      </div>
      <div class="lower">
        <span class="positionLabel">{{ progresslbl }}</span>
        <input
          @change="progresschange"
          v-model="progress"
          max="1000"
          type="range"
          class="progress"
        />
        <span class="positionLabel">{{ durationStr }}</span>
      </div>
    </div>
    <div class="right">
      <span class="material-icons-round defaultbtn">volume_up</span>
      <input @change="volumechange" ref="volume" type="range" class="volume" />
    </div>
  </div>
</template>

<script>
  import { useKeypress } from 'vue3-keypress'
  import { useRouter } from 'vue-router'
  import Marquee from '@/components/Marquee.vue'

  export default {
    components: { Marquee },
    name: 'Player',
    props: {
      expandCover: Boolean
    },
    setup() {
      const router = useRouter()

      useKeypress({
        keyEvent: "keydown",
        keyBinds: [
          {
            keyCode: "space",
            success: () => fetch(`/api/playPause`),
            modifiers: ["ctrlKey"],
          },
          {
            keyCode: "right",
            success: () => fetch(`/api/next`),
            modifiers: ["ctrlKey"],
          },
          {
            keyCode: "left",
            success: () => fetch(`/api/last`),
            modifiers: ["ctrlKey"],
          },
          {
            keyCode: 49,
            success: () => router.push("/playlist/0"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 50,
            success: () => router.push("/playlist/1"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 51,
            success: () => router.push("/playlist/2"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 52,
            success: () => router.push("/playlist/3"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 53,
            success: () => router.push("/playlist/4"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 54,
            success: () => router.push("/playlist/5"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 55,
            success: () => router.push("/playlist/6"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 56,
            success: () => router.push("/playlist/7"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 57,
            success: () => router.push("/playlist/8"),
            modifiers: ["altKey"],
          },
          {
            keyCode: 58,
            success: () => router.push("/playlist/9"),
            modifiers: ["altKey"],
          },
        ]
      })
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

        fetch("/api/getVolume")
            .then(x => x.text())
            .then(value => {
              this.$refs.volume.value = value
            })

        fetch("/api/songLoop")
            .then(x => x.text())
            .then(value => {
              this.songLoop = value == "True"
            })

        fetch("/api/shuffle")
            .then(x => x.text())
            .then(value => {
              this.shuffle = value == "True"
            })

        return {
            favourited: this.favourite,
            title: "N/A",
            artist: "N/A",
            durationStr: "0:00",
            cover: "/assets/img/music_placeholder.png",
            playing: false,
            progress: 0,
            progresslbl: "0:00",
            track: { },
            songLoop: false,
            shuffle: false
        }
    },
    watch: {
        favourited() {
            this.setFavourite();
        },
        songLoop() {
          fetch("/api/songLoop", {
            method: "POST",
            body: JSON.stringify({
              value: this.songLoop
            })
          })
        },
        shuffle() {
          fetch("/api/shuffle", {
            method: "POST",
            body: JSON.stringify({
              value: this.shuffle
            })
          })
        }
    },
    methods: {
        setFavourite() {
            this.track.favourite = this.favourited
            fetch("/api/updateSong", {
                method: "POST",
                body: JSON.stringify(this.track)
            });
        },
        onExpandCover() {
            this.$emit('expandCover', true)
        },
        playPause() {
            console.log("playpause")
            this.get('playPause')
        },
        get(endpoint) {
            fetch(`/api/${endpoint}`)
        },
        volumechange() {
            fetch("/api/setVolume", {
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
            fetch("/api/setPos", {
                method: "POST",
                body: JSON.stringify({
                    value
                })
            })
        },
        updateData(jdata) {
            if (jdata.path == "player.song")
            {
                this.track = jdata?.data
                this.title = jdata?.data?.title || "N/A"
                this.artist = jdata?.data?.artist || "N/A"
                this.durationStr = jdata?.data?.duration || "N/A"
                this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"
                this.progresslbl = "0:00"
                this.favourited = jdata?.data?.favourite || false

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
  height: calc(var(--player-height) - 21px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid var(--border);
  z-index: 1;
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

.left > img {
  height: calc(var(--player-height) - 40px);
  border-radius: 5px;
  margin-right: 10px;
}

.left > .titleartist {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 20vw;
}

.left > .titleartist > .title {
  font-size: 0.9em;
  /*overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;*/
}

.left > .titleartist > .artist {
  font-size: 0.7em;
  color: var(--font-darker);
  /*overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;*/
}

.centre {
  max-height: calc(var(--player-height) - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.centre > .upper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.centre > .lower {
  line-height: 25px;
  height: 25px;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.positionLabel {
  font-size: 0.7em;
  color: var(--font-darker);
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
  color: var(--font-colour);
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
<template>
  <div v-if="!expandedMobile" class="player">
    <audio ref="audio" @ended="get('player/next')" src="/api/player/stream" style="display: none" />
    <div class="left hideIfMobile">
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
        class="favourite material-icons-round hideIfMobile">
        {{ favourited ? "favorite" : "favorite_border" }}</span>
    </div>
    <div class="left showIfMobile" @click="expandedMobile = true">
      <img v-if="expandCover" @click="onExpandCover" :src="cover" />
      <div class="titleartist">
        <span class="title">
            <Marquee :text="title" />
        </span>
        <span class="artist">
            <Marquee :text="artist" />
        </span>
      </div>
      <span
        @click="favourited = !favourited"
        class="favourite material-icons-round hideIfMobile">
        {{ favourited ? "favorite" : "favorite_border" }}</span>
    </div>
    <div class="centre">
      <div class="upper">
        <span @click="shuffle = !shuffle" class="material-icons-round defaultbtn hideIfMobile">{{ shuffle ? "shuffle_on" : "shuffle" }}</span>
        <span @click="get('player/previous')" class="material-icons-round defaultbtn hideIfMobile">skip_previous</span>
        <span @click="playPause" class="material-icons-round circle hideIfMobile">{{playing ? "pause_circle" : "play_circle"}}</span>
        <span @click="playPause" class="material-icons-round circle showIfMobile">{{playing ? "pause" : "play_arrow"}}</span>
        <span @click="get('player/next')" class="material-icons-round defaultbtn hideIfMobile">skip_next</span>
        <span @click="songLoop = !songLoop" class="material-icons-round defaultbtn hideIfMobile">{{ songLoop ? "repeat_one" : "repeat" }}</span>
      </div>
      <div class="lower hideIfMobile">
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
    <div class="right hideIfMobile">
      <span class="material-icons-round defaultbtn">volume_up</span>
      <input @change="volumechange" ref="volume" type="range" class="volume" />
    </div>
  </div>
  <div v-else class="player fullscreen">
    <audio ref="audio" @ended="get('player/next')" src="/api/player/stream" style="display: none" />
    <div class="top">
      <span class="material-symbols-rounded" @click="expandedMobile = false">expand_more</span>
      <p></p>
      <span class="material-symbols-rounded">more_horiz</span>
    </div>
    <div class="cover">
      <img :src="cover" />
    </div>
    <div class="data">
      <div class="titleartist">
        <span class="title">
            <Marquee :text="title" />
        </span>
        <span class="artist">
            <Marquee :text="artist" />
        </span>
      </div>
    </div>
    <div class="progress">
      <input
        @change="progresschange"
        v-model="progress"
        max="1000"
        type="range"
        class="progress"
      />
      <div class="details">
        <span class="positionLabel">{{ progresslbl }}</span>
        <span class="positionLabel">{{ durationStr }}</span>
      </div>
    </div>
    <div class="controls">
      <span @click="shuffle = !shuffle" class="material-icons-round defaultbtn">{{ shuffle ? "shuffle_on" : "shuffle" }}</span>
      <span @click="get('player/previous')" class="material-icons-round defaultbtn">skip_previous</span>
      <span @click="playPause" class="material-icons-round circle">{{playing ? "pause_circle" : "play_circle"}}</span>
      <span @click="get('player/next')" class="material-icons-round defaultbtn">skip_next</span>
      <span @click="songLoop = !songLoop" class="material-icons-round defaultbtn">{{ songLoop ? "repeat_one" : "repeat" }}</span>
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
            success: () => fetch(`/api/player/playPause`),
            modifiers: ["ctrlKey"],
          },
          {
            keyCode: "right",
            success: () => fetch(`/api/player/next`),
            modifiers: ["ctrlKey"],
          },
          {
            keyCode: "left",
            success: () => fetch(`/api/player/previous`),
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
        const playInBrowser = window.localStorage.getItem("player.inBrowser") == "true"

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

        if (playInBrowser)
        {
          this.$nextTick(() => {
            this.$refs.volume.value = 100;
          })

          fetch("/api/player/volume", {
            method: "POST",
            body: JSON.stringify({
                value: 0
            })
          })
        }
        else
        {
          fetch("/api/player/volume")
              .then(x => x.text())
              .then(value => {
                this.$refs.volume.value = value
              })
        }

        fetch("/api/player/repeat")
            .then(x => x.text())
            .then(value => {
              this.songLoop = value == "True"
            })

        fetch("/api/player/shuffle")
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
            shuffle: false,
            playInBrowser,
            expandedMobile: false
        }
    },
    watch: {
        favourited() {
            this.setFavourite();
        },
        songLoop() {
          fetch("/api/player/repeat", {
            method: "POST",
            body: JSON.stringify({
              value: this.songLoop
            })
          })
        },
        shuffle() {
          fetch("/api/player/shuffle", {
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
            fetch(`/api/tracks/${this.track.id}`, {
                method: "PUT",
                body: JSON.stringify(this.track)
            });
        },
        onExpandCover() {
            this.$emit('expandCover', true)
        },
        playPause() {
            console.log("playpause")
            if (this.playInBrowser)
            {
              if (this.$refs.audio.paused)
              {
                this.$refs.audio.play();
              }
              else
              {
                this.$refs.audio.pause();
              }
              this.playing = !this.$refs.audio.paused;
              return;
            }
            this.get('player/playPause')
        },
        get(endpoint) {
            fetch(`/api/${endpoint}`)
        },
        volumechange() {
            if (this.playInBrowser)
            {
              this.$refs.audio.volume = this.$refs.volume.value / 100;
              return;
            }

            fetch("/api/player/volume", {
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

            if (this.playInBrowser)
            {
              this.$refs.audio.currentTime = value;
              return;
            }

            fetch("/api/player/seek", {
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

                if (this.playInBrowser) {
                  this.get('player/pause')
                  this.$refs.audio.src = null;
                  this.$refs.audio.src = `/api/player/stream/${jdata?.data?.id}`;
                  this.$refs.audio.load();
                  this.$refs.audio.play();
                  this.playing = !this.$refs.audio.paused;
                }

                return;
            }
            if (jdata.path == "player.playState")
            {
              if (this.playInBrowser)
              {
                return;
              }

              this.playing = jdata?.data || false
              return
            }
            if (jdata.path == "player.posSync")
            {
              if (this.playInBrowser)
              {
                return;
              }
              let value = jdata?.data || 0
              this.progresslbl = `${Math.floor(value / 60)}:${this.zeroPad(Math.round(value % 60), 2)}`
            }
        }
    }
  }
</script>

<style scoped lang="scss">
$horizontalWidth: 1200px;
$mobileWidth: 950px;

div.player.fullscreen {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px !important;

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .cover {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    img {
      width: 90%;
    }
  }

  .data {
    .title {
      font-weight: bold;
      font-size: 1.4em;
    }
  }

  .progress {
    display: flex;
    width: 100%;
    flex-direction: column;

    .details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: var(--font-darker);
    }
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    .circle {
      font-size: 4em;
      width: 100px;
    }

    .defaultbtn {
      font-size: 2em;
    }
  }
}

div.player {
  background: var(--player-background);
  height: calc(var(--player-height) - 21px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid var(--border);
  z-index: 1;

  @media screen and (max-width: $mobileWidth) {
    height: calc(var(--player-height-mobile) - 7px);
    padding: 3px;
    position: absolute;
    bottom: var(--sidebar-height);
    left: 0;
    width: 100vw;
    z-index: 5;
    border-top: none;
    border-bottom: 1px solid var(--border);
  }

  &.fullscreen {
    height: calc(100vh - 40px);
    width: calc(100vw - 40px);
    border-top: none;
    border-bottom: none;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
  }
}

.favourite {
  line-height: calc(var(--player-height) - 40px);
  margin-left: 20px;
  font-size: 1.2em;
  color: var(--font-darker);

  @media screen and (max-width: $mobileWidth) {
    line-height: calc(var(--player-height-mobile) - 40px);
  }
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

  @media screen and (max-width: $mobileWidth) {
    max-height: calc(var(--player-height-mobile) - 6px);
    padding: 3px;
    max-width: inherit;
    flex-grow: 1;
  }

  img {
    height: calc(var(--player-height) - 40px);
    border-radius: 5px;
    margin-right: 10px;

    @media screen and (max-width: $mobileWidth) {
      height: calc(var(--player-height-mobile) - 12px);
    }
  }
}

.left > .titleartist {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 20vw;

  @media screen and (max-width: $mobileWidth) {
    max-width: inherit;
    width: 100%;
  }
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

  @media screen and (max-width: $mobileWidth) {
    max-height: calc(var(--player-height-mobile) - 6px);
    margin-right: 10px;
  }
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

span.circle.showIfMobile {
  font-size: 1.4em;
}
</style>
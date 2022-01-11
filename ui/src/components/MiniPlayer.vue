<template>
    <div class="miniPlayer">
        <audio :src="src" ref="player" />
        <span v-if="display" @click="playPause" class="material-icons-round circle">{{playing ? "pause" : "play_arrow"}}</span>
    </div>
</template>

<script>
export default {
    name: "MiniPlayer",
    props: {
        src: String,
        display: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            playing: false
        }
    },
    methods: {
        get(endpoint) {
            fetch(`http://localhost:1234/api/${endpoint}`)
        },
        pause() {
            this.get("pause")
        },
        play() {
            this.get("play")
        },
        playPause() {
            if (!this.$refs.player.onended)
            {
                this.$refs.player.onended = () => {
                    this.playing = false
                }
            }

            window.player = this.$refs.player
            this.playing = this.$refs.player.paused
            if (this.$refs.player.paused)
            {
                this.pause()
                this.$refs.player.play()
            }
            else
            {
                this.$refs.player.pause()
            }
        }
    }
}
</script>

<style scoped>
    .circle {
        font-size: 2em;
    }

    .circle:hover {
        cursor: pointer;
    }

    .miniPlayer {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

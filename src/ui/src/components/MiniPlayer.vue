<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="miniPlayer">
        <audio ref="player" :src="src" />
        <span v-if="display" class="material-icons-round circle"
              @click="playPause">{{ playing ? "pause" : "play_arrow" }}</span>
    </div>
</template>

<script>
import { playInPicture } from "@/PlayerInPicture.vue";

export default {
    name: "MiniPlayer",
    props: {
        src: String,
        artist: String,
        title: String,
        display: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            playing: false,
        };
    },
    methods: {
        get(endpoint) {
            fetch(`/api/${endpoint}`);
        },
        pause() {
            this.get("pause");
        },
        play() {
            this.get("play");
        },
        playPause() {
            if (!this.$refs.player.onended) {
                this.$refs.player.onended = () => {
                    this.playing = false;
                };
            }

            playInPicture(this.title, this.artist, this.src);
            console.log(this.src);
        },
    },
};
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

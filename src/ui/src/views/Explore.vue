<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup>
import ImgCard from "@/components/explore/ImgCard.vue";
import Marquee from "@/components/Marquee.vue";</script>

<template>
    <div ref="container" class="explore" @scroll="onScroll">
        <div v-for="song in picks" :key="song.name" class="item">
            <ImgCard :src="parseCover(song.cover)">
                <div class="songContent">
                    <div class="play">
                        <span id="loadPlaylist" class="material-symbols-rounded play" @click="() => loadPlaylist(song.id)">play_circle</span>
                    </div>
                    <div class="info">
                        <router-link :to="href(song)" class="linkOnHover">
                            <h1>
                                <marquee :text="song.title"></marquee>
                            </h1>
                        </router-link>
                        <router-link :to="`/search/${song.artist}`" class="linkOnHover">
                            <p>
                                <marquee :text="song.artist"></marquee>
                            </p>
                        </router-link>
                    </div>
                </div>
            </ImgCard>
        </div>
    </div>
</template>

<script>
import {hashTrack, parseCover} from "@/common";

export default {
    data() {
        fetch("/api/playlists").then(async (inRes) => {
            this.playlists = await inRes.json();
            this.pick();
        });
        return {
            playlists: [ ],
            picks: [ ]
        }
    },
    mounted() {

    },
    methods: {
        parseCover,
        pick() {
            console.log("pick")
            this.songs = this.playlists.map(playlist => playlist.songs).flat();

            for (let i = 0; i < 4; i++)
            {
                this.picks.push(this.songs[Math.floor(Math.random() * this.songs.length)])
            }
        },
        onScroll() {
            if (this.$refs.container.clientHeight + this.$refs.container.scrollTop >= this.$refs.container.scrollHeight - 100) {
                this.pick();
            }
        },
        href(song) {
            return `/track/${hashTrack(song.id)}`
        },
        loadPlaylist(id) {
            console.log(id)

            fetch("/api/player/load", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    type: "track"
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    &:not(:first-child) {
        border-top: 5px solid var(--font-darker);
    }

    height: 40vh;

    .info {
        width: calc(100% - 40px - 64px);
    }

    h1 {
        margin-bottom: 0;
        width: calc(100% - 20px);
        position: relative;
    }

    p {
        margin: 0;
        width: calc(100% - 20px);
    }

    position: relative;
    width: 100%;
}

.songContent {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding-left: 20px;
    margin-top: 28vh;

    .play {
        font-size: 2em;
        margin-right: 20px;
        transform: translateY(6px);
        font-variation-settings: 'FILL' 1;
        text-align: center;

        &:hover {
            font-variation-settings: 'FILL' 0;
            cursor: pointer;
        }
    }
}

.explore {
    overflow-y: auto;
    height: 100%;
}
</style>

<script setup>
import ImgCard from "@/components/explore/ImgCard.vue";
import Marquee from "@/components/Marquee.vue";
</script>

<template>
    <div class="explore" ref="container" @scroll="onScroll">
        <div class="item" v-for="song in picks" :key="song.name">
            <ImgCard :src="song.cover">
                <div class="songContent">
                    <div class="play">
                        <span id="loadPlaylist" @click="() => loadPlaylist(song.id)" class="material-symbols-rounded play">play_circle</span>
                    </div>
                    <div class="info">
                        <router-link class="linkOnHover" :to="href(song)">
                            <h1>
                                <marquee :text="song.title"></marquee>
                            </h1>
                        </router-link>
                        <router-link class="linkOnHover" :to="`/search/${song.artist}`">
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
import Hashids from 'hashids'
const hashidsTrack = new Hashids("reapOne.track", 22)

export default {
    data() {
        console.log("hello woodoasdjkp")
        fetch("/api/playlists").then(async (inRes) => {
            const playlists = await inRes.json();
            for (let id = 0; id < playlists.length; id++) {
                const res = await fetch(`/api/playlists/${id}`);
                this.playlists.push(await res.json());
            }
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
            return `/track/${hashidsTrack.encode(song.id)}`
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

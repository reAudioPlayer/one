<script setup>
import Marquee from "@/components/Marquee.vue";
import AddAlbumToPlaylist from '../../../Popups/AddAlbumToPlaylist.vue';
import AddSongToPlaylist from '../../../Popups/AddSongToPlaylist.vue';
</script>

<template>
<div class="home-track-compact-wrapper drop-shadow-md">
    <add-album-to-playlist v-if="href" :id="href.replace('https://open.spotify.com/album/', '')" :cover="cover" :title="title" :artist="artist" :href="href" ref="addRelease" />
    <add-song-to-playlist v-if="href" :href="href" :cover="cover" :title="title" :artist="artist" :preview="preview" ref="addSong" />
    <div class="home-track-compact" @click="openModal">
        <div @click="play" class="cover" :style="{ backgroundImage: `url(${cover})` }">
            <div class="play">
                <span class="material-symbols-rounded">play_arrow</span>
            </div>
        </div>
        <div class="info">
            <span class="title">
                <router-link v-if="!href" class="linkOnHover" :to="trackHref">
                    <marquee :text="title" />
                </router-link>
                <a :href="href" v-else class="linkOnHover">
                    <marquee :text="title" />
                </a>
            </span>
            <router-link class="linkOnHover" :to="`/search/artist:${artist}`">
                <span class="artist">{{artist}}</span>
            </router-link>
        </div>
    </div>
</div>
</template>
<script>
import {hashTrack} from "@/common";

export default {
    name: 'FlexShelf',
    props: {
        title: String,
        artist: String,
        cover: String,
        id: Number,
        href: String
    },
    methods: {
        play(e) {
            e.stopPropagation();
            this.$emit('play')
        },
        openModal() {
            console.log(this.href)
            if (!this.href)
            {
                this.$router.push(this.trackHref);
            }

            if (this.href?.includes("spotify"))
            {
                this.$refs.addRelease.showModal = true;
            }
            else
            {
                this.$refs.addSong.showModal = true;
            }
        }
    },
    computed: {
        trackId() {
            return hashTrack(this.id);
        },
        trackHref() {
            return `/track/${this.trackId}`
        }
    },
}
</script>

<style scoped lang="scss">

.home-track-compact-wrapper {
    flex: 1;
    min-width: calc(100% - 20px - 40px);
}

.home-track-compact {
    background: var(--background-light);
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    padding: 20px;

    margin: 10px;
    align-items: center;

    &:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    .cover {
        border-radius: 12px;
        width: 50px;
        height: 50px;
        position: relative;
        background-size: cover;

        .play {
            display: none;
        }

        &:hover {
            cursor: pointer;

            .play {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                width: 100%;
                height: 100%;
                backdrop-filter: blur(2px);

                span {
                    font-size: 2em;
                    font-variation-settings: 'FILL' 1;
                }
            }
        }
    }


    .info {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 10px;
        align-items: flex-start;

        span {
            margin: 0;
            font-size: .8em;
            overflow: hidden;

            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100%;
            position: relative;

            &.artist {
                color: var(--font-darker);
            }
        }
    }
}

</style>
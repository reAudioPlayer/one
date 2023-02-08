<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup>
import Marquee from "@/components/Marquee.vue";
import AddAlbumToPlaylist from '../../../popups/ImportSpotifyAlbum.vue';
import ImportSpotifySong from '../../../popups/ImportSpotifySong.vue';
import {hashTrack, parseAnyCover} from "@/common";
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";

const props = defineProps({
    title: String,
    artist: String,
    cover: String,
    id: Number,
    href: String
})

const emit = defineEmits(['play']);
const router = useRouter();

const trackId = hashTrack(String(props.id));
const trackHref = `/track/${trackId}`;
const addSong = ref(null);
const addRelease = ref(null);

const play = e => {
    e.stopPropagation();
    emit('play');
};

const openModal = () => {
    if (!props.href?.includes("spotify.com"))
    {
        router.push(trackHref);
        return;
    }

    if (props.href?.includes("spotify.com/album/"))
    {
        addRelease.value.show();
        return
    }

    addSong.value.show();
}

const src = ref(props.cover);
watch(() => props.cover, () => {
    src.value = props.cover;
});
const cover = computed(() => parseAnyCover(src.value));
</script>

<template>
<div class="home-track-compact-wrapper drop-shadow-md">
    <add-album-to-playlist
        v-if="href.includes('spotify.com/album/')"
        ref="addRelease"
        :album="{
            cover,
            name: title,
            artist,
            id: href.replace('https://open.spotify.com/album/', ''),
            href,
            releaseDate: null
        }"
    />
    <ImportSpotifySong
        v-if="href.includes('spotify.com/track/')"
        ref="addSong"
        :song="{
            cover,
            title,
            artist,
            id: href.replace('https://open.spotify.com/track/', ''),
            href,
            releaseDate: null
        }"
    />
    <div class="home-track-compact" @click="openModal">
        <div :style="{ backgroundImage: `url(${parseAnyCover(src)})` }" class="cover" @click="play">
            <img
                :src="parseAnyCover(src)"
                class="hidden"
                @error="src = null"
            />
            <div class="play">
                <span class="material-symbols-rounded">play_arrow</span>
            </div>
        </div>
        <div class="info">
            <span class="title">
                <router-link v-if="!href" :to="trackHref" class="linkOnHover">
                    <marquee :text="title" />
                </router-link>
                <a v-else :href="href" class="linkOnHover">
                    <marquee :text="title" />
                </a>
            </span>
            <router-link :to="`/search/artist:${artist}`" class="linkOnHover">
                <span class="artist">{{artist}}</span>
            </router-link>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

.home-track-compact-wrapper {
    flex: 1;
    min-width: calc(100% - 20px - 40px);
}

.home-track-compact {
    background: var(--bg-base-lt);
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    padding: 20px;

    margin: 10px;
    align-items: center;

    &:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);
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
                color: var(--fg-base-dk);
            }
        }
    }
}

</style>
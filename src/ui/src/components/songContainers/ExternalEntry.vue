<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { isMobile, ISong } from "../../common";
import { computed, PropType, ref } from "vue";
import Marquee from "../Marquee.vue";
import { usePlayerStore } from "../../store/player";
import { favouriteSong } from "../../api/song";
import Cover from "../image/Cover.vue";
import { playInPicture } from "../../PlayerInPicture.vue";
import ImportSpotifySong from "../popups/ImportSpotifySong.vue";
import ArtistMarquee from "../ArtistMarquee.vue";

const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    withCover: {
        type: Boolean,
        required: false,
        default: false
    },
    withAlbum: {
        type: Boolean,
        required: false,
        default: false
    },
    selected: {
        type: Boolean,
        required: false,
        default: false
    },
    playlistId: {
        type: Number,
        required: false,
        default: null
    },
    canImport: {
        type: Boolean,
        required: false,
        default: false
    }
});
const emit = defineEmits(["update", "add"]);

const playerStore = usePlayerStore();
const playing = computed(() => props.song.id == playerStore.song.id);
const hovering = ref(false);

const toggleFavourite = () => {
    props.song.favourite = !props.song.favourite;
    favouriteSong(props.song.id, props.song.favourite);
}

const playlistId = computed(() => props.playlistId == null ? playerStore.playlist.id : props.playlistId);
const playSong = () => {
    playInPicture(props.song.title, props.song.artist, props.song.source || props.song.href);
}

const updatePopup = ref(null);
const edit = () => {
    updatePopup.value.show();
}

const update = () => {
    emit("update");
}

const addOrImport = () => {
    if (props.canImport) {
        updatePopup.value.show();
    } else {
        emit('add');
    }
}
</script>
<template>
    <ImportSpotifySong
        v-if="canImport"
        ref="updatePopup"
        :song="song"
    />
    <div
        :class="{
            playing,
            selected,
            hovering,
            withCover,
            withAlbum
        }"
        class="playlist-entry"
        @dblclick="playSong"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <div
            :class="{'material-symbols-rounded': hovering}"
            class="index text-right"
            @click="playSong"
        >
            {{hovering ? "play_arrow" : index + 1}}
        </div>
        <div
            v-if="withCover"
            class="cover"
        >
            <Cover :src="song.cover" type="track" />
        </div>
        <div class="artist-title">
            <span class="title">
                <router-link :to="`/track/${song.id}`" class="linkOnHover">
                    <Marquee :text="song.title" />
                </router-link>
            </span>
            <span class="artist">
                <ArtistMarquee :artist="song.artist" class="text-muted text-xs" />
            </span>
        </div>
        <div
            v-if="withAlbum && !isMobile"
            class="album"
        >
            <Marquee :text="song.album" />
        </div>
        <div
            class="icon text-left material-symbols-rounded"
            @click.stop="addOrImport"
        >
            {{ song.added ? "done" : "add" }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.playlist-entry {
    display: grid;
    /* id cover artist/title album like duration more */
    grid-template-columns: 50px 40px 1fr 1fr 40px;
    gap: 10px;
    padding: 10px 0;
    border-radius: 20px;

    .artist-title {
        grid-column: 3 / 4;
    }

    &:not(.withCover) .artist-title {
        grid-column-start: 2;
    }

    &:not(.withAlbum) .artist-title {
        grid-column-end: 5;
    }

    div {
        overflow: hidden;
    }

    .index, .album, .duration, .icon {
        margin: auto 0;
        font-size: .9rem;
        color: var(--fg-base-dk);

        &.index {
            cursor: pointer;
        }

        &.icon {
            font-size: 1.3rem;
            cursor: pointer;
            font-variation-settings: "wght" 500;

            &.favourite {
                font-variation-settings: "FILL" 1;
            }
        }
    }

    &.hovering {
        background-color: var(--bg-hover-dk);

        .index {
            font-size: 1.5rem;
            font-variation-settings: "FILL" 1;
        }
    }

    &.selected {
        background-color: var(--bg-hover);
    }

    .favourite-icon {
        grid-column: 5;
    }

    .duration {
        grid-column: 6;
    }

    .cover {
        display: flex;
        justify-content: center;
    }

    img {
        border-radius: 4px;
        margin: auto 0;
    }

    .artist-title {
        display: grid;
        grid-template-rows: 1fr 1fr;

        .artist {
            font-size: .8rem;
            color: var(--fg-base-dk);
        }

        span {
            max-width: min-content;
            overflow: hidden;
        }
    }

    &.playing {
        .title, .index {
            color: var(--fg-secondary);
        }
    }

    &.hovering, &.selected {
        .artist, .album {
            color: var(--fg-base);
        }
    }

    @media screen and (max-width: $w-mobile) {
        padding: 5px 0;
        border-radius: 10px;
        grid-template-columns: 30px 40px 1fr 1fr 30px 40px;

        .index, .duration {
            font-size: .7rem;
        }

        .artist-title {
            grid-column-end: 5;
            font-size: .8rem;

            .artist {
                font-size: .65rem;
            }
        }
    }
}
</style>

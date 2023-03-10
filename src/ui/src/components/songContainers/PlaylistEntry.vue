<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { displayDuration, hashTrack, isMobile, ISong } from "../../common";
import { computed, PropType, ref } from "vue";
import Marquee from "../Marquee.vue";
import EditSong from "../popups/EditSong.vue";
import SongContext from "../contextMenus-next/SongContext.vue";
import { usePlayerStore } from "../../store/player";
import { favouriteSong } from "../../api/song";
import Cover from "../image/Cover.vue";
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
    withMore: {
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
        type: String as PropType<string | number>,
        required: false,
        default: null
    }
});
const emit = defineEmits(["update"]);

const playerStore = usePlayerStore();
const playing = computed(() => props.song.id == playerStore.song.id);
const hovering = ref(false);

const toggleFavourite = () => {
    props.song.favourite = !props.song.favourite;
    favouriteSong(props.song.id, props.song.favourite);
}

const playlistId = computed(() => props.playlistId == null ? playerStore.playlist.id : props.playlistId);
const playSong = () => {
    if (playlistId.value == "track") {
        playerStore.loadPlaylist("track", props.song.id);
        return;
    }

    playerStore.loadSong(Number(playlistId.value), props.index);
}

const updatePopup = ref(null);
const edit = () => {
    updatePopup.value.show();
}

const update = () => {
    emit("update");
}
</script>
<template>
    <SongContext
        ref="ctxMenu"
        :liked="song.favourite"
        :playlistId="playlistId"
        :song="song"
        @edit="edit"
        @like="toggleFavourite"
        @update="update"
    >
        <EditSong
            ref="updatePopup"
            :song="song"
            @update="$emit('update')"
        />
        <div
            :class="{
                playing,
                selected,
                hovering,
                withCover,
                withAlbum,
                withMore
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
                    <router-link :to="`/track/${hashTrack(song.id)}`" class="linkOnHover">
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
                v-if="selected || hovering || song.favourite"
                :class="{ favourite: song.favourite }"
                class="favourite-icon icon text-right material-symbols-rounded"
                @click="toggleFavourite"
            >
                {{ song.favourite ? "favorite" : "heart_plus" }}
            </div>
            <div class="duration text-center">
                {{displayDuration(song.duration)}}
            </div>
            <div
                v-if="false && withMore && (selected || hovering)"
                class="icon text-left material-symbols-rounded"
                @click.stop="$refs.ctxMenu.toggle"
            >
                more_horiz
            </div>
        </div>
    </SongContext>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
/* TODO move to separate file and share w/ externalEntry */ 

.playlist-entry {
    display: grid;
    /* id cover artist/title album like duration more */
    grid-template-columns: 50px 40px 1fr 1fr 40px 60px;
    gap: 10px;
    padding: 10px 0;
    border-radius: 20px;
    border: 1px solid transparent;

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
        border: var(--border-container);

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
        border-radius: 4px;
    }

    img {
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

<script lang="ts" setup>
import {ISong} from "../../common";
import {computed, PropType, ref} from "vue";
import Marquee from "../Marquee.vue";
import EditSong from '../popups/EditSong.vue'
import SongContext from "../contextMenus-next/SongContext.vue";
import {usePlayerStore} from "../../store/player";
import {favouriteSong} from "../../api/song";
import {useDataStore} from "../../store/data";
import Cover from "../image/Cover.vue";

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
        type: Number,
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
    playerStore.loadSong(playlistId.value, props.index);
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
        :song="song"
        @edit="edit"
        @update="update"
        @like="toggleFavourite"
        :playlistId="playlistId"
        :liked="song.favourite"
        ref="ctxMenu"
    >
        <EditSong
            ref="updatePopup"
            :song="song"
            @update="$emit('update')"
        />
        <div
            class="playlist-entry"
            :class="{
                playing,
                selected,
                hovering,
                withCover,
                withAlbum,
                withMore
            }"
            @mouseenter="hovering = true"
            @mouseleave="hovering = false"
            @dblclick="playSong"
        >
            <div
                class="index text-right"
                :class="{'material-symbols-rounded': hovering}"
                @click="playSong"
            >
                {{hovering ? "play_arrow" : index + 1}}
            </div>
            <div
                class="cover"
                v-if="withCover"
            >
                <Cover :src="song.cover" type="track" />
            </div>
            <div class="artist-title">
                <span class="title">
                    <router-link class="linkOnHover" :to="`/track/${song.id}`">
                        <Marquee :text="song.title" />
                    </router-link>
                </span>
                <span class="artist">
                    <router-link class="linkOnHover" :to="`/search/artist:${song.artist}`">
                        <Marquee :text="song.artist" />
                    </router-link>
                </span>
            </div>
            <div
                v-if="withAlbum"
                class="album"
            >
                <Marquee :text="song.album" />
            </div>
            <div
                v-if="selected || hovering || song.favourite"
                class="favourite-icon icon text-right material-symbols-rounded"
                :class="{ favourite: song.favourite }"
                @click="toggleFavourite"
            >
                {{ song.favourite ? "favorite" : "heart_plus" }}
            </div>
            <div class="duration text-center">
                {{song.duration == "-1:59" ? "N/A" : song.duration }}
            </div>
            <div
                v-if="withMore && (selected || hovering)"
                @click.stop="$refs.ctxMenu.toggle"
                class="icon text-left material-symbols-rounded"
            >
                more_horiz
            </div>
        </div>
    </SongContext>
</template>
<style lang="scss" scoped>
.playlist-entry {
    display: grid;
    grid-template-columns: 50px 40px 1fr 1fr 60px 70px 40px;
    gap: 10px;
    padding: 10px 0;
    border-radius: 20px;

    &:not(.withAlbum) .artist-title {
        grid-column: 3 / 5;
    }

    div {
        overflow: hidden;
    }

    .index, .album, .duration, .icon {
        margin: auto 0;
        font-size: .9rem;
        color: var(--font-darker);

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
        background-color: var(--hover-1);

        .index {
            font-size: 1.5rem;
            font-variation-settings: "FILL" 1;
        }
    }

    &.selected {
        background-color: var(--hover-2);
    }

    .favourite-icon {
        grid-column: 6;
    }

    .duration {
        grid-column: 7;
    }

    &.withMore {
        .favourite-icon {
            grid-column: 5;
        }

        .duration {
            grid-column: 6;
        }
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
            color: var(--font-darker);
        }

        span {
            max-width: min-content;
            overflow: hidden;
        }
    }

    &.playing {
        .title, .index {
            color: var(--accent);
        }
    }

    &.selected {
        .artist, .album {
            color: var(--font-colour);
        }
    }
}
</style>

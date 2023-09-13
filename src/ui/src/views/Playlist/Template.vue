<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { IFullPlaylist } from "../../common";
import Loader from "../../components/Loader.vue";
import Cover from "../../components/image/Cover.vue";
import Card from "../../containers/Card.vue";
import FactCard from "../../containers/FactCard.vue";
import TextInputWithIcon from "../../components/inputs/TextInputWithIcon.vue";
import PlaylistEntry from "../../components/songContainers/PlaylistEntry.vue";
// @ts-ignore
import draggable from "vuedraggable";
import IconDropdown from "../../components/inputs/IconDropdown.vue";
import {
    albumOptions,
    applyFilters,
    artistOptions,
    filterApplied,
    IFilteredSong,
    IPlaylistFilters,
    titleOptions,
} from "./applyFilters";
import MultiSelect from "../../components/inputs/MultiSelect.vue";
import AddNewSong from "../../components/popups/AddNewSong.vue";
import FixedPlaylistHeader from "../../components/Playlist/FixedPlaylistHeader.vue";
import PlaylistHeader from "../../components/songContainers/PlaylistHeader.vue";
import EditPlaylist from "../../components/popups/EditPlaylist.vue";
import { usePlayerStore } from "../../store/player";
import AmbientBackground from "../../components/image/AmbientBackground.vue";

const props = defineProps({
    playlist: {
        type: Object as () => IFullPlaylist,
        required: true,
    },
    loading: {
        type: Boolean,
        required: false,
        default: false,
    },
    error: {
        type: String,
        required: false,
        default: "",
    },
    canRearrange: {
        type: Boolean,
        default: false,
    },
    playlistId: {
        type: Number,
        required: true,
    },
    canEdit: {
        type: Boolean,
        default: false,
    },
    canAdd: {
        type: Boolean,
        default: false,
    },
    coverIcon: {
        type: String,
        required: false
    },
});

const emit = defineEmits<{
    (event: "update"): void;
    (event: "rearrange", ...args: [number, number]): void;
}>();

const player = usePlayerStore();
const songs = ref(props.playlist?.songs ?? [] as IFilteredSong[]);
const fixedHeaderHidden = ref(true);
const selectedSongId = ref(null as number | null);
const defaultFilters = () => ({
    sort: "index",
    order: "asc",
    search: "",
    title: [],
    artist: [],
    album: [],
}) as IPlaylistFilters;
const filters = ref(null as IPlaylistFilters | null);
const resetFilters = () => {
    filters.value = { ...defaultFilters() };
}
resetFilters();

const sortOptions = [{
    value: "title",
    label: "Title",
    icon: "title",
}, {
    value: "artist",
    label: "Artist",
    icon: "person",
}, {
    value: "album",
    label: "Album",
    icon: "album",
}, {
    value: "duration",
    label: "Duration",
    icon: "timer",
}, {
    value: "index",
    label: "Added",
    icon: "date_range",
}];

const estimatedDuration = computed(() => {
    let duration = 0;
    let isEstimate = false;

    if (!props.playlist.songs?.length) {
        return "";
    }

    for (const song of props.playlist.songs) {
        isEstimate = isEstimate || song.duration <= 0;
        const seconds = song.duration <= 0 ? 3 * 60 : song.duration; // estimate 3:00 if unknown
        duration += seconds;
    }

    const sec = duration;
    const min = Math.floor(sec / 60);
    const hs = Math.floor(min / 60);

    const prefix = isEstimate ? "about " : ""

    if (hs) {
        return prefix + `${hs} hr ${min - hs * 60} min`
    }

    if (min) {
        return prefix + `${min} min ${sec - min * 60} sec`
    }

    return prefix + duration + " sec";
})

const onPlaylistRearrange = type => {
    const moved = type.moved

    if (!moved) {
        return;
    }

    emit("rearrange", moved.oldIndex, moved.newIndex);
}

watch(filters, () => {
    if (!props.playlist) {
        return;
    }
    songs.value = applyFilters(props.playlist?.songs ?? [], filters.value);
}, { deep: true });
watch(props, () => {
    songs.value = applyFilters(props.playlist?.songs ?? [], filters.value);
}, { deep: true });

const onObserveVisibility = (isVisible, entry) => {
    fixedHeaderHidden.value = isVisible;

}
</script>

<template>
<AmbientBackground
    v-if="playlist"
    :placeholder="coverIcon"
    :src="playlist.cover"
/>
<div class="playlist p-4">
    <AddNewSong
        ref="addSongPopup"
        @update="$emit('update')"
    />
    <EditPlaylist
        v-if="playlist"
        ref="editPlaylistPopup"
        :playlist="playlist"
        @close="$emit('update')"
    />
    <FixedPlaylistHeader
        v-if="playlist"
        ref="fixedHeading"
        :class="{ 'hidden': fixedHeaderHidden }"
        :title="playlist.name"
        @loadPlaylist="player.loadPlaylist(playlistId)"
    />

    <div
        v-if="loading"
        class="fill-page"
    >
        <Loader />
    </div>
    <div
        v-else-if="error"
        class="fill-page"
    >
        <h2 class="text-2xl text-center error">
            {{ error }}
        </h2>
    </div>
    <div
        v-else-if="!playlist"
        class="fill-page"
    >
        <h2 class="text-2xl text-center error">
            Playlist not found
        </h2>
    </div>
    <div v-else class="wrap">
        <div
            class="track__data"
        >
            <div v-observe-visibility="onObserveVisibility" class="upper relative">
                <Cover
                    :placeholder="coverIcon"
                    :src="playlist.cover"
                    class="max-w-sm rounded-xl"
                    type="playlist"
                />
                <div
                    class="track__info__details flex flex-col justify-end"
                >
                    <div class="trac__info__details__normal">
                        <div class="flex flew-row items-center">
                            <span
                                class="text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto"
                                @click="player.loadPlaylist(playlistId)"
                            >
                                play_circle
                            </span>
                            <h1
                                class="font-black text-5xl ml-4"
                            >
                                {{ playlist.name }}
                            </h1>
                        </div>
                        <p v-if="playlist.description" class="text-muted">
                           {{playlist.description}}
                        </p>
                    </div>
                    <div
                        class="features flex flex-row gap-4 pt-4 pb-2 overflow-x-auto"
                    >
                        <FactCard
                            :primary-text="playlist.songs?.length"
                            :secondary-text="playlist.songs?.length === 1 ? 'Song' : 'Songs'"
                            class="w-full"
                        />
                        <FactCard
                            :primary-text="estimatedDuration"
                            class="w-full"
                            secondary-text="Total Duration"
                        />
                        <FactCard
                            v-if="playlist.plays"
                            :primary-text="playlist.plays"
                            class="w-full"
                            secondary-text="Plays"
                        />
                        <Card
                            v-if="canAdd"
                            class="p-4 w-1/2 flex flex-col items-center justify-center"
                        >
                            <span id="addToPlaylist" class="material-symbols-rounded ms-fill" @click="$refs.addSongPopup.show()">add_circle</span>
                            <span class="text-muted">Add a Song</span>
                        </Card>
                        <Card
                            v-if="canEdit"
                            class="p-4 w-1/2 flex flex-col items-center justify-center"
                        >
                            <span id="addToPlaylist" class="material-symbols-rounded ms-fill" @click="$refs.editPlaylistPopup.show()">edit</span>
                            <span class="text-muted">Edit This Playlist</span>
                        </Card>
                    </div>
                    <div v-if="playlist.songs" class="filters mt-4">
                        <TextInputWithIcon
                            v-model="filters.search"
                            icon="search"
                            placeholder="Search"
                        />
                        <MultiSelect
                            v-model="filters.title"
                            :options="titleOptions(playlist.songs)"
                            class="multiselect"
                            icon="title"
                            placeholder="Title"
                        />
                        <MultiSelect
                            v-model="filters.artist"
                            :options="artistOptions(playlist.songs)"
                            class="multiselect"
                            icon="person"
                            placeholder="Artist"
                        />
                        <MultiSelect
                            v-model="filters.album"
                            :options="albumOptions(playlist.songs)"
                            class="multiselect"
                            icon="album"
                            placeholder="Album"
                        />
                        <IconDropdown
                            v-model="filters.sort"
                            :options="sortOptions"
                            icon="filter_list"
                        />
                        <span
                            class="cursor-pointer material-symbols-rounded ms-wght-100 text-5xl"
                            @click="filters.order = filters.order == 'asc' ? 'desc' : 'asc'"
                        >
                            {{ filters.order == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down' }}
                        </span>
                        <span
                            class="cursor-pointer material-symbols-rounded ms-wght-300 text-3xl mr-2"
                            @click="resetFilters"
                        >
                            delete_sweep
                        </span>
                    </div>
                </div>
            </div>
            <PlaylistHeader
                class="hideIfMobile mt-8"
                with-album
                with-more
            />
            <hr class="mb-4">
            <div class="items">
                <draggable
                    v-model="songs"
                    :class="filters.order == 'asc' ? 'flex-col' : 'flex-col-reverse'"
                    :disabled="filterApplied(filters)"
                    item-key="id"
                    class="flex"
                    @change="onPlaylistRearrange"
                >
                    <template #item="{element}">
                        <PlaylistEntry
                            v-show="element.show"
                            :index="playlist.songs.findIndex(x => x.source == element.source)"
                            :playlist-id="playlistId"
                            :selected="selectedSongId == element.id"
                            :song="element"
                            with-album
                            with-cover
                            with-more
                            @click="selectedSongId == element.id ? selectedSongId = -1 : selectedSongId = element.id"
                            @update="$emit('update')"
                        />
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.filters {
    background: var(--bg-base-dk);
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    gap: .5rem;
    padding: .5rem;
    border-radius: 1000em;
    align-items: center;
    border: var(--border-container);

    .multiselect {
        overflow-x: hidden;
    }
}

.features div {
    &.w-full {
        min-width: 150px;
    }

    &.w-1\/2 {
        min-width: 100px;
    }
}

.track__data .upper {
    display: grid;
    grid-template-columns: fit-content(100%) minmax(500px, 1fr);
    gap: 2rem;

    .cover {
        min-width: 384px;
        aspect-ratio: 1 / 1;
    }

    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: center;

        .cover {
            min-width: 20vw;
        }

        .track__info__details {
            overflow: auto;
            width: 100%;
        }
    }
}


.wrap {
    grid-template-columns: 1fr;
    display: grid;
    align-items: start;
}

#loadPlaylist,
#addToPlaylist {
    font-size: 3rem;
    border-radius: 1000vmax;
    width: 70px;
    line-height: 70px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin-bottom: 1.25rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: var(--bg-hover-lt);
        color: var(--fg-secondary);
        transition: none;
    }
}

.card {
    p, h2 {
        text-align: center;
    }
}

.playlist {
    height: 100%;

    h2.error {
        color: var(--fail);
    }
}
</style>

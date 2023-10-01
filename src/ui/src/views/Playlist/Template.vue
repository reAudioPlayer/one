<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0

    This component renders ALL playlists
  -->

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Cover from "../../components/image/Cover.vue";
import Card from "../../containers/Card.vue";
import FactCard from "../../containers/FactCard.vue";
import TextInputWithIcon from "../../components/inputs/TextInputWithIcon.vue";
import PlaylistEntry from "../../components/songContainers/PlaylistEntry.vue";
// @ts-ignore
import draggable from "vuedraggable";
import IconDropdown from "../../components/inputs/IconDropdown.vue";
import EditableText from "../../components/EditableText.vue";
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
import { useDataStore } from "../../store/data";
import { updatePlaylistMetadata } from "../../api/playlist";
import { useRouter } from "vue-router";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    coverIcon: {
        type: String,
        required: false,
    },
});

const player = usePlayerStore();
const data = useDataStore();
const router = useRouter();
const playlist = computed(() => data.getPlaylistById(props.id));

const songs = ref(playlist.value?.songs ?? ([] as IFilteredSong[]));
const title = ref(playlist.value?.name.trim() ?? "");
const description = ref(playlist.value?.description.trim() ?? "");
const fixedHeaderHidden = ref(true);
const selectedSongId = ref(null as number | null);
const defaultFilters = () =>
    ({
        sort: "index",
        order: "asc",
        search: "",
        title: [],
        artist: [],
        album: [],
    } as IPlaylistFilters);
const filters = ref(null as IPlaylistFilters | null);
const resetFilters = () => {
    filters.value = { ...defaultFilters() };
};
resetFilters();

const sortOptions = [
    {
        value: "title",
        label: "Title",
        icon: "title",
    },
    {
        value: "artist",
        label: "Artist",
        icon: "person",
    },
    {
        value: "album",
        label: "Album",
        icon: "album",
    },
    {
        value: "duration",
        label: "Duration",
        icon: "timer",
    },
    {
        value: "index",
        label: "Added",
        icon: "date_range",
    },
];

const estimatedDuration = computed(() => {
    let duration = 0;
    let isEstimate = false;

    if (!playlist.value.songs.length) {
        return "";
    }

    for (const song of playlist.value.songs) {
        isEstimate = isEstimate || song.duration <= 0;
        const seconds = song.duration <= 0 ? 3 * 60 : song.duration; // estimate 3:00 if unknown
        duration += seconds;
    }

    const sec = duration;
    const min = Math.floor(sec / 60);
    const hs = Math.floor(min / 60);

    const prefix = isEstimate ? "about " : "";

    if (hs) {
        return prefix + `${hs} hr ${min - hs * 60} min`;
    }

    if (min) {
        return prefix + `${min} min ${sec - min * 60} sec`;
    }

    return prefix + duration + " sec";
});

const emit = defineEmits(["rearrange"]);

const onPlaylistRearrange = (type) => {
    const moved = type.moved;

    if (!moved) {
        return;
    }

    emit("rearrange", moved.oldIndex, moved.newIndex);
};

watch(
    [filters, playlist],
    () => {
        if (!playlist.value) {
            return;
        }
        applyFiltersToSongs();
    },
    { deep: true }
);

const applyFiltersToSongs = () => {
    songs.value = applyFilters(playlist.value?.songs ?? [], filters.value);
};
applyFiltersToSongs();

watch(playlist, () => {
    title.value = playlist.value?.name.trim() ?? "";
    description.value = playlist.value?.description.trim() ?? "";
    applyFiltersToSongs();
});

watch([title, description], () => {
    if (
        title.value === playlist.value?.name &&
        description.value === playlist.value?.description
    ) {
        return;
    }
    const newPlaylist = {
        ...playlist.value,
        name: title.value,
        description: description.value,
    };

    updatePlaylistMetadata(newPlaylist);
    data.fetchPlaylists();
});

const onObserveVisibility = (isVisible, _) => {
    fixedHeaderHidden.value = isVisible;
};

const canAdd = computed(() => {
    return playlist.value.type === "classic";
});

const canEdit = computed(() => {
    return ["smart"].includes(playlist.value.type);
});

const canRearrange = computed(() => {
    return playlist.value.type === "classic";
});

const editPlaylist = () => {
    router.push(`/playlist/${playlist.value.id}/edit`);
};
</script>

<template>
    <AmbientBackground
        v-if="playlist?.cover"
        :placeholder="coverIcon"
        :src="playlist.cover"
    />
    <div class="playlist p-4">
        <AddNewSong ref="addSongPopup" @update="data.fetchPlaylists()" />
        <FixedPlaylistHeader
            v-if="playlist"
            ref="fixedHeading"
            :class="{ hidden: fixedHeaderHidden }"
            :title="playlist.name"
            @loadPlaylist="player.loadPlaylist(id)"
        />

        <div v-if="!playlist" class="fill-page">
            <h2 class="text-2xl text-center error">Playlist not found</h2>
        </div>
        <div v-else class="wrap">
            <div class="track__data">
                <div
                    v-observe-visibility="onObserveVisibility"
                    class="upper relative"
                >
                    <Cover
                        :placeholder="coverIcon"
                        :src="playlist.cover"
                        class="max-w-sm rounded-xl"
                        type="playlist"
                    />
                    <div class="track__info__details flex flex-col justify-end">
                        <div class="trac__info__details__normal">
                            <div
                                class="flex flex-row items-center gap-2 playlist-type"
                                v-if="playlist.type != 'classic'"
                            >
                                <span class="material-symbols-rounded">
                                    {{
                                        playlist.type == "smart"
                                            ? "neurology"
                                            : "bolt"
                                    }}
                                </span>
                                <span>{{ playlist.type }} Playlist</span>
                            </div>
                            <div class="flex flew-row items-center">
                                <span
                                    class="text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto"
                                    @click="player.loadPlaylist(id)"
                                >
                                    play_circle
                                </span>
                                <h1
                                    class="font-black text-5xl ml-4 w-full flex-1"
                                >
                                    <EditableText v-model="title">
                                        {{ playlist.name }}
                                    </EditableText>
                                </h1>
                            </div>
                            <p class="text-muted">
                                <EditableText
                                    v-model="description"
                                    placeholder="No description"
                                >
                                    {{ playlist.description }}
                                </EditableText>
                            </p>
                        </div>
                        <div
                            class="features flex flex-row gap-4 pt-4 pb-2 overflow-x-auto"
                        >
                            <FactCard
                                :primary-text="playlist.songs?.length"
                                :secondary-text="
                                    playlist.songs?.length === 1
                                        ? 'Song'
                                        : 'Songs'
                                "
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
                                <span
                                    id="addToPlaylist"
                                    class="material-symbols-rounded ms-fill"
                                    @click="$refs.addSongPopup.show()"
                                    >add_circle</span
                                >
                                <span class="text-muted">Add a Song</span>
                            </Card>
                            <Card
                                v-if="canEdit"
                                class="p-4 w-1/2 flex flex-col items-center justify-center"
                            >
                                <span
                                    id="addToPlaylist"
                                    class="material-symbols-rounded ms-fill"
                                    @click="editPlaylist"
                                    >edit</span
                                >
                                <span class="text-muted"
                                    >Edit This Playlist</span
                                >
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
                                @click="
                                    filters.order =
                                        filters.order == 'asc' ? 'desc' : 'asc'
                                "
                            >
                                {{
                                    filters.order == "asc"
                                        ? "arrow_drop_up"
                                        : "arrow_drop_down"
                                }}
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
                    v-if="songs.length"
                />
                <hr class="mb-4" />
                <div class="items" v-if="songs.length">
                    <draggable
                        v-if="songs.length"
                        :key="id"
                        v-model="songs"
                        :class="
                            filters.order == 'asc'
                                ? 'flex-col'
                                : 'flex-col-reverse'
                        "
                        :disabled="filterApplied(filters) || !canRearrange"
                        item-key="id"
                        class="flex"
                        @change="onPlaylistRearrange"
                    >
                        <template #item="{ element }">
                            <PlaylistEntry
                                v-show="element.show"
                                :index="
                                    playlist.songs.findIndex(
                                        (x) => x.source == element.source
                                    )
                                "
                                :playlist-id="id"
                                :selected="selectedSongId == element.id"
                                :song="element"
                                with-album
                                with-cover
                                with-more
                                @click="
                                    selectedSongId == element.id
                                        ? (selectedSongId = -1)
                                        : (selectedSongId = element.id)
                                "
                                @update="data.fetchPlaylists()"
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
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 1000em;
    align-items: center;
    border: var(--border-container);

    .multiselect {
        overflow-x: hidden;
    }
}

.playlist-type {
    color: var(--fg-secondary);
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: 900;
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
    p,
    h2 {
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

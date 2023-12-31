<script setup lang="ts">
import { useRouter } from "vue-router";
import {
    albumOptions,
    artistOptions,
    IPlaylistFilters,
    titleOptions,
} from "./applyFilters";
import type { IFullPlaylist } from "../../common";
import { computed, ref, watch } from "vue";
import { usePlayerStore } from "../../store/player";
import Cover from "../../components/image/Cover.vue";
import Card from "../../containers/Card.vue";
import FactCard from "../../containers/FactCard.vue";
import TextInputWithIcon from "../../components/inputs/TextInputWithIcon.vue";
import IconDropdown from "../../components/inputs/IconDropdown.vue";
import EditableText from "../../components/EditableText.vue";
import MultiSelect from "../../components/inputs/MultiSelect.vue";
import FixedPlaylistHeader from "../../components/Playlist/FixedPlaylistHeader.vue";
import { deletePlaylist, updatePlaylistMetadata } from "../../api/playlist";
import { useDataStore } from "../../store/data";
import AddNewSong from "../../components/popups/AddNewSong.vue";
import PlaylistContext from "../../components/contextMenus/PlaylistContext.vue";

const props = defineProps({
    playlist: {
        type: Object as () => IFullPlaylist,
        required: false,
    },
    coverIcon: {
        type: String,
        required: true,
    },
});

const contextmenu = ref<typeof PlaylistContext>();
const playlist = computed(() => props.playlist);
const fixedHeaderHidden = ref(true);
const router = useRouter();
const player = usePlayerStore();
const data = useDataStore();
const title = ref(playlist.value?.name.trim() ?? "");
const description = ref(playlist.value?.description.trim() ?? "");

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

defineExpose({ songFilters: filters });

watch(
    () => playlist.value,
    () => {
        title.value = playlist.value?.name.trim() ?? "";
        description.value = playlist.value?.description.trim() ?? "";
        resetFilters();
    }
);

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
    data.fetchPlaylists(playlist.value.id);
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
        return "N/A";
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

const deleteMe = async () => {
    await deletePlaylist(playlist.value.id);
    await data.fetchPlaylists();
    router.push("/");
};
</script>

<template>
    <PlaylistContext ref="contextmenu" :playlist="playlist" :can-edit="canEdit">
        <FixedPlaylistHeader
            v-if="playlist"
            ref="fixedHeading"
            :class="{ hidden: fixedHeaderHidden }"
            :title="playlist.name"
            @loadPlaylist="player.loadPlaylist(playlist.id)"
        />
        <AddNewSong ref="addSongPopup" @update="data.fetchPlaylists()" />
        <div v-observe-visibility="onObserveVisibility" class="upper relative">
            <Cover
                :placeholder="coverIcon"
                :src="playlist.cover"
                class="cover rounded-xl"
                type="playlist"
                :name="playlist.name"
            />
            <div class="track__info__details flex flex-col justify-end">
                <div class="trac__info__details__normal">
                    <div
                        class="flex flex-row items-center gap-2 playlist-type"
                        v-if="playlist.type != 'classic'"
                    >
                        <span class="material-symbols-rounded">
                            {{
                                playlist.type == "smart" ? "neurology" : "bolt"
                            }}
                        </span>
                        <span>{{ playlist.type }} Playlist</span>
                    </div>
                    <div class="flex flew-row items-center">
                        <span
                            class="text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto"
                            @click="player.loadPlaylist(playlist.id)"
                        >
                            play_circle
                        </span>
                        <h1 class="font-black text-5xl ml-4 w-full flex-1">
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
                            playlist.songs?.length === 1 ? 'Song' : 'Songs'
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
                            @click="($refs.addSongPopup as any).show()"
                            >add_circle</span
                        >
                        <span class="text-muted">Add a song</span>
                    </Card>
                    <Card
                        class="p-4 w-1/2 flex flex-col items-center justify-center"
                    >
                        <span
                            id="addToPlaylist"
                            class="material-symbols-rounded ms-fill"
                            @click.prevent.stop="(e) => contextmenu.toggle(e)"
                        >
                            more_horiz
                        </span>
                        <span class="text-muted">More...</span>
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
                        :options="artistOptions(playlist.songs) as any"
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
    </PlaylistContext>
</template>

<style lang="scss">
.upper .cover {
    max-width: 30rem !important;
}
</style>

<style scoped lang="scss">
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

.upper {
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
</style>

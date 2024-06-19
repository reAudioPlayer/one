<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import IconButton from "@/components/inputs/IconButton.vue";
import IconDropdown from "@/components/inputs/IconDropdown.vue";
import TextInputWithIcon from "@/components/inputs/TextInputWithIcon.vue";
import { debounce } from "lodash";
import { IFullPlaylist, ISmartPlaylistDefinition } from "@/common";
import {
    peekSmartPlaylist,
    getSmartPlaylistDefinition,
    updateSmartPlaylistDefinition,
    deletePlaylist,
} from "@/api/playlist";
import Playlist from "@/components/playlist/Playlist.vue";
import Card from "@/containers/Card.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useDataStore } from "@/store/data";

const route = useRoute();
const router = useRouter();
const playlistId = computed(() => route.params.id as string);
const dataStore = useDataStore();

const smartPlaylist = ref<ISmartPlaylistDefinition>({
    direction: "asc",
    sort: "id",
    limit: 25,
    filter: {
        title: [],
        artist: [],
        album: [],
        duration: {},
    },
});

const playlist = ref<IFullPlaylist | null>();
watch(
    [
        () => smartPlaylist.value.sort,
        () => smartPlaylist.value.filter,
        () => smartPlaylist.value.direction,
    ],
    debounce(async () => {
        playlist.value = await peekSmartPlaylist(smartPlaylist.value);
    }, 3 * 1000),
    {
        deep: true,
    }
);

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
        value: "id",
        label: "Added",
        icon: "date_range",
    },
];

const filters = ["title", "artist", "album"];
const icons = {
    title: "title",
    artist: "person",
    album: "album",
};

onMounted(async () => {
    smartPlaylist.value = await getSmartPlaylistDefinition(playlistId.value);
    if (!smartPlaylist.value.filter) {
        smartPlaylist.value.filter = {
            title: [],
            artist: [],
            album: [],
            duration: {},
        };
    }

    const plFilter = smartPlaylist.value.filter;

    for (const filter of filters) {
        if (!plFilter[filter]) {
            plFilter[filter] = [];
        }
    }

    smartPlaylist.value.filter = plFilter;
});

const updateSmartPlaylist = async () => {
    await updateSmartPlaylistDefinition(playlistId.value, smartPlaylist.value);
    dataStore.fetchPlaylists();
};

const deleteMe = async () => {
    await deletePlaylist(playlistId.value);
    dataStore.fetchPlaylists();
    router.push("/");
};
</script>

<template>
    <div class="playlist-editor">
        <div class="editor">
            <div class="sort my-2">
                <IconButton
                    label="Save"
                    icon="save"
                    type="success"
                    class="!mt-0"
                    @click="updateSmartPlaylist"
                />
                <IconButton
                    label="Delete"
                    icon="delete"
                    type="danger"
                    class="!mt-0"
                    @click="deleteMe"
                />
                <IconDropdown
                    v-model="smartPlaylist.sort"
                    :options="sortOptions"
                    icon="filter_list"
                />
                <span
                    class="cursor-pointer material-symbols-rounded ms-wght-100 text-5xl"
                    @click="
                        smartPlaylist.direction =
                            smartPlaylist.direction == 'asc' ? 'desc' : 'asc'
                    "
                >
                    {{
                        smartPlaylist.direction == "asc"
                            ? "arrow_drop_up"
                            : "arrow_drop_down"
                    }}
                </span>
                <TextInputWithIcon
                    v-model="smartPlaylist.limit"
                    type="number"
                    placeholder="Limit..."
                    icon="123"
                />
            </div>
            <div class="filters">
                <Card class="filter" v-for="filter in filters">
                    <h4 class="uppercase mt-0">{{ filter }}</h4>
                    <div class="items">
                        <div
                            class="item"
                            v-for="(_, index) in smartPlaylist.filter[filter]"
                        >
                            <TextInputWithIcon
                                v-model="smartPlaylist.filter[filter][index]"
                                :icon="icons[filter]"
                            />
                            <span
                                class="material-symbols-rounded"
                                @click="
                                    smartPlaylist.filter[filter].splice(
                                        index,
                                        1
                                    )
                                "
                            >
                                delete
                            </span>
                        </div>
                        <IconButton
                            label="OR"
                            icon="add"
                            @click="smartPlaylist.filter[filter].push('')"
                        />
                    </div>
                </Card>
            </div>
        </div>
        <div class="preview">
            <Playlist :playlist="playlist" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.playlist-editor {
    .sort {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }

    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    padding: 1em;

    h1 {
        grid-column: 1 / span 2;
    }

    .filters .item {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1em;
        align-items: center;
    }

    .filters .items {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .filters {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .filter {
        padding: 1em;

        h3 {
            text-transform: capitalize;
        }
    }

    .material-symbols-rounded {
        cursor: pointer;
    }

    .editor {
        position: sticky;
        top: 0;
    }
}
</style>

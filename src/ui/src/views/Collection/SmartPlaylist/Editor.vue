<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import Dropdown from "../../../components/inputs/Dropdown.vue";
import IconButton from "../../../components/inputs/IconButton.vue";
import IconDropdown from "../../../components/inputs/IconDropdown.vue";
import TextInputWithIcon from "../../../components/inputs/TextInputWithIcon.vue";
import { debounce } from "lodash";
import { IPlaylist } from "../../../common";
import { peekSmartPlaylist } from "../../../api/playlist";
import Playlist from "../../../components/Playlist/Playlist.vue";
import Card from "../../../containers/Card.vue";

interface IDuration {
    from?: number; // s
    to?: number; // s
}

interface IFilter {
    title: string[];
    artist: string[];
    album: string[];
    duration: IDuration;
}

interface ISmartPlaylist {
    name: string;
    description: string;
    direction: "asc" | "desc";
    sort: "duration" | "title" | "artist" | "album" | "id";
    filter: IFilter;
}

const smartPlaylist = reactive<ISmartPlaylist>({
    name: "",
    description: "",
    direction: "asc",
    sort: "id",
    filter: {
        title: [],
        artist: [],
        album: [],
        duration: {},
    },
});

const playlist = ref<IPlaylist | null>();
watch(
    [
        () => smartPlaylist.sort,
        () => smartPlaylist.filter,
        () => smartPlaylist.direction,
    ],
    debounce(async () => {
        playlist.value = await peekSmartPlaylist(smartPlaylist);
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
</script>

<template>
    <div class="playlist-editor">
        <h1>Smart Playlist Editor</h1>
        <div class="editor">
            <h2>
                <TextInputWithIcon
                    v-model="smartPlaylist.name"
                    placeholder="Playlist title..."
                />
            </h2>
            <p>
                <TextInputWithIcon
                    v-model="smartPlaylist.description"
                    placeholder="Playlist description..."
                />
            </p>
            <hr />
            <div class="sort">
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

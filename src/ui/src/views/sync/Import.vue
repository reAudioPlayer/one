<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Loader from "@/components/Loader.vue";
import GistClient from "../../api/gistClient";
import { diffLib, IPlaylistDiff } from "./diff";
import PlaylistDiff from "./PlaylistDiff.vue";
import { IFullPlaylist, ISong } from "../../common";
import { computed, ref, onMounted, watch } from "vue";
import IconButton from "../../components/inputs/IconButton.vue";
import { createPlaylistWithMetadata, deletePlaylist, removeSongFromPlaylist } from "../../api/playlist";
import { addSong, updateSongProperty } from "../../api/song";
import { useDataStore } from "../../store/data";
import Card from "../../containers/Card.vue";
import gistClient from "../../api/gistClient";
import { asSyncableCollection, ISyncableCollection } from "./collection";


const merging = ref(false);
const other = ref(null as "file" | "gist" | null);
const base = ref({} as ISyncableCollection);
// @ts-ignore
const compareWith = ref({} as ISyncableCollection);

const diff = computed(() => diffLib(base.value, compareWith.value));

const dataStore = useDataStore();
let loadingPlaylists = false;
const loadBase = async () => {
    if (merging.value) return;
    if (loadingPlaylists) return;
    loadingPlaylists = true;
    const playlists = [] as IFullPlaylist[];
    for (const availablePlaylist of dataStore.playlists?.filter(x => x.type != "special")) {
        const playlist = Object.assign({}, availablePlaylist);
        playlists.push(playlist);
    }
    base.value = await asSyncableCollection(playlists);
    loadingPlaylists = false;
};

watch(() => dataStore.playlists, loadBase);
onMounted(loadBase);

const exclude = (playlist: IFullPlaylist) => {
    // NOTE perhaps an exclude list and computed base/compareWith?
    // because like this, a diff for added/modded playlists will be wrong

    base.value.collection = base.value.collection.filter(x => x.playlist.name !== playlist.name);
    compareWith.value.collection = compareWith.value.collection.filter(x => x.playlist.name !== playlist.name);
};

const expanded = ref<IFullPlaylist | null>(null);
const expandedSong = ref<ISong | null>(null);

const toggleExpanded = (playlist: IFullPlaylist) => {
    if (expanded.value?.name === playlist.name) {
        expanded.value = null;
    } else {
        expanded.value = playlist;
    }
};

const toggleExpandedSong = (song: ISong) => {
    if (expandedSong.value?.id === song.id) {
        expandedSong.value = null;
    } else {
        expandedSong.value = song;
    }
};

const merge = async () => {
    merging.value = true;
    const promises = [] as Promise<any>[];

    const modifyPlaylist = (diff: IPlaylistDiff) => {
        for (const song of diff.added) {
            promises.push(addSong(diff.id, song));
        }

        for (const song of diff.removed) {
            promises.push(removeSongFromPlaylist(diff.id, song.id));
        }

        for (const song of diff.modified) {
            for (const key of Object.keys(song.changed)) {
                promises.push(updateSongProperty(song.id, key, song.changed[key].to));
            }
        }
    };

    for (const playlist of diff.value.added) {
        base.value.collection.push(playlist);
        promises.push(createPlaylistWithMetadata(playlist.playlist.name,
                                                 playlist.playlist.description,
                                                 playlist.playlist.cover).then(id => {
            playlist.playlist.id = id;
            modifyPlaylist({
                id: playlist.playlist.id,
                name: playlist.playlist.name,
                added: playlist.playlist.songs,
                removed: [],
                modified: []
            });
        }));
    }

    for (const playlist of diff.value.modified) {
        modifyPlaylist(playlist);
    }

    for (const playlist of diff.value.removed) {
        promises.push(deletePlaylist(playlist.playlist.id));
    }

    await Promise.all(promises);
    window.setTimeout(async () => {
        await dataStore.fetchPlaylists();
        merging.value = false;
        await loadBase();
    }, 1000);
};

const gistConnected = ref(false);
gistClient.connected().then(x => gistConnected.value = x);

const uploadFile = async () => {
    // create input element and load 
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".one.*";
    input.name = "my.one.collection";
    input.onchange = async () => {
        if (!input.files) return;
        const file = input.files[0];
        const text = await file.text();
        const json = JSON.parse(text);
        compareWith.value = json;
        other.value = "file";
    };
    input.click();
};

const importGist = async () => {
    compareWith.value = await GistClient.getContent();
    other.value = "gist";
};

const ws = ref(null as WebSocket | null);
</script>

<template>
    <div class="pb-4 pr-4 flex flex-col gap-4 h-full">
        <div class="flex flex-row justify-end">
            <IconButton
                icon="merge"
                label="Merge"
                @click="merge"
            />
        </div>
        <template
            v-if="other"
        >
            <template
                v-if="!merging"
            >
                <div class="grid grid-cols-2 gap-4">
                    <h1>Local</h1>
                    <h1>Incoming</h1>
                </div>
                <div
                    v-for="playlist in base.collection"
                    :key="playlist.playlist.name"
                    class="grid grid-cols-2 gap-4"
                >
                    <PlaylistDiff
                        v-if="base.collection.some(x => x.playlist.name === playlist.playlist.name)"
                        :diff="diff"
                        :expanded="expanded?.name === playlist.playlist.name"
                        :expanded-song="expandedSong"
                        :playlist="playlist.playlist"
                        class="grid-1"
                        is-base
                        @exclude="exclude"
                        @toggle-expanded="toggleExpanded"
                        @toggle-expanded-song="toggleExpandedSong"
                    />
                    <PlaylistDiff
                        v-if="compareWith.collection.some(x => x.playlist.name === playlist.playlist.name)"
                        :diff="diff"
                        :expanded="expanded?.name === playlist.playlist.name"
                        :expanded-song="expandedSong"
                        :playlist="compareWith.collection.find(x => x.playlist.name === playlist.playlist.name)"
                        class="grid-2"
                        @exclude="exclude"
                        @toggle-expanded="toggleExpanded"
                        @toggle-expanded-song="toggleExpandedSong"
                    />
                </div>
                <div
                    v-for="playlist in diff.added"
                    :key="playlist.playlist.name"
                    class="grid grid-cols-2 gap-4"
                >
                    <PlaylistDiff
                        v-if="compareWith.collection.some(x => x.playlist.name === playlist.playlist.name)"
                        :diff="diff"
                        :expanded="expanded?.name === playlist.playlist.name"
                        :expanded-song="expandedSong"
                        :playlist="playlist.playlist"
                        class="grid-2"
                        @exclude="exclude"
                        @toggle-expanded="toggleExpanded"
                        @toggle-expanded-song="toggleExpandedSong"
                    />
                </div>
            </template>
            <div class="fill-page" v-else>
                <Loader />
            </div>
        </template>
        <div
            v-else
            class="fill-page !grid !grid-cols-2 gap-4"
        >
            <Card with-hover class="cursor-pointer" @click="uploadFile">
                <h2>
                    <span class="material-symbols-rounded">file_upload</span>
                    From File
                </h2>
            </Card>
            <Card :disabled="!gistConnected" with-hover class="cursor-pointer" @click="importGist">
                <h2>
                    <span class="material-symbols-rounded">cloud_download</span>
                    GitHub Gist
                </h2>
            </Card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grid-1 {
    grid-column: 1;
}

.grid-2 {
    grid-column: 2;
}

h2 {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em;

    .material-symbols-rounded {
        font-size: 2rem;
    }
}
</style>

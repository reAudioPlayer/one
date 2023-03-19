<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import less from "../../assets/lib.one.less.json";
import more from "../../assets/lib.one.more.json";
import other from "../../assets/lib.one.other.json";
import shuffled from "../../assets/lib.one.shuffled.json";
import { diffLib, IPlaylistDiff } from "./diff";
import PlaylistDiff from "./PlaylistDiff.vue";
import { IFullPlaylist, ISong } from "../../common";
import { computed, ref, watch } from "vue";
import IconButton from "../../components/inputs/IconButton.vue";
import { createPlaylistWithMetadata, deletePlaylist, removeSongFromPlaylist } from "../../api/playlist";
import { addSong, updateSongProperty } from "../../api/song";
import { useDataStore } from "../../store/data";

console.log(less, more, other, shuffled);

const base = ref([] as IFullPlaylist[]);
// @ts-ignore
const compareWith = ref(other as IFullPlaylist[]);

const diff = computed(() => diffLib(base.value, compareWith.value));

const dataStore = useDataStore();
let loadingPlaylists = false;
watch(() => dataStore.playlists, async playlists => {
    if (loadingPlaylists) return;
    loadingPlaylists = true;
    base.value = [];
    for (let id = 0; id < playlists?.length; id++) {
        const res = await fetch(`/api/playlists/${id}`)
        const playlist = await res.json();
        base.value.push(playlist);
    }
    loadingPlaylists = false;
});

const exclude = (playlist: IFullPlaylist) => {
    // NOTE perhaps an exclude list and computed base/compareWith?
    // because like this, a diff for added/modded playlists will be wrong

    base.value = base.value.filter(x => x.name !== playlist.name);
    compareWith.value = compareWith.value.filter(x => x.name !== playlist.name);
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

const merge = () => {
    const modifyPlaylist = (diff: IPlaylistDiff) => {
        for (const song of diff.added) {
            addSong(diff.id, song);
        }

        for (const song of diff.removed) {
            removeSongFromPlaylist(diff.id, song.id);
        }

        for (const song of diff.modified) {
            for (const key of Object.keys(song.changed)) {
                updateSongProperty(song.id, key, song.changed[key].to);
            }
        }
    };

    for (const playlist of diff.value.added) {
        base.value.push(playlist);
        createPlaylistWithMetadata(playlist.name, playlist.description, playlist.cover).then(id => {
            playlist.id = id;
            modifyPlaylist({
                id: playlist.id,
                name: playlist.name,
                added: playlist.songs,
                removed: [],
                modified: []
            });
        });
    }

    for (const playlist of diff.value.modified) {
        modifyPlaylist(playlist);
    }

    for (const playlist of diff.value.removed) {
        deletePlaylist(playlist.id);
    }
};
</script>

<template>
    <div class="flex flex-col gap-4 pb-4 pr-4">
        <div class="flex flex-row justify-end">
            <IconButton
                icon="merge"
                label="Merge"
                @click="merge"
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <h1>Base</h1>
            <h1>Incoming</h1>
        </div>
        <div
            v-for="playlist in base"
            :key="playlist.name"
            class="grid grid-cols-2 gap-4"
        >
            <PlaylistDiff
                v-if="base.some(x => x.name === playlist.name)"
                :diff="diff"
                :expanded="expanded?.name === playlist.name"
                :expanded-song="expandedSong"
                :playlist="playlist"
                class="grid-1"
                is-base
                @exclude="exclude"
                @toggle-expanded="toggleExpanded"
                @toggle-expanded-song="toggleExpandedSong"
            />
            <PlaylistDiff
                v-if="compareWith.some(x => x.name === playlist.name)"
                :diff="diff"
                :expanded="expanded?.name === playlist.name"
                :expanded-song="expandedSong"
                :playlist="compareWith.find(x => x.name === playlist.name)"
                class="grid-2"
                @exclude="exclude"
                @toggle-expanded="toggleExpanded"
                @toggle-expanded-song="toggleExpandedSong"
            />
        </div>
        <div
            v-for="playlist in diff.added"
            :key="playlist.name"
            class="grid grid-cols-2 gap-4"
        >
            <PlaylistDiff
                v-if="compareWith.some(x => x.name === playlist.name)"
                :diff="diff"
                :expanded="expanded?.name === playlist.name"
                :expanded-song="expandedSong"
                :playlist="playlist"
                class="grid-2"
                @exclude="exclude"
                @toggle-expanded="toggleExpanded"
                @toggle-expanded-song="toggleExpandedSong"
            />
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
</style>

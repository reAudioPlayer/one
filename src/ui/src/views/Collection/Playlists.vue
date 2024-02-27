<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import Playlist from "/src/components/Catalogue/Items/home/Playlist.vue";
import PlaylistItem from "@/components/Catalogue/Items/Playlists/PlaylistItem.vue";
import CollectionHeader from "@/components/CollectionHeader.vue";
import { useDataStore } from "../../store/data";
import { ref, computed } from "vue";

const dataStore = useDataStore();
const playlists = computed(() => dataStore.playlists);
const spotifyPlaylists = ref([]);

fetch("/api/spotify/playlists")
    .then((x) => x.json())
    .then((jdata) => {
        spotifyPlaylists.value = jdata;
    });
</script>

<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="playlists">
            <full-shelf v-if="playlists.length" heading="Playlists">
                <Playlist
                    v-for="(playlist, index) in playlists"
                    :key="index"
                    :cover="playlist.cover"
                    :href="playlist?.href"
                    :name="playlist.name"
                    :type="playlist.type"
                    :id="playlist.id"
                />
            </full-shelf>
            <full-shelf
                heading="Import From Spotify"
                v-if="spotifyPlaylists.length"
            >
                <playlist-item
                    title="Liked"
                    description="your liked tracks"
                    :spotify="true"
                    id="liked"
                />
                <playlist-item
                    v-for="(element, index) in spotifyPlaylists"
                    :key="index"
                    :cover="element.cover"
                    :description="element.description"
                    :title="element.name"
                    :id="element.id"
                    :spotify="true"
                    :href="`https://open.spotify.com/playlist/${element.id}`"
                />
            </full-shelf>
        </div>
    </div>
</template>
<style scoped>
.padding-20 {
    padding: 20px;
}
</style>

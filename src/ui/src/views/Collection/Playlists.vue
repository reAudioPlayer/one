<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import Playlist from "/src/components/Catalogue/Items/home/Playlist.vue";
import PlaylistItem from "@/components/Catalogue/Items/Playlists/PlaylistItem.vue";
import FetchLoader from "../../components/FetchLoader.vue";
import { useDataStore } from "../../store/data";
import { ref, computed, onMounted } from "vue";

const dataStore = useDataStore();
const playlists = computed(() => dataStore.playlists);
const spotifyPlaylists = ref([]);

const promise = ref<Promise<Response> | null>(null);

onMounted(async () => {
    promise.value = fetch("/api/spotify/playlists");
    const res = await promise.value;
    const data = await res.json();
    spotifyPlaylists.value = data;
});
</script>

<template>
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
        <FetchLoader
            :response="promise"
            :error="
                (res) => `Failed to fetch Spotify playlists (${res.status})`
            "
        >
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
        </FetchLoader>
    </div>
</template>

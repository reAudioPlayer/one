<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import FullShelf from "@/components/catalogue/FullShelf.vue";
import Playlist from "@/components/playlist/PlaylistCard.vue";
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
                v-for="playlist in playlists"
                :playlist="playlist"
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
                <Playlist
                    :playlist="{
                        href: '/liked',
                        name: 'Liked',
                        description: 'your liked tracks',
                        type: 'classic',
                        cover: null,
                        id: 'liked',
                        plays: 0
                    }"
                    is-spotify
                />
                <Playlist
                    v-for="playlist in spotifyPlaylists"
                    :playlist="{
                        ...playlist,
                        href: `https://open.spotify.com/playlist/${playlist.id}`,
                        type: 'classic'
                    }"
                    is-spotify
                />
            </full-shelf>
        </FetchLoader>
    </div>
</template>

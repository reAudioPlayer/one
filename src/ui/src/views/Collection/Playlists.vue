<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup>
import { useDataStore } from "@/store/data";
import { computed } from "vue";

const dataStore = useDataStore();

const playlists = computed(() => dataStore.playlists);
</script>

<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="playlists">
            <full-shelf v-if="playlists.length" heading="Playlists">
                <playlist-item
                    v-for="(element, index) in playlists"
                    :key="index"
                    :href="element.href"
                    :cover="element.cover"
                    :description="element.description"
                    :title="element.name"
                    :type="element.type"
                    :spotify="false"
                />
            </full-shelf>
            <full-shelf
                heading="Import From Spotify"
                v-if="spotifyPlaylists.length"
            >
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

<script>
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import PlaylistItem from "@/components/Catalogue/Items/Playlists/PlaylistItem.vue";
import PlaylistItemBig from "@/components/Catalogue/Items/Playlists/PlaylistItemBig.vue";
import CollectionHeader from "@/components/CollectionHeader.vue";

export default {
    components: {
        CollectionHeader,
        PlaylistItem,
        FullShelf,
        PlaylistItemBig,
    },
    data() {
        fetch("/api/me/liked")
            .then((x) => x.json())
            .then((jdata) => {
                this.likedTracks = jdata;
            });
        fetch("/api/me/new")
            .then((x) => x.json())
            .then((jdata) => {
                this.breakingTracks = jdata;
            });
        fetch("/api/spotify/playlists")
            .then((x) => x.json())
            .then((jdata) => {
                this.spotifyPlaylists = jdata;
            });

        return {
            likedTracks: null,
            breakingTracks: null,
            spotifyPlaylists: [],
        };
    },
};
</script>

<style scoped>
.padding-20 {
    padding: 20px;
}
</style>

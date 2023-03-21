<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { hashPlaylist, IFullPlaylist, unhashPlaylist } from "../../common";
import { createPlaylist, getPlaylistByHash } from "../../api/playlist";
import { usePlayerStore } from "../../store/player";
import Template from "./Template.vue";
import { useDataStore } from "../../store/data";

const route = useRoute();
const router = useRouter();
const player = usePlayerStore();
const dataStore = useDataStore();

const hash = computed(() => route.params.hash as string);
const id = computed(() => unhashPlaylist(hash.value));
const playlist = ref(null as IFullPlaylist | null);
const loading = ref(false);
const error = ref(null as string | null);

const load = async () => {
    loading.value = true;
    error.value = null;

    if (!hash.value) {
        loading.value = false;
        error.value = "No playlist provided";
        return;
    }

    if (hash.value === "create") {
        createPlaylist().then(id => {
            const link = hashPlaylist(id);
            router.push(link);
        })
        return;
    }

    // reset
    playlist.value = await getPlaylistByHash(hash.value);

    loading.value = false;
};

const onPlaylistRearrange = (oldIndex, newIndex) => {
    fetch(`/api/playlists/${id.value}/tracks`, {
        method: "PUT",
        body: JSON.stringify({
            songOldIndex: oldIndex,
            songNewIndex: newIndex
        })
    })
}

onMounted(load);
watch(route, () => load(), { deep: true });
watch(() => dataStore.playlists, () => load(), { deep: true });
</script>

<template>
    <Template
        :error="error"
        :loading="loading"
        :playlist="playlist"
        :playlist-id="id"
        can-add
        can-edit
        can-rearrange
        @rearrange="onPlaylistRearrange"
        @update="dataStore.fetchPlaylists()"
    />
</template>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0

  This component renders classic playlists
  -->

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Template from "./Template.vue";
import { useDataStore } from "../../store/data";

const route = useRoute();
const dataStore = useDataStore();

const id = computed(() => route.params.id as string);

const onPlaylistRearrange = async (oldIndex, newIndex) => {
    await fetch(`/api/playlists/${id.value}/tracks`, {
        method: "PUT",
        body: JSON.stringify({
            songOldIndex: oldIndex,
            songNewIndex: newIndex,
        }),
    });
    await dataStore.fetchPlaylists();
};
</script>

<template>
    <Template :id="id" @rearrange="onPlaylistRearrange" />
</template>

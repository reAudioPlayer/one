<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from "./store/data";
import {
    ISyncableCollection,
    ISyncableOne,
    ISyncablePlaylist,
    ISyncableSong,
importSyncables,
} from "./views/sync/collection";
import { addSongs } from "./api/song";
import {
    createPlaylistWithMetadata,
    updateSmartPlaylistDefinition,
} from "./api/playlist";
import { ISmartPlaylist } from "./common";
import { Notifications } from "./components/notifications/createNotification";

const drophover = ref(false);

const route = useRoute();
const data = useDataStore();

const routeIsPlaylist = computed(() => {
    return route.path.startsWith("/playlist/");
});

const playlist = computed(() => {
    if (!routeIsPlaylist.value) {
        return null;
    }
    const id = route.params.id as string;
    return data.getPlaylistById(id);
});

const canAdd = computed(() => {
    if (!playlist.value) {
        return false;
    }
    return playlist.value.type === "classic";
});

const addFiles = async (files: FileList) => {
    // read all as json
    const promises = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        promises.push(file.text());
    }
    const texts: string[] = await Promise.all(promises);
    const items: ISyncableOne[] = texts.map((x) => JSON.parse(x));
    importSyncables(items);
};

const onDrop = (e) => {
    drophover.value = false;

    if (!canAdd) {
        return;
    }

    const files = e.dataTransfer.files;
    if (files.length) {
        addFiles(files);
    }
};

const onDragleave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
        return;
    }
    drophover.value = false;
};
</script>
<template>
    <div
        class="dropzone"
        :class="{ drophover }"
        @drop.prevent="onDrop"
        @dragenter.prevent
        @dragover.prevent="drophover = true"
        @dragleave.prevent="onDragleave"
    >
        <slot />
    </div>
</template>
<style scoped>
.dropzone * {
    pointer-events: none;
}

.dropzone.drophover::after {
    content: " ";
    display: block;
    text-align: center;
    color: var(--text-muted);
    font-style: italic;
    font-size: 0.8rem;

    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    position: absolute;
    inset: 0;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-right: 1em;

    z-index: 1000;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from "./store/data";
import {
    ISyncableCollection,
    ISyncableOne,
    ISyncablePlaylist,
    ISyncableSong,
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

const addSongsToPlaylist = async (songs: ISyncableSong[]) => {
    if (!songs.length) {
        return;
    }

    if (!playlist.value) {
        Notifications.addError(
            "No playlist selected",
            "Please select open the playlist you want to add songs to",
            3000
        );
        return;
    }

    if (!canAdd.value) {
        Notifications.addError(
            "Can't add songs to this playlist",
            "You can only add songs to classic playlists",
            3000
        );
        return;
    }

    await addSongs(
        playlist.value.id,
        songs.map((x) => x.song)
    );
    Notifications.addSuccess(
        `Added ${songs.length} songs to ${playlist.value.name}`,
        null,
        3000
    );
};

const addPlaylist = async (playlist: ISyncablePlaylist) => {
    const toAdd = playlist.playlist;
    const id = await createPlaylistWithMetadata(
        toAdd.type as any,
        toAdd.name,
        toAdd.description,
        toAdd.cover
    );

    if (toAdd.type === "smart") {
        await updateSmartPlaylistDefinition(
            id,
            (toAdd as ISmartPlaylist).definition
        );
        return;
    }
    await addSongs(id, toAdd.songs);
};

const addPlaylists = async (playlists: ISyncablePlaylist[]) => {
    if (!playlists.length) {
        return;
    }

    for (const playlist of playlists) {
        await addPlaylist(playlist);
    }
    Notifications.addSuccess(`Added ${playlists.length} playlists`, null, 3000);
    data.fetchPlaylists();
};

const addFiles = async (files: FileList) => {
    // read all as json
    const promises = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        promises.push(file.text());
    }
    const texts: string[] = await Promise.all(promises);
    const items: ISyncableOne[] = texts.map((x) => JSON.parse(x));
    const songs = items.filter((x) => x.type === "song") as ISyncableSong[];
    addSongsToPlaylist(songs);
    const playlists = items.filter(
        (x) => x.type === "playlist"
    ) as ISyncablePlaylist[];
    const collections = items.filter(
        (x) => x.type === "collection"
    ) as ISyncableCollection[];
    for (const collection of collections) {
        playlists.push(...collection.collection);
    }
    addPlaylists(playlists);
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

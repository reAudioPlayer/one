<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import { ISong } from "../../common";
import { playInPicture } from "../../api/playerInPicture";
import { useDataStore } from "../../store/data";
import {
    createPlaylistWithMetadata,
    removeSongFromPlaylist,
} from "../../api/playlist";
import {
    addSong as addSongToPlaylist,
    downloadSong,
    removeSongFromCache,
} from "../../api/song";
import { Notifications } from "../notifications/createNotification";
import { asSyncableSong, downloadSyncable } from "../../views/sync/collection";

const dataStore = useDataStore();

const playlists = computed(() => dataStore.playlists);
const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true,
    },
    playlistId: {
        type: String,
        required: false,
        default: "",
    },
});

const emit = defineEmits(["update", "edit"]);

const isAutoPlaylist = computed(() => props.playlistId == -1);
const preview = () => {
    playInPicture(props.song.artist, props.song.title, props.song.source);
};

const addTo = async (playlistId: number) => {
    if (playlistId == -1) return;

    await addSongToPlaylist(playlistId, props.song);
    Notifications.addSuccess(
        props.song.title,
        `Added to ${playlists.value.find((p) => p.id == playlistId)?.name}`,
        3000
    );
    emit("update");
};

const addToNew = async () => {
    const playlistId = await createPlaylistWithMetadata(
        props.song.title,
        props.song.artist,
        props.song.cover
    );
    await addTo(playlistId);
    emit("update");
};

const remove = async () => {
    await removeSongFromPlaylist(props.playlistId, props.song.id);
    emit("update");
};

const box = ref(null);
const contextmenu = ref(null);

const toggle = () => {
    if (contextmenu.value.visible) {
        hide();
    } else {
        show();
    }
};

const hide = () => {
    contextmenu.value.hide();
};

const show = () => {
    const targetDimensions = box.value.getBoundingClientRect();

    const position = {
        top: targetDimensions.height + targetDimensions.top + window.scrollY,
        left: targetDimensions.width + targetDimensions.left + window.scrollX,
    };

    contextmenu.value.show(position);
};

defineExpose({
    show,
    toggle,
    hide,
});

const sources = computed(() => ({
    Soundcloud: `https://soundcloud.com/search?q=${props.song.artist} ${props.song.title}`,
    Audius: `https://audius.co/search/${props.song.artist} ${props.song.title}`,
    "Youtube Music": `https://music.youtube.com/search?q=${props.song.artist} ${props.song.title}`,
    Spotify: `https://open.spotify.com/search/${props.song.artist} ${props.song.title}`,
}));

const editSong = () => {
    emit("edit");
};

const openSource = (source: string) => {
    window.open(sources.value[source]);
    editSong();
};

const exportToFile = () => {
    const syncable = asSyncableSong(props.song);
    downloadSyncable(syncable, `${props.song.artist} - ${props.song.title}`);
};
</script>
<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="preview"> Preview </v-contextmenu-item>
            <v-contextmenu-submenu title="Find source">
                <v-contextmenu-item
                    v-for="name in Object.keys(sources)"
                    :key="name"
                    @click="openSource(name)"
                >
                    {{ name }}
                </v-contextmenu-item>
            </v-contextmenu-submenu>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="$emit('like')">{{
                (song.favourite ? "Remove from" : "Save to") +
                " your Liked Songs"
            }}</v-contextmenu-item>
            <v-contextmenu-item v-if="!isAutoPlaylist" @click="remove">
                Remove from this playlist
            </v-contextmenu-item>
            <v-contextmenu-submenu title="Add to playlist">
                <v-contextmenu-item @click="addToNew"
                    >Add to new playlist</v-contextmenu-item
                >
                <v-contextmenu-divider />
                <v-contextmenu-item
                    v-for="playlist in playlists"
                    :key="playlist.id"
                    @click="addTo(playlist.id)"
                >
                    {{ playlist.name }}
                </v-contextmenu-item>
            </v-contextmenu-submenu>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="editSong">
                Update Metadata
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="downloadSong(song.id)">
                Download
            </v-contextmenu-item>
            <v-contextmenu-item @click="removeSongFromCache(song.id)">
                Uncache
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-submenu title="Export...">
                <v-contextmenu-item @click="exportToFile()">
                    to file
                </v-contextmenu-item>
            </v-contextmenu-submenu>
        </v-contextmenu>
    </div>
</template>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import type { ISong } from "@/common";
import { playInPicture } from "@/api/playerInPicture";
import { useDataStore } from "@/store/data";
import {
    createPlaylistWithMetadata,
    removeSongFromPlaylist,
} from "@/api/playlist";
import {
    addSong as addSongToPlaylist,
    downloadSong,
    removeSongFromCache,
} from "@/api/song";
import { Notifications } from "../notifications/createNotification";
import { asSyncableSong, downloadSyncable } from "@/views/sync/collection";
import { insertLast, insertNext, insertNow } from "@/api/player";

const dataStore = useDataStore();

const playlists = computed(() =>
    dataStore.playlists.filter((x) => x.type === "classic")
);
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

const preview = () => {
    playInPicture(props.song.artist, props.song.title, props.song.source);
};

const isAutoPlaylist = computed(() => {
    return (
        dataStore.playlists.find((x) => x.id === props.playlistId)?.type !==
        "classic"
    );
});

const addTo = async (playlistId: string) => {
    await addSongToPlaylist(playlistId, props.song as any);
    Notifications.addSuccess(
        props.song.title,
        `Added to ${playlists.value.find((p) => p.id == playlistId)?.name}`,
        3000,
        undefined,
        playlists.value.find((p) => p.id == playlistId)?.href
    );
    emit("update");
};

const addToNew = async () => {
    const playlistId = await createPlaylistWithMetadata(
        "classic",
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
            <v-contextmenu-item @click="preview">
                <span class="material-symbols-rounded">preview</span>
                Preview
            </v-contextmenu-item>
            <v-contextmenu-item>
                <span class="material-symbols-rounded">search</span>
                <v-contextmenu-submenu title="Find source">
                    <v-contextmenu-item
                        v-for="name in Object.keys(sources)"
                        :key="name"
                        @click="openSource(name)"
                    >
                        {{ name }}
                    </v-contextmenu-item>
                </v-contextmenu-submenu>
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item>
                <span class="material-symbols-rounded">queue_music</span>
                <v-contextmenu-submenu title="Add to queue">
                    <v-contextmenu-item @click="() => insertNow(props.song.id)">
                        <span class="material-symbols-rounded">
                            play_arrow
                        </span>
                        Play Now
                    </v-contextmenu-item>
                    <v-contextmenu-item
                        @click="() => insertNext(props.song.id)"
                    >
                        <span class="material-symbols-rounded">
                            add_to_queue
                        </span>
                        Play Next
                    </v-contextmenu-item>
                    <v-contextmenu-item
                        @click="() => insertLast(props.song.id)"
                    >
                        <span class="material-symbols-rounded">
                            queue_play_next
                        </span>
                        Play Last
                    </v-contextmenu-item>
                </v-contextmenu-submenu>
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-context-menu-divider />
            <v-contextmenu-item v-if="!isAutoPlaylist" @click="remove">
                <span class="material-symbols-rounded">delete</span>
                Remove from this playlist
            </v-contextmenu-item>
            <v-contextmenu-item>
                <span class="material-symbols-rounded">playlist_add</span>
                <v-contextmenu-submenu title="Add to playlist">
                    <v-contextmenu-item @click="addToNew">
                        Add to new playlist
                    </v-contextmenu-item>
                    <v-contextmenu-divider />
                    <v-contextmenu-item
                        v-for="playlist in playlists"
                        :key="playlist.id"
                        @click="addTo(playlist.id)"
                    >
                        {{ playlist.name }}
                    </v-contextmenu-item>
                </v-contextmenu-submenu>
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="editSong">
                <span class="material-symbols-rounded">edit</span>
                Edit
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="downloadSong(song.id)">
                <span class="material-symbols-rounded">file_download</span>
                Download
            </v-contextmenu-item>
            <v-contextmenu-item @click="removeSongFromCache(song.id)">
                <span class="material-symbols-rounded">replay</span>
                Uncache
            </v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item>
                <span class="material-symbols-rounded">share</span>
                <v-contextmenu-submenu title="Export...">
                    <v-contextmenu-item @click="exportToFile()">
                        to file
                    </v-contextmenu-item>
                </v-contextmenu-submenu>
            </v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>

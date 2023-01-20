<script lang="ts" setup>
import {computed, PropType, ref} from "vue";
import {ISong} from "../../common";
import {playInPicture} from "../../api/playerInPicture";
import {useDataStore} from "../../store/data";
import {createPlaylistWithMetadata, removeSongFromPlaylist} from "../../api/playlist";
import {addSong as addSongToPlaylist, downloadSong} from "../../api/song";

const dataStore = useDataStore();

const playlists = computed(() => dataStore.playlists);
const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true
    },
    playlistId: {
        type: Number,
        required: false,
        default: -1
    }
});

const emit = defineEmits(["update"]);

const isAutoPlaylist = computed(() => props.playlistId == -1);
const preview = () => {
    playInPicture(props.song.artist, props.song.title, props.song.src || props.song.source);
};

const addTo = async (playlistId: number) => {
    if (playlistId == -1) return;

    await addSongToPlaylist(playlistId, props.song);
};

const addToNew = async () => {
    const playlistId = await createPlaylistWithMetadata(props.song.title, props.song.artist, props.song.cover);
    addTo(playlistId);
}

const remove = async () => {
    await removeSongFromPlaylist(props.playlistId, props.song.id);
    emit("update");
}

const box = ref(null);
const contextmenu = ref(null);

const toggle = () => {
    if (contextmenu.value.visible) {
        hide();
    } else {
        show();
    }
}

const hide = () => {
    contextmenu.value.hide();
}

const show = () => {
    const targetDimensions = box.value.getBoundingClientRect();

    const position = {
        top: targetDimensions.height +
            targetDimensions.top +
            window.scrollY,
        left: targetDimensions.width +
            targetDimensions.left +
            window.scrollX,
    };

    contextmenu.value.show(position);
}

defineExpose({
    show, toggle, hide
});
</script>
<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="preview">Preview</v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="$emit('like')">{{(song.favourite ? 'Remove from' : 'Save to') + ' your Liked Songs'}}</v-contextmenu-item>
            <v-contextmenu-item
                v-if="!isAutoPlaylist"
                @click="remove"
            >
                Remove from this playlist
            </v-contextmenu-item>
            <v-contextmenu-submenu title="Add to playlist">
                <v-contextmenu-item @click="addToNew">Add to new playlist</v-contextmenu-item>
                <v-contextmenu-divider />
                <v-contextmenu-item
                    v-for="(element, index) in playlists"
                    :key="index"
                    @click="addTo(index)"
                >
                    {{element.name}}
                </v-contextmenu-item>
            </v-contextmenu-submenu>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="$emit('edit')">Update Metadata</v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="downloadSong(song.id)">Download</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>
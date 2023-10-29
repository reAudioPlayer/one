<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from "vue";
import { IFullPlaylist } from "../../common";
import { deletePlaylist } from "../../api/playlist";
import { useRouter } from "vue-router";
import { useDataStore } from "../../store/data";
import {
    asSyncablePlaylist,
    downloadSyncable,
} from "../../views/sync/collection";

const props = defineProps({
    playlist: {
        type: Object as PropType<IFullPlaylist>,
        required: true,
    },
    canEdit: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const data = useDataStore();
const router = useRouter();
const box = ref(null);
const contextmenu = ref(null);

const toggle = (e: MouseEvent = null) => {
    if (contextmenu.value.visible) {
        hide();
    } else {
        show(e);
    }
};

const hide = () => {
    contextmenu.value.hide();
};

const show = (e: MouseEvent = null) => {
    const targetDimensions = box.value.getBoundingClientRect();

    if (e) {
        contextmenu.value.show({
            top: e.clientY,
            left: e.clientX,
        });
        console.log("show", contextmenu.value.visible);
        return;
    }

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

const edit = () => {
    router.push(`/playlist/${props.playlist.id}/edit`);
};

const deleteMe = async () => {
    await deletePlaylist(props.playlist.id);
    await data.fetchPlaylists();
    router.push("/");
};

const downloadFile = async () => {
    const syncable = await asSyncablePlaylist(props.playlist);
    downloadSyncable(syncable, props.playlist.name);
};

onMounted(() => {
    document.addEventListener("click", hide);
});
</script>
<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item v-if="canEdit" @click="edit">
                Edit
            </v-contextmenu-item>
            <v-contextmenu-item @click="deleteMe"> Delete </v-contextmenu-item>
            <v-contextmenu-submenu title="Export">
                <v-contextmenu-item @click="downloadFile">
                    to file
                </v-contextmenu-item>
            </v-contextmenu-submenu>
        </v-contextmenu>
    </div>
</template>

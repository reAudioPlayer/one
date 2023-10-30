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
import gistClient from "../../api/gistClient";
import Markdown from "../popups/Markdown.vue";
import Confirmation from "../popups/Confirmation.vue";

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
const shareUrl = ref("");
const markdownRef = ref<typeof Markdown>(null);
const confirmation = ref<typeof Confirmation>(null);
const popupTitle = ref("");
const popupContent = ref("");

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

const uploadFileToGists = async () => {
    const syncable = await asSyncablePlaylist(props.playlist);
    const name = `${props.playlist.name}.one.playlist`;
    const jdata = await gistClient.save(
        {[name]: syncable},
        props.playlist.name,
        true);
    const file = jdata.files[name];
    const rawUrl = file.raw_url;
    // "https://gist.githubusercontent.com/{user}/{gist}/raw/{file}/{filename}"
    // gist:{user}:{gist}:{filename}
    const gistId = jdata.id;
    const user = jdata.owner.login;
    const sha = rawUrl.split("/raw/")[1].split("/")[0];
    const gistUrl = `gist:${user}:${gistId}:${sha}`;
    const base64 = btoa(gistUrl);
    shareUrl.value = `http://localhost:1234/import/${base64}`;
    popupContent.value = `Share this URL to import this playlist on another device: [${shareUrl.value}](${shareUrl.value})`;
    popupTitle.value = "Share " + props.playlist.name;
    markdownRef.value.show();
}

onMounted(() => {
    document.addEventListener("click", hide);
});
</script>
<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <Markdown
            ref="markdownRef"
            :title="popupTitle"
            :content="popupContent"
            @close="hide"
        />
        <Confirmation
            ref="confirmation"
            title="Delete Playlist"
            question="Are you sure you want to delete this playlist?"
            @yes="deleteMe"
            @no="hide"
            close-on-no
        />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item v-if="canEdit" @click="edit">
                Edit
            </v-contextmenu-item>
            <v-contextmenu-item @click="confirmation.show()"> Delete </v-contextmenu-item>
            <v-contextmenu-submenu title="Export">
                <v-contextmenu-item @click="downloadFile">
                    to file
                </v-contextmenu-item>
                <v-contextmenu-item @click="uploadFileToGists">
                    to GitHub Gists
                </v-contextmenu-item>
            </v-contextmenu-submenu>
        </v-contextmenu>
    </div>
</template>

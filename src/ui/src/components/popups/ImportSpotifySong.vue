<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import TrackInfo from "./components/TrackInfo.vue";

import { PropType, Ref, ref } from "vue";
import { ISong, ISpotifySong, openInNewTab } from "../../common";
import { useDataStore } from "../../store/data";
import { addSong as addSongToPlaylist } from "../../api/song";
import { createPlaylistWithMetadata } from "../../api/playlist";
import { Notifications } from "../notifications/createNotification";

const data = useDataStore();

const props = defineProps({
    song: {
        type: Object as PropType<ISpotifySong>,
        required: true
    }
})

const options = ref([{
    name: "playlist",
    type: "dropdown",
    icon: "playlist_add",
    required: true,
    value: null,
    options: data.playlistsAsDropdown
}]);


const modal = ref(null);
const form = ref(null);
const track: Ref<ISong> = ref(null);

const show = async () => {
    if (track.value) {
        modal.value.show();
        return;
    }

    const res = await modal.value.fetch("/api/browse/track", {
        method: "POST",
        body: JSON.stringify({
            url: props.song.href
        })
    });

    if (!res) return;

    modal.value.load();

    track.value = await res.json();
    modal.value.show();
}

const preview = () => {
    const event = new CustomEvent('player.play', { detail: {
            artist: props.song.artist,
            title: props.song.title,
            source: props.song.href
        } });
    window.dispatchEvent(event);
}

const createPlaylist = async (playlistId: string): Promise<string> => {
    if (playlistId === "new") {
        const newPlaylist = await createPlaylistWithMetadata(props.song.title, props.song.artist, props.song.cover);
        options.value[0].options = data.playlistsAsDropdown;
        options.value[0].value = newPlaylist;
        return newPlaylist;
    }
    return playlistId;
}

const addSong = async (index: number, playlistId: string = null) => {
    playlistId ??= form.value.toObject().playlist;

    console.log(playlistId);

    playlistId = await createPlaylist(playlistId);

    await addSongToPlaylist(
        playlistId,
        track.value);
    props.song.added = true;
    Notifications.addSuccess(track.value.title,
        `Added to ${data.playlists.find(p => p.id == playlistId)?.name}`,
        3000);
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        :submit="{
            label: 'Add',
            icon: 'add',
        }"
        name="Import Song"
        @close="$emit('close')"
        @submit="addSong"
    >
        <TrackInfo
            :cover = "song.cover"
            :icons="[{
                name: 'share',
                onClick: () => openInNewTab(song.href)
            }, {
                name: 'play_arrow',
                onClick: preview
            }]"
            :title = "song.title"
        />
        <Form
            ref="form"
            :options="options"
        />
    </Template>
</template>

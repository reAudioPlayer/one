<script setup lang="ts">
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import Playlist from "./components/Playlist.vue";
import TrackInfo from "./components/TrackInfo.vue";

import {PropType, Ref, ref} from "vue";
import {ISpotifyPlaylist, ISpotifySong, openInNewTab} from "../../common";
import {useDataStore} from "../../store/data";
import {addSong as addSongToPlaylist} from "../../api/song";

const data = useDataStore();

const props = defineProps({
    playlist: {
        type: Object as PropType<ISpotifyPlaylist>,
        required: true
    }
})

const options = [{
    name: "playlist",
    type: "dropdown",
    required: true,
    value: null,
    options: data.playlists.map(x => ({label: x.name, value: x.id}))
}];


const modal = ref(null);
const form = ref(null);
const songs: Ref<ISpotifySong[]> = ref([]);

const show = async () => {
    modal.value.load();
    if (songs.value.length == 0) {
        const res = await fetch(`/api/spotify/playlists/${props.playlist.id}`)
        songs.value = await res.json()
    }
    modal.value.show();
}

const preview = () => {
    console.log(props.playlist);
    const event = new CustomEvent('player.play', { detail: {
        artist: "Spotify Playlist",
        title: props.playlist.name,
        source: props.playlist.href
    } });
    window.dispatchEvent(event);
}

const addSong = async (index: number) => {
    if (songs.value[index].added) return;
    await addSongToPlaylist(form.value.toObject().playlist, songs.value[index]);
    songs.value[index].added = true;
}

const addAll = () => {
    songs.value.forEach((_, index) => {
        addSong(index);
    })
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        name="Import Playlist"
        submitName="Add All"
        @submit="addAll"
        @close="$emit('close')"
    >
        <TrackInfo
            :title = "playlist.name"
            :cover = "playlist.cover"
            :icons="[{
                name: 'share',
                onClick: () => openInNewTab(playlist.href)
            }, {
                name: 'play_arrow',
                onClick: preview
            }]"
        />
        <Form
            ref="form"
            :options="options"
        />
        <br>
        <Playlist
            :songs="songs"
            @add="addSong"
        />
    </Template>
</template>

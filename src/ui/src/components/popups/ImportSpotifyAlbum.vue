<script setup lang="ts">
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import Playlist from "./components/Playlist.vue";
import TrackInfo from "./components/TrackInfo.vue";

import {PropType, Ref, ref} from "vue";
import {ISong, ISpotifyAlbum, ISpotifySong, openInNewTab} from "../../common";
import {useDataStore} from "../../store/data";
import {addSong as addSongToPlaylist} from "../../api/song";
import {createPlaylistWithMetadata} from "../../api/playlist";

const data = useDataStore();

const props = defineProps({
    album: {
        type: Object as PropType<ISpotifyAlbum>,
        required: true
    }
})

const options = ref([{
    name: "playlist",
    type: "dropdown",
    required: true,
    value: null,
    options: data.playlistsAsDropdown
}]);


const modal = ref(null);
const form = ref(null);
const songs: Ref<ISpotifySong[]> = ref([]);

const show = async () => {
    modal.value.load();
    if (songs.value.length == 0) {
        const res = await fetch(`/api/spotify/albums/${props.album.id}`)
        songs.value = await res.json()
    }
    modal.value.show();
}

const preview = () => {
    const event = new CustomEvent('player.play', { detail: {
        artist: props.album.artist,
        title: props.album.title,
        source: props.album.href
    } });
    window.dispatchEvent(event);
}

const createPlaylist = async (playlistId: string | number): Promise<number> => {
    if (playlistId === "new") {
        const newPlaylist = await createPlaylistWithMetadata(props.album.title, `${props.album.releaseDate}, ${props.album.artist}`, props.album.cover);
        options.value[0].options = data.playlistsAsDropdown;
        options.value[0].value = newPlaylist;
        return newPlaylist;
    }
    return Number(playlistId);
}

const addSong = async (index: number, playlistId: number = null) => {
    if (songs.value[index].added) return;

    playlistId ??= form.value.toObject().playlist;

    playlistId = await createPlaylist(playlistId);

    await addSongToPlaylist(
        playlistId ?? form.value.toObject().playlist,
        songs.value[index]);
    songs.value[index].added = true;
}

const addAll = async () => {
    let playlistId = form.value.toObject().playlist;

    playlistId = await createPlaylist(playlistId);

    songs.value.forEach((_, index) => {
        addSong(index, playlistId);
    })
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        name="Import Album"
        submitName="Add All"
        @submit="addAll"
        @close="$emit('close')"
    >
        <TrackInfo
            :title = "album.title"
            :subtitle = "album.artist"
            :cover = "album.cover"
            :icons="[{
                name: 'share',
                onClick: () => openInNewTab(album.href)
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
            noCover
        />
    </Template>
</template>

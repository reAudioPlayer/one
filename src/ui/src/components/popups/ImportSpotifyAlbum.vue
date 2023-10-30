<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import Playlist from "./components/Playlist.vue";
import TrackInfo from "./components/TrackInfo.vue";

import { PropType, Ref, ref } from "vue";
import { ISpotifyAlbum, ISpotifySong, openInNewTab } from "../../common";
import { useDataStore } from "../../store/data";
import { addSong as addSongToPlaylist } from "../../api/song";
import { createPlaylistWithMetadata } from "../../api/playlist";
import { Notifications } from "../notifications/createNotification";

const data = useDataStore();

const props = defineProps({
    album: {
        type: Object as PropType<ISpotifyAlbum>,
        required: true,
    },
});

const options = ref([
    {
        name: "playlist",
        type: "dropdown",
        icon: "playlist_add",
        required: true,
        value: null,
        options: data.playlistsAsDropdown,
    },
]);

const modal = ref(null);
const form = ref(null);
const songs: Ref<ISpotifySong[]> = ref([]);

const show = async () => {
    if (songs.value.length > 0) {
        modal.value.show();
        return;
    }

    const res = await modal.value.fetch(
        `/api/spotify/albums/${props.album.id}`
    );

    if (!res) return;

    songs.value = await res.json();
};

const preview = () => {
    const event = new CustomEvent("player.play", {
        detail: {
            artist: props.album.artist,
            title: props.album.title,
            source: props.album.href,
        },
    });
    window.dispatchEvent(event);
};

const createPlaylist = async (playlistId: string) => {
    if (playlistId === "new") {
        const newPlaylist = await createPlaylistWithMetadata(
            "classic",
            props.album.title,
            `${props.album.releaseDate}, ${props.album.artist}`,
            props.album.cover
        );
        options.value[0].options = data.playlistsAsDropdown;
        options.value[0].value = newPlaylist;
        return newPlaylist;
    }
    return playlistId;
};

const addSong = async (index: number, playlistId: string = null) => {
    if (songs.value[index].added) return;

    playlistId ??= form.value.toObject().playlist;

    playlistId = await createPlaylist(playlistId);

    await addSongToPlaylist(
        playlistId,
        songs.value[index]
    );
    songs.value[index].added = true;
};

const addAll = async () => {
    let playlistId = form.value.toObject().playlist;

    playlistId = await createPlaylist(playlistId);

    songs.value.forEach((_, index) => {
        addSong(index, playlistId);
    });

    Notifications.addSuccess(
        props.album.title,
        `Added ${songs.value.length} songs to ${data.playlists[playlistId].name}`,
        3000
    );
};

defineExpose({
    show,
});
</script>
<template>
    <Template
        ref="modal"
        :submit="{
            label: 'Add All',
            icon: 'add',
        }"
        name="Import Album"
        @close="$emit('close')"
        @submit="addAll"
    >
        <TrackInfo
            :cover="album.cover"
            :icons="[
                {
                    name: 'share',
                    onClick: () => openInNewTab(album.href),
                },
                {
                    name: 'play_arrow',
                    onClick: preview,
                },
            ]"
            :subtitle="album.artist"
            :title="album.title"
        />
        <Form ref="form" :options="options" />
        <br />
        <Playlist :songs="songs" noCover @add="addSong" />
    </Template>
</template>

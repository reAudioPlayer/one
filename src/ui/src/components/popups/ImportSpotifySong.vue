<script setup lang="ts">
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import TrackInfo from "./components/TrackInfo.vue";

import {PropType, Ref, ref} from "vue";
import {ISong, ISpotifySong, openInNewTab} from "../../common";
import {useDataStore} from "../../store/data";
import {addSong as addSongToPlaylist} from "../../api/song";

const data = useDataStore();

const props = defineProps({
    song: {
        type: Object as PropType<ISpotifySong>,
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
const track: Ref<ISong> = ref(null);

const show = async () => {
    modal.value.load();
    if (!track.value) {
        const res = await fetch("/api/browse/track", {
            method: "POST",
            body: JSON.stringify({
                url: props.song.href
            })
        })
        track.value = await res.json()
    }
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

const addSong = async () => {
    if (props.song.added) return;
    await addSongToPlaylist(form.value.toObject().playlist, track.value);
    props.song.added = true;
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        name="Import Song"
        submitName="Add"
        @submit="addSong"
        @close="$emit('close')"
    >
        <TrackInfo
            :title = "song.title"
            :cover = "song.cover"
            :icons="[{
                name: 'share',
                onClick: () => openInNewTab(song.href)
            }, {
                name: 'play_arrow',
                onClick: preview
            }]"
        />
        <Form
            ref="form"
            :options="options"
        />
    </Template>
</template>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import { ref } from "vue";
import { hashTrack, isLink, ISong, unhashPlaylist } from "../../common";
import { addSong, fetchMetadata } from "../../api/song";
import { useRoute } from "vue-router";

const route = useRoute();

const song: ISong = {
    title: "",
    artist: "",
    album: "",
    cover: "",
    source: ""
}

const upload = async (endpoint: string, file: File) => {
    const id = hashTrack(String(new Date().getTime()));

    const data = new FormData()
    const ext = "." + file.name.split('.').pop();

    var blob = file.slice(0, file.size, file.type);
    var newFile = new File([blob], id + ext, {type: file.type});

    data.append('file', newFile);

    const res = await fetch(endpoint, {
        method: 'POST',
        body: data
    });
    return await res.text();
}

const options = ref([{
    name: "source",
    type: "upload",
    accept: "audio/mp3",
    required: true,
    onUpload: (file: File) => {
        upload('/api/config/tracks', file).then(url => options.value.find(x => x.name == "source").value = url);
    },
    onChange: async (src: string) => {
        const metadata = await fetchMetadata(src);
        options.value.find(x => x.name === "title").value = metadata.title;
        options.value.find(x => x.name === "artist").value = metadata.artist;
        options.value.find(x => x.name === "album").value = metadata.album;
        options.value.find(x => x.name === "cover").value = metadata.cover;
        options.value.find(x => x.name === "source").value = metadata.source;
    },
    value: song.source
}, {
    name: "title",
    type: "text",
    icon: "title",
    required: true,
    value: song.title
}, {
    name: "artist",
    type: "text",
    icon: "person",
    required: true,
    value: song.artist
}, {
    name: "album",
    type: "text",
    icon: "album",
    value: song.album
}, {
    name: "cover",
    type: "upload",
    accept: "image/*",
    imagePreview: true,
    value: song.cover,
    onUpload: (file: File) => {
        upload('/api/config/images', file).then(url => options.value.find(x => x.name == "cover").value = url);
    }
}]);


const modal = ref(null);
const form = ref(null);

const show = async () => {
    modal.value.show();

    // if clipboard has a link, add it to options
    if (!navigator.clipboard) return;
    const text = await navigator.clipboard.readText();
    if (!isLink(text)) return;

    const option = options.value.find(x => x.name === "source");
    option.value = text;
    // @ts-ignore
    option.onChange(text);
}

const onSubmit = async _ => {
    const id = Number(unhashPlaylist(String(route.params.hash)));
    await addSong(id, form.value.toObject());
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
            icon: 'add'
        }"
        name="Add Song"
        @close="$emit('close')"
        @submit="onSubmit"
    >
        <Form
            ref="form"
            :options="options"
        />
    </Template>
</template>

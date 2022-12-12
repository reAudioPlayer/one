<script setup lang="ts">
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import {ref} from "vue";
import {hashTrack, ISong, unhashPlaylist} from "../../common";
import {addSong, fetchMetadata} from "../../api/song";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();

const song: ISong = {
    title: "",
    artist: "",
    album: "",
    cover: "",
    src: ""
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
    name: "src",
    type: "upload",
    accept: "audio/mp3",
    required: true,
    onUpload: (file: File) => {
        upload('/api/config/tracks', file).then(url => song.src = url);
    },
    onChange: async (src: string) => {
        const metadata = await fetchMetadata(src);
        options.value.find(x => x.name === "title").value = metadata.title;
        options.value.find(x => x.name === "artist").value = metadata.artist;
        options.value.find(x => x.name === "album").value = metadata.album;
        options.value.find(x => x.name === "cover").value = metadata.cover;
        options.value.find(x => x.name === "src").value = metadata.src;
    },
    value: song.src
}, {
    name: "title",
    type: "text",
    required: true,
    value: song.title
}, {
    name: "artist",
    type: "text",
    required: true,
    value: song.artist
}, {
    name: "album",
    type: "text",
    value: song.album
}, {
    name: "cover",
    type: "upload",
    accept: "image/*",
    imagePreview: true,
    value: song.cover,
    onUpload: (file: File) => {
        upload('/api/config/images', file).then(url => song.cover = url);
    }
}]);


const modal = ref(null);
const form = ref(null);

const show = () => {
    modal.value.show();
}

const onSubmit = async _ => {
    const id = Number(unhashPlaylist(String(route.params.id)));
    await addSong(id, form.value.toObject());
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        name="Add Song"
        submitName="Save"
        @submit="onSubmit"
        @close="$emit('close')"
    >
        <Form
            ref="form"
            :options="options"
        />
    </Template>
</template>

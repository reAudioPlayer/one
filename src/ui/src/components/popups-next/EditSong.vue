<script setup lang="ts">
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import {PropType, ref} from "vue";
import {ISong} from "../../common";
import {updateSong} from "../../api/song";

const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true
    }
})

const upload = async (endpoint: string, file: File) => {
    const data = new FormData()
    const ext = "." + file.name.split('.').pop();

    var blob = file.slice(0, file.size, file.type);
    var newFile = new File([blob], props.song.id + ext, {type: file.type});

    data.append('file', newFile);

    const res = await fetch(endpoint, {
        method: 'POST',
        body: data
    });
    return await res.text();
}

const options = [{
    name: "src",
    type: "upload",
    accept: "audio/mp3",
    required: true,
    onUpload: (file: File) => {
        upload('/api/config/tracks', file).then(url => props.song.src = url);
    },
    value: props.song.src
}, {
    name: "title",
    type: "text",
    required: true,
    value: props.song.title
}, {
    name: "artist",
    type: "text",
    required: true,
    value: props.song.artist
}, {
    name: "album",
    type: "text",
    value: props.song.album
}, {
    name: "cover",
    type: "upload",
    accept: "image/*",
    imagePreview: true,
    value: props.song.cover,
    onUpload: (file: File) => {
        upload('/api/config/images', file).then(url => props.song.cover = url);
    }
}];

const onSubmit = async () => {
    await updateSong({
        ...props.song,
        ...form.value.toObject()
    });
}

const modal = ref(null);
const form = ref(null);

const show = () => {
    modal.value.show();
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        name="Edit Song"
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

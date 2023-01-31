<script lang="ts" setup>
import Template from "./components/Template.vue";
import Form from "./components/Form.vue";
import {PropType, ref, watch} from "vue";
import {IPlaylist} from "../../common";
import {deletePlaylist, updatePlaylistMetadata} from "../../api/playlist";
import {useRouter} from "vue-router";

const props = defineProps({
    playlist: {
        type: Object as PropType<IPlaylist>,
        required: true
    }
})

const upload = async (endpoint: string, file: File) => {
    const data = new FormData()
    const ext = "." + file.name.split('.').pop();

    var blob = file.slice(0, file.size, file.type);
    var newFile = new File([blob], props.playlist.name + ext, {type: file.type});

    data.append('file', newFile);

    const res = await fetch(endpoint, {
        method: 'POST',
        body: data
    });
    return await res.text();
}

watch(() => props.playlist, (newSong) => {
    options.value.find(x => x.name == "name").value = newSong.name;
    options.value.find(x => x.name == "description").value = newSong.description;
    options.value.find(x => x.name == "cover").value = newSong.cover;
}, {
    deep: true
})

const options = ref([{
    name: "name",
    type: "text",
    icon: "title",
    required: true,
    value: props.playlist.name
}, {
    name: "description",
    type: "text",
    icon: "description",
    required: true,
    value: props.playlist.description
}, {
    name: "cover",
    type: "upload",
    icon: "image",
    accept: "image/*",
    imagePreview: true,
    value: props.playlist.cover,
    onUpload: (file: File) => {
        upload('/api/config/images', file).then(url => props.playlist.cover = url);
    }
}]);


const modal = ref(null);
const form = ref(null);

const router = useRouter();

const show = () => {
    modal.value.show();
}

const onSubmit = async () => {
    await updatePlaylistMetadata({
        ...props.playlist,
        ...form.value.toObject()
    });
}

const onDelete = async () => {
    await deletePlaylist(props.playlist.id);
    await router.push("/collection/playlists");
}

defineExpose({
    show
})
</script>
<template>
    <Template
        ref="modal"
        :secondary="{
            label: 'Delete',
            icon: 'delete',
            type: 'danger'
        }"
        :submit="{
            label: 'Save',
            icon: 'save'
        }"
        name="Edit Playlist"
        @close="$emit('close')"
        @secondary="onDelete"
        @submit="onSubmit"
    >
        <Form
            ref="form"
            :options="options"
        />
    </Template>
</template>

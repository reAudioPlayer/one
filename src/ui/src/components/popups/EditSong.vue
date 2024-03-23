<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Template from "./components/Template.vue";
import Form, { IOption } from "./components/Form.vue";
import { PropType, ref, watch } from "vue";
import { ISong } from "../../common";
import { updateSong } from "../../api/song";
import { Notifications } from "../notifications/createNotification";

const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true,
    },
});

const emit = defineEmits(["close", "update"]);

const upload = async (endpoint: string, file: File) => {
    const data = new FormData();
    const ext = "." + file.name.split(".").pop();

    var blob = file.slice(0, file.size, file.type);
    var newFile = new File([blob], props.song.id + ext, { type: file.type });

    data.append("file", newFile);

    const res = await fetch(endpoint, {
        method: "POST",
        body: data,
    });
    return await res.text();
};

const options = ref<IOption[]>([
    {
        name: "source",
        type: "upload",
        icon: "music_note",
        accept: "audio/mp3",
        required: true,
        onUpload: (file: File) => {
            upload("/api/config/tracks", file).then(
                (url) =>
                    (options.value.find((x) => x.name == "source").value = url)
            );
        },
        value: props.song.source,
    },
    {
        name: "title",
        type: "text",
        icon: "title",
        required: true,
        value: props.song.title,
    },
    {
        name: "artist",
        type: "text",
        icon: "person",
        required: true,
        value: props.song.artist,
    },
    {
        name: "album",
        type: "text",
        icon: "album",
        value: props.song.album.name,
    },
    {
        name: "cover",
        type: "upload",
        icon: "art_track",
        accept: "image/*",
        imagePreview: true,
        value: props.song.cover,
        onUpload: (file: File) => {
            upload("/api/config/images", file).then(
                (url) =>
                    (options.value.find((x) => x.name == "cover").value = url)
            );
        },
    },
]);

const onSubmit = async () => {
    const values = form.value.toObject();
    await updateSong({
        ...props.song,
        ...values,
    });
    emit("update");
    Notifications.addSuccess(values.title, "Updated", 3000);
};

const modal = ref(null);
const form = ref(null);

const show = () => {
    modal.value.show();
};

defineExpose({
    show,
});

watch(
    props,
    () => {
        for (const option of options.value.map((x) => x.name)) {
            if (option == "album") {
                options.value.find((x) => x.name == option).value =
                    props.song?.album?.name;
                continue;
            }

            options.value.find((x) => x.name == option).value =
                props.song?.[option];
        }
    },
    { deep: true }
);
</script>
<template>
    <Template
        ref="modal"
        :submit="{
            label: 'Save',
            icon: 'save',
        }"
        name="Edit Song"
        @close="$emit('close')"
        @submit="onSubmit"
    >
        <Form ref="form" :options="options" />
    </Template>
</template>

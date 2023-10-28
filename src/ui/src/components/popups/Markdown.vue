<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Template from "./components/Template.vue";
import { ref } from "vue";
import MarkdownIt from "markdown-it";

defineProps({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["close", "update"]);

const modal = ref(null);

const md = new MarkdownIt();

const show = () => {
    modal.value.show();
};

defineExpose({
    show,
});
</script>
<template>
    <Template ref="modal" :name="title" @close="$emit('close')">
        <div v-html="md.render(content)" />
    </Template>
</template>

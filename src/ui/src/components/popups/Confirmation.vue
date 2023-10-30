<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Template from "./components/Template.vue";
import IconButton from "../inputs/IconButton.vue";
import { ref } from "vue";
import MarkdownIt from "markdown-it";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    closeOnNo: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const emit = defineEmits(["close", "update", "yes", "no"]);

const modal = ref(null);

const md = new MarkdownIt();

const show = () => {
    modal.value.show();
};

defineExpose({
    show,
});

const onNoClick = () => {
    if (props.closeOnNo) {
        modal.value.hide();
    }
    emit("no");
};
</script>
<template>
    <Template ref="modal" :name="title" @close="$emit('close')">
        <div class="overflow-hidden" v-html="md.render(question)" />
        <div class="buttons w-full justify-end flex gap-2">
            <IconButton
                type="success"
                icon="check"
                label="Yes"
                @click="$emit('yes')"
            />
            <IconButton
                type="danger"
                icon="close"
                label="No"
                @click="onNoClick"
            />
        </div>
    </Template>
</template>

<style>
.modal p {
    text-overflow: ellipsis;
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, PropType, ref, watch } from "vue";
import { generatePlaceholder, getCover } from "./placeholder";
import { parseAnyCover } from "../../common";

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    type: {
        type: String as PropType<"track" | "playlist">,
        required: false,
        default: "track"
    },
    placeholder: {
        type: String,
        required: false,
    }
});

const placeholderIcon = computed(() => {
    if (props.placeholder) {
        return props.placeholder;
    }
    return props.type === "track" ? "music_note" : "queue_music";
});

const imgSrc = ref(null);

const onError = async () => {
    imgSrc.value = await generatePlaceholder(placeholderIcon.value);

    if (!imgSrc.value) {
        setTimeout(() => {
            onError();
        }, 100);
        return;
    }
}

const updateSrc = () => {
    imgSrc.value = parseAnyCover(props.src, props.type);

    if (!imgSrc.value) {
        onError();
    }
}

watch(() => props.src, updateSrc);
updateSrc();
</script>
<template>
    <img
        :alt="props.type"
        :src="getCover(imgSrc, placeholderIcon)"
        class="cover"
        @error="onError"
    />
</template>

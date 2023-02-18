<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, PropType, ref, watch } from "vue";
import { generatePlaceholder, getCover } from "./placeholder";

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

const src = ref(props.src);

watch(() => props.src, () => {
    src.value = props.src;
});

const onError = async () => {
    src.value = await generatePlaceholder(placeholderIcon.value);

    if (src.value === undefined) {
        setTimeout(() => {
            onError();
        }, 100);
        return;
    }
}
</script>
<template>
    <img
        :alt="props.type"
        :src="getCover(src, placeholderIcon)"
        class="cover"
        @error="onError"
    />
</template>

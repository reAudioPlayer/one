<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, PropType, ref, watch } from "vue";
import { parseAnyCover } from "../../common";
import Placeholder from "./Placeholder.vue";

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

const realSrc = computed(() => {
    if (src.value) {
        return parseAnyCover(src.value);
    }
    return null;
});

watch(() => props.src, () => {
    src.value = props.src;
});
</script>
<template>
    <img
        v-if="realSrc"
        :alt="props.type"
        :src="realSrc"
        class="cover"
        @error="src = null"
    />
    <Placeholder
        v-else
        :icon="placeholderIcon"
        class="cover"
    />
</template>

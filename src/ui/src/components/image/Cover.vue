<script setup lang="ts">
import {computed, PropType, ref, watch} from "vue";
import {parseAnyCover, parseCover, parsePlaylistCover} from "../../common";

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
});

const src = ref(props.src);
watch(() => props.src, () => {
    src.value = props.src;
});
</script>
<template>
    <img
        :src="parseAnyCover(src, type)"
        :alt="props.type"
        class="cover"
        @error="src = null"
    />
</template>

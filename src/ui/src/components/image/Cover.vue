<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType, computed, onMounted, ref, watch } from "vue";
import { generatePlaceholder, getCover } from "./placeholder";
import { parseAnyCover } from "../../common";
import { applyBoxShadow } from "../../helpers/accent";
import window from "@/themes";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    type: {
        type: String as PropType<"track" | "playlist" | "artist" | "album">,
        required: false,
        default: "track",
    },
    placeholder: {
        type: String,
        required: false,
    },
    withAmbient: {
        type: Boolean,
        required: false,
        default: false,
    },
    ambientOpacity: {
        type: Number,
        required: false,
        default: 0.2,
    },
    name: {
        type: String,
        required: false,
    },
});

const cover = ref(null as string | null);

const onError = async () => {
    console.error("Failed to load cover", props.src);
    cover.value = await generatePlaceholder(props.name ?? "N/A");
};

const element = ref(null as HTMLImageElement | null);
const onLoad = async () => {
    if (!props.withAmbient) return;
    if (!element.value) return;

    if (!window.getCurrentThemeProperty("supportsAmbient")) return;

    const src = await getCover(cover.value, props.name ?? "N/A");
    applyBoxShadow(element.value, src, props.ambientOpacity);
};

watch(
    () => props.src,
    async () => {
        cover.value = await getCover(props.src, props.name ?? "N/A");
    }
);

onMounted(async () => {
    cover.value = await getCover(props.src, props.name ?? "N/A");
});
</script>
<template>
    <img
        ref="element"
        :alt="props.type"
        :src="cover"
        class="cover rounded-md"
        @error="onError"
        @load="onLoad"
        lazy
    />
</template>

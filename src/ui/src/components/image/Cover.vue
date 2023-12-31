<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed, PropType, ref, watch } from "vue";
import { generatePlaceholder, getCover } from "./placeholder";
import Placeholder from "./Placeholder.vue";
import { parseAnyCover } from "../../common";
import { applyBoxShadow } from "../../helpers/accent";
import window from "@/themes";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    type: {
        type: String as PropType<"track" | "playlist">,
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

const placeholderIcon = computed(() => {
    if (props.placeholder) {
        return props.placeholder;
    }
    return props.type === "track" ? "music_note" : "queue_music";
});

const imgSrc = ref(null as string | null);
const showFallback = ref(false);

const onError = async () => {
    showFallback.value = true;
    return;

    imgSrc.value = await generatePlaceholder(placeholderIcon.value);

    if (!imgSrc.value) {
        setTimeout(() => {
            onError();
        }, 100);
        return;
    }
};

const updateSrc = () => {
    showFallback.value = false;
    imgSrc.value = parseAnyCover(props.src, props.type);

    if (!imgSrc.value) {
        onError();
    }
};

watch(() => props.src, updateSrc);
updateSrc();

const element = ref(null as HTMLImageElement | null);
const onLoad = async () => {
    if (!props.withAmbient) return;
    if (!element.value) return;

    if (!window.getCurrentThemeProperty("supportsAmbient")) return;

    const src = await getCover(imgSrc.value, placeholderIcon.value);

    applyBoxShadow(element.value, src, props.ambientOpacity);
};
</script>
<template>
    <img
        ref="element"
        :alt="props.type"
        :src="getCover(imgSrc, placeholderIcon)"
        class="cover rounded-md"
        @error="onError"
        @load="onLoad"
        v-show="!showFallback"
    />
    <Placeholder
        v-if="showFallback"
        :icon="placeholderIcon"
        :type="props.type"
        :with-ambient="props.withAmbient"
        :ambient-opacity="props.ambientOpacity"
        :name="props.name"
    />
</template>

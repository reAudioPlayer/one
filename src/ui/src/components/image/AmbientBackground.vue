<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { applyGradient } from "../../helpers/accent";
import { getCover } from "./placeholder";
import { parseAnyCover } from "../../common";

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: false,
        default: "to bottom"
    },
    placeholder: {
        type: String,
        required: false,
    },
});

const ambientGradient = ref(null as HTMLElement);

const apply = async () => {
    if (!ambientGradient.value) return;
    const propSrc = parseAnyCover(props.src, "playlist");
    const src = await getCover(propSrc, props.placeholder);
    await applyGradient(ambientGradient.value, src, props.direction);
}

watch(() => props.src, () => nextTick(apply));
onMounted(apply);
</script>

<template>
    <div
        v-if="src"
        ref="ambientGradient"
        class="ambient-gradient absolute inset-0 pointer-events-none"
    />
</template>
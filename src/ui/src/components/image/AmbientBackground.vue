<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { applyGradient } from "../../helpers/accent";
import { getCover } from "./placeholder";
import { parseAnyCover } from "../../common";
import { useSettingsStore } from "../../store/settings";

const settings = useSettingsStore();

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

const apply = async (forceSrc = undefined) => {
    if (!ambientGradient.value) return;

    const propSrc = forceSrc === undefined ? parseAnyCover(props.src) : forceSrc;
    const src = await getCover(propSrc, props.placeholder);

    try {
        await applyGradient(ambientGradient.value, src, props.direction);
    } catch (e: any) {
        if (!(e instanceof Error)) {
            throw e;
        }

        if (!e.message.includes("Error loading image")) {
            throw e;
        }

        await apply(null);
    }
}

watch(() => props.src, () => nextTick(apply));
onMounted(apply);
</script>

<template>
    <div
        v-if="src != null && settings.ambient"
        ref="ambientGradient"
        class="ambient-gradient absolute inset-0 pointer-events-none"
    />
</template>
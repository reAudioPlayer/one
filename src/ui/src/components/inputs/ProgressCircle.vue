<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>

import { onMounted, ref, watch } from "vue";

const props = defineProps({
    max: {
        type: Number,
        required: false,
        default: 100,
    },
    modelValue: {
        type: Number,
        required: false,
        default: 0,
    },
    displayValue: {
        type: String,
        required: true
    },
});

const radialProgress = ref(null as HTMLElement | null);

const setProgress = () => {
    if (radialProgress.value) {
        const percentage = (props.modelValue / props.max) * 100;

        radialProgress.value.style.setProperty(
            "--progress",
            `${percentage}%`
        );

        radialProgress.value.innerHTML = props.displayValue;
    }
};

watch(props, setProgress, {
    deep: true
});

const updateHeight = () => {
    if (radialProgress.value) {
        radialProgress.value.style.height = radialProgress.value.offsetWidth + "px";
    }
};

onMounted(() => {
    updateHeight();
    setProgress();
});

window.addEventListener("resize", updateHeight);
</script>
<template>
    <div
        ref="radialProgress"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        aria-valuemin="0"
        class="radialProgress"
        role="progressbar"
    />
</template>

<style scoped>
.radialProgress {
    --holesize: 55%;
    --progress: 20%;

    min-width: 2px;
    min-height: 2px;

    display: grid;
    align-items: center;
    justify-items: center;
    place-items: center;
    position: relative;
}

.radialProgress::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    background: conic-gradient(
        var(--fg-secondary),
        var(--fg-secondary),
        var(--fg-secondary) var(--progress),
        var(--fg-base-dk) var(--progress) 100%
    );

    -webkit-mask-image: radial-gradient(
        transparent var(--holesize),
        black calc(var(--holesize) + 0.5px)
    );

    mask-image: radial-gradient(
        transparent var(--holesize),
        black calc(var(--holesize) + 0.5px)
    );
}
</style>

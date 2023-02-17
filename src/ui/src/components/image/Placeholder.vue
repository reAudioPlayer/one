<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps({
    icon: {
        type: String,
        required: false,
        default: "graphic_eq"
    },
});

const canvas = ref(null as HTMLCanvasElement | null);
const wrapper = ref(null as HTMLElement | null);

onMounted(() => {
    const ctx = canvas.value?.getContext("2d");
    if (!ctx) {
        return;
    }
    if (!wrapper.value) {
        return;
    }

    const fgBase = getComputedStyle(document.documentElement).getPropertyValue('--fg-base');

    const baseHeight = Math.max(wrapper.value.clientHeight, 500);

    ctx.canvas.width = baseHeight
    ctx.canvas.height = baseHeight;

    ctx.font = `300 ${baseHeight}px Material Symbols Rounded`;
    ctx.fillStyle = fgBase;
    ctx.fillText(props.icon,0, baseHeight);

    wrapper.value.style.maxWidth = wrapper.value.style.minWidth = `${wrapper.value.clientWidth}px`;
    wrapper.value.style.maxHeight = wrapper.value.style.minHeight = `${wrapper.value.clientWidth}px`;
});
</script>

<template>
    <div ref="wrapper" class="background">
        <canvas ref="canvas" />
    </div>
</template>

<style lang="scss" scoped>
.background {
    background: var(--bg-gradient);

    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>

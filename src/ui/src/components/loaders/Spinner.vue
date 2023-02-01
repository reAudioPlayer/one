<template>
    <span class="loader"></span>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const wrapper = ref(null);

onMounted(() => {
    const ratio = 64 / 80;
    const size = wrapper.value?.clientWidth ?? 0;
    const borderRatio = 8 / 80;

    for (const child of wrapper.value?.children ?? []) {
        child.style.width = `${size * ratio}px`;
        child.style.height = `${size * ratio}px`;
        child.style.borderWidth = `${size * borderRatio}px`;
        child.style.margin = `${size * borderRatio}px`;
    }
})
</script>

<style scoped>
.loader {
    width: 20px;
    height: 20px;
    margin: auto;

    border: 3px solid var(--fg-base-dk);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
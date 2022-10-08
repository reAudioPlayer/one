<script setup>
defineProps({
    showModal: {
        type: Boolean,
        required: true
    },
})
</script>

<template>
    <div class="background" v-if="showModal">
        <div class="wrapper">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.background {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper {
    background: var(--background);
    border-radius: 20px;
    padding: 20px;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto;
}
</style>
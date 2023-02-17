<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Card
        class="p-4 flex flex-col w-full items-center justify-center"
    >
        <span class="material-symbols-rounded ms-fill">{{ icon }}</span>
        <span v-if="label" class="text-muted">{{ label }}</span>
    </Card>
</template>
<script lang="ts" setup>
import Card from "./Card.vue";

defineProps({
    icon: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
});
</script>

<style lang="scss" scoped>
span.material-symbols-rounded {
    font-size: 3rem;
    border-radius: 1000vmax;
    width: 70px;
    line-height: 70px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin-bottom: 1.25rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: var(--bg-hover-lt);
        color: var(--fg-secondary);
        transition: none;
    }
}
</style>

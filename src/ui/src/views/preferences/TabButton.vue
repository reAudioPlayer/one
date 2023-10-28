<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <button class="btn" :class="{ active }">
        {{ name }}
    </button>
</template>

<style lang="scss" scoped>
.btn {
    width: 100%;
    text-align: left;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    font-size: 0.9rem;
    border: 1px solid transparent;

    &.active {
        background: var(--bg-base-lt);
        border: var(--border-container);
    }
}
</style>

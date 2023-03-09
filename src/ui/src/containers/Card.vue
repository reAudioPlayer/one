<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
defineProps({
    withHover: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div :class="{ withHover }" class="card">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
    .card {
        background: var(--bg-base-lt);
        border-radius: 1em;
        border: var(--border-container);
        position: relative;

        &:before {
            content: "";
            border-radius: 1em;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
            position: absolute;
            inset: 0;
            z-index: -1;
        }

        &.withHover:hover {
            background: var(--bg-hover-dk);
        }
    }
</style>
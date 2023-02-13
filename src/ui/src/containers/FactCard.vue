<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
    withHover: {
        type: Boolean,
        default: false
    },
    primaryText: {
        type: null as PropType<string | number>,
        default: ""
    },
    secondaryText: {
        type: String,
        default: "",
        required: false
    },
})
</script>
<template>
    <div :class="{ withHover }" class="card p-4">
        <h2 class="mx-4">
            {{ primaryText }}
        </h2>
        <p v-if="secondaryText" class="my-0 text-muted">
            {{ secondaryText }}
        </p>
    </div>
</template>
<style lang="scss" scoped>
.card {
    background: var(--bg-base-lt);
    border-radius: 1em;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    &.withHover:hover {
        background: var(--bg-hover-dk);
    }

    p, h2 {
        text-align: center;
    }
}
</style>
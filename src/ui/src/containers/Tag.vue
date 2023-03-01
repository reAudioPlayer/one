<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Card from "./Card.vue";

defineProps({
    tag: {
        type: String,
        required: true
    },
    withHash: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <Card
        class="tag px-4 py-2 cursor-pointer"
        with-hover
    >
        {{withHash ? "#" : ""}}{{tag}}
    </Card>
</template>

<style lang="scss" scoped>
.tag {
    border-radius: 1000vmax;
    color: var(--fg-base-dk);

    &:hover {
        color: var(--fg-base);
    }
}
</style>

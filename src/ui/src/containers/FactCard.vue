<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType } from "vue";
import Card from "./Card.vue";

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
    <Card :with-hover="withHover" class="card p-4">
        <h2 class="mx-4">
            {{ primaryText }}
        </h2>
        <p v-if="secondaryText" class="my-0 text-muted">
            {{ secondaryText }}
        </p>
    </Card>
</template>
<style lang="scss" scoped>
.card {
    p, h2 {
        text-align: center;
    }
}
</style>
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import {PropType} from "vue";

export type IButtonType = "negative" | "positive" | "danger";

export interface IButton {
    icon?: string;
    label: string;
    disabled?: boolean;
    type?: IButtonType;
}

defineProps({
    icon: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    type: {
        type: String as PropType<IButtonType>,
        required: false,
        default: 'negative'
    }
})
</script>

<template>
    <button
        :class="disabled ? 'disabled' : '' + ' ' + type"
        class="flex items-center justify-center h-12 p-4 mt-4 rounded-full"
    >
        <span
            v-if="icon"
            :class="{ 'mr-2': label }"
            class="material-symbols-rounded"
        >{{icon}}</span>
        <span v-if="label">{{label}}</span>
    </button>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/tailwind-extended.scss";

button span.material-symbols-rounded {
    font-variation-settings: 'wght' 400;
}

button.disabled {
    cursor: not-allowed;
}

button.positive {
    background-color: var(--bg-base);
    color: var(--fg-base);

    &.disabled {
        background-color: var(--fg-base-dk);
        color: var(--bg-hover-ltr);
    }
}

button.negative {
    background-color: var(--bg-contrast );
    color: var(--fg-contrast);

    &.disabled {
        background-color: var(--fg-base-dk);
        color: var(--bg-hover-ltr);
    }
}

$danger: #c73c3c;

button.danger {
    color: whitesmoke;
    background-color: $danger;

    &.disabled {
        background-color: darken($danger, 10%);
        color: darkgrey;
    }
}
</style>


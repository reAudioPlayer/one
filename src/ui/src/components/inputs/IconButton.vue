<script lang="ts" setup>
defineProps({
    icon: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<template>
    <button
        class="flex items-center justify-center h-12 p-4 mt-4 rounded-full"
        :class="{ disabled }"
    >
        <span
            v-if="icon"
            class="material-symbols-rounded"
            :class="{ 'mr-2': label }"
        >{{icon}}</span>
        <span v-if="label">{{label}}</span>
    </button>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/tailwind-extended.scss";

button span.material-symbols-rounded {
    font-variation-settings: 'wght' 400;
}

button {
    background-color: var(--bg-contrast );
    color: var(--fg-contrast);
}

button.disabled {
    background-color: var(--fg-base-dk);
    color: var(--bg-hover-ltr);
    cursor: not-allowed;
}
</style>


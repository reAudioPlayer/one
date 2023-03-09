<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div
        :class="{ disabled }"
        class="text-input-with-icon rounded-3xl flex items-center px-4"
    >
        <span
            v-if="icon"
            class="material-symbols-rounded"
        >
            {{ icon }}</span>
        <input
            v-model="value"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="show ? 'text' : 'password'"
            @input="onChange"
            @keyup="onInput"
        />
        <span
            class="material-symbols-rounded cursor-pointer"
            @click="show = !show"
        >
            {{ show ? "visibility" : "visibility_off" }}
        </span>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    icon: String,
    placeholder: String,
    modelValue: String,
    disabled: Boolean
})

const value = ref(props.modelValue);

watch(() => props.modelValue, (nValue) => {
    value.value = nValue
})

const emits = defineEmits(['update:modelValue', 'change', 'submit']);

const onChange = () => {
    emits('update:modelValue', value.value);
    emits('change', value.value);
}

const onInput = e => {
    if (e.key === 'Enter') {
        emits('submit', value);
    }
}

const show = ref(false);
</script>

<style lang="scss" scoped>
.text-input-with-icon {
    background: var(--bg-base-lt);
    border: 1px solid var(--border-base);

    color: var(--fg-base-dk);

    &.disabled, &.disabled input {
        cursor: not-allowed !important;
    }

    input {
        color: var(--fg-base-dk);
    }

    &focus, &:focus-within, &:hover {
        border-color: var(--fg-base);
        color: var(--fg-base);

        input {
            color: var(--fg-base);
        }
    }
}

input {
    background: none !important;
    border: none !important;
}
</style>

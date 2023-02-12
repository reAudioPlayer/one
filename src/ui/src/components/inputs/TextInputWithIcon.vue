<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="text-input-with-icon rounded-3xl flex items-center px-4">
        <span
            :class="{ 'cursor-pointer': onClick }"
            class="material-symbols-rounded ms-wght-200"
            @click="onClick"
        >
            {{ icon }}
        </span>
        <input
            v-model="value"
            :placeholder="placeholder"
            type="text"
            @input="onChange"
            @keyup="onInput"
        />
    </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue";

const props = defineProps({
    icon: String,
    placeholder: String,
    modelValue: String,
    onClick: {
        type: Function as PropType<() => void>,
        required: false,
    }
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
</script>

<style lang="scss" scoped>
.text-input-with-icon {
    background: var(--bg-base-lt);
    border: 1px solid transparent;
    color: var(--fg-base-dk);
    width: 100%;

    input {
        color: var(--fg-base-dk);
    }

    &:focus-within, &:hover {
        border-color: var(--fg-base);

        color: var(--fg-base);
        input {
            color: var(--fg-base);
        }
    }
}

input[type=text] {
    background: none !important;
    border: none !important;
}
</style>

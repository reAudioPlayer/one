<template>
    <div class="text-input-with-icon rounded-3xl flex items-center px-4">
        <span class="material-symbols-rounded">{{ icon }}</span>
        <input
            type="text"
            v-model="value"
            @input="onChange"
            @keyup="onInput"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
    icon: String,
    placeholder: String,
    modelValue: String
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

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div
        class="text-input-with-icon rounded-3xl flex items-center px-4"
        :class="{ expanded }"
    >
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
            :type="type"
            @input="onChange"
            @keyup="onKeyUp"
            @focusout="$emit('focusout')"
        />
    </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue";

const props = defineProps({
    icon: String,
    placeholder: String,
    modelValue: String,
    type: {
        type: String,
        required: false,
        default: "text",
    },
    onClick: {
        type: Function as PropType<() => void>,
        required: false,
    },
    expanded: {
        type: Boolean,
        required: false,
        default: false,
    },
    onKeyUp: {
        type: Function as PropType<(e: KeyboardEvent) => boolean>,
        required: false,
    },
});

const value = ref(props.modelValue);
watch(
    () => props.modelValue,
    (nValue) => {
        value.value = nValue;
    }
);

const emits = defineEmits(["update:modelValue", "change", "submit"]);

const onChange = () => {
    emits("update:modelValue", value.value);
    emits("change", value.value);
};

const onKeyUp = (e) => {
    if (props.onKeyUp) {
        if (props.onKeyUp(e)) {
            return;
        }
    }

    if (e.key === "Enter") {
        emits("submit", value);
    }
};
</script>

<style lang="scss" scoped>
.text-input-with-icon {
    background: var(--bg-base-lt);
    border: 1px solid var(--border-base);
    color: var(--fg-base-dk);
    width: 100%;

    input {
        color: var(--fg-base-dk);
    }

    &:focus-within,
    &:hover {
        border-color: var(--fg-base);

        color: var(--fg-base);
        input {
            color: var(--fg-base);
        }
    }

    &.expanded {
        border-radius: 1em 1em 0 0;
    }
}

input[type="text"],
input[type="number"] {
    background: none !important;
    border: none !important;
}

input[type="text"],
input[type="number"],
input[type="password"] {
    background: var(--hover-2);
    border: 1px solid var(--hover-3);
    border-radius: 5px;
    color: var(--font-colour);
    padding: 10px;
    width: auto;
    flex-grow: 1;
    font-family: var(--font-family);

    &:focus {
        outline: none;
    }

    &:hover {
        background: var(--hover-1);
        border: 1px solid var(--font-colour);
    }
}
</style>

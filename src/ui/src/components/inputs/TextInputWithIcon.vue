<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div
        class="text-input-with-icon rounded-xl flex flex-col justify-center px-4"
        :class="{ expanded }"
    >
        <div class="flex flex-row gap-2 items-center">
            <span
                v-if="icon"
                :class="{ 'cursor-pointer': onClick }"
                class="material-symbols-rounded ms-wght-200"
                @click="onClick"
            >
                {{ icon }}
            </span>
            <div class="relative flex-1">
                <span
                    class="text-sm label-placeholder capitalize"
                    :class="{ atTop: !!value }"
                    v-if="label"
                >
                    {{ label }}
                </span>
                <input
                    v-model="value"
                    :type="type == 'password' && show ? 'text' : type"
                    :placeholder="placeholder"
                    @input="onChange"
                    @keyup="onKeyUp"
                    @focusout="$emit('focusout')"
                    ref="element"
                />
            </div>
            <span
                class="material-symbols-rounded cursor-pointer"
                v-if="type == 'password'"
                @click="show = !show"
            >
                {{ show ? "visibility" : "visibility_off" }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref, watch } from "vue";

const props = defineProps({
    icon: String,
    label: String,
    placeholder: {
        type: String,
        required: false,
        default: "",
    },
    modelValue: {
        type: String as PropType<string | number>,
        required: false,
        default: "",
    },
    type: {
        type: String as PropType<"text" | "number" | "password">,
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
const show = ref(false);
watch(
    () => props.modelValue,
    (nValue) => {
        value.value = nValue;
    }
);

const emits = defineEmits([
    "update:modelValue",
    "change",
    "submit",
    "focusout",
]);

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

const element = ref<HTMLElement>();

defineExpose({
    focus: () => {
        element.value?.focus();
    },
});
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

        .label-placeholder {
            top: 0;
            transform: translateY(0);
            font-size: 0.75rem;
            font-weight: 100;
        }
    }

    &.expanded {
        border-radius: 1em 1em 0 0;
    }
}

.label-placeholder {
    color: var(--fg-base-lt);
    transition: all 0.2s;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    pointer-events: none;

    &.atTop {
        top: 0;
        transform: translateY(0);
        font-size: 0.75rem;
        font-weight: 100;
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
    width: 100%;
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

.text-input-with-icon:has(.label-placeholder) input {
    padding-bottom: 5px;
    margin-top: 10px;
}
</style>

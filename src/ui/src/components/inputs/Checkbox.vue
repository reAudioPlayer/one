<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    label: {
        type: String,
        required: false,
        default: ""
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    sublabel: {
        type: String,
        required: false,
        default: ""
    }
});

const emit = defineEmits(["update:modelValue"]);
const update = (value: boolean) => emit("update:modelValue", value);
const toggle = () => update(!props.modelValue);
</script>
<template>
    <div
        class="checkbox"
        @click="toggle"
    >
        <span
            class="material-symbols-rounded ms-wght-300 cursor-pointer"
        >
            {{ modelValue ? "check_box" : "check_box_outline_blank" }}
        </span>
        <div class="checkbox__label">
            <div class="checkbox__label__title">{{ label }}</div>
            <div class="checkbox__label__sublabel italic">{{ sublabel }}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.checkbox {
    display: flex;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;
    user-select: none;

    .checkbox__label {
        margin-left: 10px;

        .checkbox__label__title {
            font-size: 1em;
        }
        .checkbox__label__sublabel {
            font-size: 0.85em;
            color: var(--font-darker);
        }
    }

    .checkbox__checkbox {
        font-size: 1.5em;
        font-variation-settings: "FILL" 0, "WEIGHT" 500, "WIDTH" 100;
    }
}
</style>
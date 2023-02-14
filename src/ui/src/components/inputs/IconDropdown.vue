<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { IDropdownOption } from "../../common";
import { nextTick, PropType, ref, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    options: {
        type: Array as PropType<IDropdownOption[]>,
        required: true
    }
});
const options = ref(props.options);

const selectedValue = ref(props.modelValue);
const expanded = ref(false);
const emit = defineEmits(["update:modelValue"]);


watch(props, (value) => {
    selectedValue.value = value.modelValue;
    options.value = value.options;
}, {deep: true})

const select = (value: string) => {
    selectedValue.value = value;
    emit("update:modelValue", value)
    expanded.value = false;
};

const trueDropdown = ref(null);
watch(expanded, (value) => {
    nextTick(() => {
        if (value) {
            const rect = trueDropdown.value.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.top;

            // if there's enough space below, render below
            // else, render above

            const enoughSpaceBelow = spaceBelow > rect.height;

            if (enoughSpaceBelow) {
                trueDropdown.value.style.top = "100%";
                trueDropdown.value.style.bottom = "auto";
            } else {
                trueDropdown.value.style.top = "auto";
                trueDropdown.value.style.bottom = "100%";
            }

            if (rect.left < 0) {
                trueDropdown.value.style.left = "0";
                trueDropdown.value.style.right = "auto";
            } else if (rect.right > window.innerWidth) {
                trueDropdown.value.style.left = "auto";
                trueDropdown.value.style.right = "0";
            }
        }
    })
});

document.addEventListener("click", () => {
    expanded.value = false;
});
</script>
<template>
    <div class="dropdown">
        <span
            class="dropdown__selected material-symbols-rounded ms-wght-400"
            @click.stop="expanded = !expanded"
        >
            {{icon}}
        </span>
        <div v-if="expanded" ref="trueDropdown" :class="{expanded}" class="dropdown__options">
            <div
                v-for="option in options"
                :key="option.value"
                class="dropdown__option"
                @click.stop="select(option.value)"
            >
                <span class="material-symbols-rounded">{{option.icon}}</span>
                <span>
                    {{option.label}}
                </span>
                <span v-if="selectedValue == option.value" class="material-symbols-rounded">check</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: inline-block;

    &__selected {
        color: var(--fg-base-dk);
        cursor: pointer;
        font-size: 1.5rem;
        border-radius: 10px;
        padding: 5px;

        &:hover {
            background: var(--bg-hover-lt);
            color: var(--fg-secondary);
        }
    }

    &__options {
        position: absolute;
        z-index: 999;
        width: max(100%, 20rem);
        max-height: 20rem;
        overflow-y: auto;
        background: var(--bg-base);
        border-radius: 5px;
        filter: var(--drop-shadow);

        .dropdown__option {
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            display: grid;
            grid-template-columns: 35px 1fr 20px;

            &:hover {
                background: var(--bg-hover);
            }
        }
    }
}
</style>

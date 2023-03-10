<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { IDropdownOption } from "../../common";
import { computed, nextTick, PropType, ref, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: Array as PropType<string[]>,
        required: true
    },
    options: {
        type: Array as PropType<IDropdownOption[]>,
        required: true
    },
    icon: {
        type: String,
        required: false
    }
});

const selectedValue = ref(props.modelValue);
const expanded = ref(false);
const emit = defineEmits(["update:modelValue"]);


watch(props, (value) => {
    selectedValue.value = value.modelValue;
}, {deep: true})

const select = (value: string[]) => {
    selectedValue.value = value;
    emit("update:modelValue", value)
    expanded.value = false;
};

const toggle = (value: string) => {
    if (selectedValue.value.includes(value)) {
        selectedValue.value = selectedValue.value.filter(v => v != value);
    } else {
        selectedValue.value.push(value);
    }
    emit("update:modelValue", selectedValue.value);
    expanded.value = false;
};

const selectedLabels = computed(() => {
    const labels = [];
    for (const value of selectedValue.value) {
        const option = props.options.find(option => option.value == value);
        if (option) {
            labels.push(option.label);
        }
    }
    return labels;
});

const trueDropdown = ref(null);
const container = ref(null);
watch(expanded, (value) => {
    nextTick(() => {
        if (value) {
            const rect = trueDropdown.value.getBoundingClientRect();
            const containerRect = container.value.getBoundingClientRect();

            const top = containerRect.top;
            const bottom = containerRect.bottom;

            const spaceBelow = window.innerHeight - bottom;

            const containerWidth = containerRect.width;
            trueDropdown.value.style.width = containerWidth + "px";
            trueDropdown.value.style.left = containerRect.left + "px";

            const enoughSpaceBelow = spaceBelow > rect.height;

            if (enoughSpaceBelow) {
                trueDropdown.value.style.top = bottom + "px";
                trueDropdown.value.style.bottom = "auto";
            } else {
                trueDropdown.value.style.top = "auto";
                trueDropdown.value.style.bottom = top - rect.height + "px";
            }
        }
    })
});

window.addEventListener("click", () => {
    expanded.value = false;
});
</script>
<template>
    <div
        ref="container"
        class="dropdown"
    >
        <div
            :class="{ expanded }"
            class="dropdown__selected"
            @click.stop="expanded = !expanded"
        >
            <div class="flex flex-row gap-2 items-center overflow-hidden">
                <span
                    v-if="icon"
                    class="material-symbols-rounded ms-wght-200"
                >
                    {{icon}}
                </span>
                <div class="selected-labels">
                    <span
                        v-for="label in selectedLabels"
                        :key="label"
                        class="selected-label"
                    >
                        {{label}}
                        <i
                            class="material-symbols-rounded"
                            @click="toggle(label)"
                        >
                            close
                        </i>
                    </span>
                </div>
            </div>
            <i class="material-symbols-rounded">
                {{expanded ? "expand_less" : "expand_more"}}
            </i>
        </div>
        <teleport to="#dropdown-target">
            <div v-if="expanded" ref="trueDropdown" class="dropdown__options">
                <div
                    v-for="option in options"
                    :key="option.value"
                    class="dropdown__option"
                    @click.stop="toggle(option.value)"
                >
                    <span class="material-symbols-rounded">{{option.icon}}</span>
                    <span>
                        {{option.label}}
                    </span>
                    <span v-if="selectedValue.includes(option.value)" class="material-symbols-rounded">check</span>
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    display: inline-block;
    width: 100%;

    &__selected {
        background: var(--bg-base-lt);
        border-radius: 1000vmax;
        color: var(--font-colour);
        padding: 0px 10px;
        width: auto;
        height: 46px;
        flex-grow: 1;
        font-family: var(--ff-base);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        overflow-x: hidden;
        border: var(--border-container);

        &.expanded {
            border-radius: 1em 1em 0 0;
        }

        &:focus-within, &:hover {
            border-color: var(--fg-base);
            color: var(--fg-base);
        }
    }

    &__options {
        position: absolute;
        z-index: 999;
        max-height: 20rem;
        max-width: 100%;
        overflow-y: auto;
        background: var(--bg-base);
        border-radius: 0 0 1em 1em;
        filter: var(--drop-shadow);
        border: var(--border-container);
        top: 0;
        left: 0;

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

    .selected-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        gap: 0.5rem;
        background: var(--bg-base-dk);
        border-radius: 1000vmax;
        padding: 4px 0.5rem;
    }

    .selected-labels {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
}
</style>

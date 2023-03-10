<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { IDropdownOption } from "../../common";
import { computed, nextTick, PropType, ref, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
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
})

const selectedValue = ref(props.modelValue);
const expanded = ref(false);
const emit = defineEmits(["update:modelValue"]);


watch(props, (value) => {
    selectedValue.value = value.modelValue;
}, {deep: true})

const select = (value: string) => {
    selectedValue.value = value;
    emit("update:modelValue", value)
    expanded.value = false;
};

const selectedLabel = computed(() => {
    const selected = props.options.find(x => x.value == selectedValue.value);
    return selected ? selected.label : "";
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
            <div class="flex flex-row gap-2">
                <span
                    v-if="icon"
                    class="material-symbols-rounded ms-wght-200"
                >
                    {{icon}}
                </span>
                <span>{{selectedLabel}}</span>
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
                    @click.stop="select(option.value)"
                >
                    <span class="material-symbols-rounded">{{option.icon}}</span>
                    <span>
                        {{option.label}}
                    </span>
                    <span v-if="selectedValue == option.value" class="material-symbols-rounded">check</span>
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;

    &__selected {
        background: var(--bg-base-lt);
        border: var(--border-container);
        border-radius: 1000vmax;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--ff-base);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

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
        left: 0;
        z-index: 1001;
        width: max(100%, 20rem);
        max-height: 20rem;
        overflow-y: auto;
        background: var(--bg-base);
        border-radius: 0 0 1em 1em;
        filter: var(--drop-shadow);
        border: var(--border-container);

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

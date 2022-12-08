<script setup lang="ts">
import {IDropdownOption} from "../common";
import {computed, PropType, ref} from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    options: {
        type: Array as PropType<IDropdownOption[]>,
        required: true
    }
})

const selectedValue = ref(props.modelValue);
const expanded = ref(false);
const emit = defineEmits(["update:modelValue"]);

const select = (value: string) => {
    selectedValue.value = value;
    emit("update:modelValue", value)
    expanded.value = false;
};

const selectedLabel = computed(() => {
    const selected = props.options.find(x => x.value == selectedValue.value);
    return selected ? selected.label : "";
});

window.onclick = () => expanded.value = false;
</script>
<template>
    <div class="dropdown">
        <div class="dropdown__selected" @click.stop="expanded = !expanded">
            <span>{{selectedLabel}}</span>
            <i class="material-symbols-rounded">
                {{expanded ? "expand_less" : "expand_more"}}
            </i>
        </div>
        <div class="dropdown__options" v-if="expanded">
            <div
                v-for="option in options"
                :key="option.value"
                class="dropdown__option"
                @click.stop="select(option.value)"
            >
                {{option.label}}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;

    &__selected {
        background: var(--hover-2);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &:hover {
            background: var(--hover-1);
            border: 1px solid var(--font-colour);
        }
    }

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 999;
        width: 100%;
        max-height: 20rem;
        overflow-y: auto;
        background: var(--background);
        border-radius: 5px;

        .dropdown__option {
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                background: var(--hover-1);
            }
        }
    }
}
</style>

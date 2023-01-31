<script setup lang="ts">
import {IDropdownOption} from "../../common";
import {computed, nextTick, PropType, ref, watch} from "vue";

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
        }
    })
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
        <div ref="trueDropdown" class="dropdown__options" v-if="expanded">
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
        background: var(--bg-hover-lt);
        border: 1px solid var(--bg-hover-ltr);
        border-radius: 5px;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--ff-base);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &:hover {
            background: var(--bg-hover);
            border: 1px solid var(--fg-base);
        }
    }

    &__options {
        position: absolute;
        left: 0;
        z-index: 999;
        width: 100%;
        max-height: 20rem;
        overflow-y: auto;
        background: var(--bg-base);
        border-radius: 5px;

        .dropdown__option {
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                background: var(--bg-hover);
            }
        }
    }
}
</style>
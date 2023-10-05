<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div ref="inputElement" class="input-with-autocomplete">
        <TextInputWithIcon
            v-model="value"
            :icon="icon"
            :placeholder="placeholder"
            @submit="submit"
            @change="onChange"
            :onKeyUp="onKeyUp"
            :expanded="suggestions.length > 0"
            ref="input"
        />
    </div>
    <Teleport to="#autocomplete-target" v-if="suggestions.length > 0">
        <div
            class="suggestions absolute w-full z-10"
            :style="suggestOffset"
            @click.stop="suggestions = []"
        >
            <div class="flex flex-col">
                <slot
                    v-for="(suggestion, index) in suggestions"
                    :selected="index === selectedAutoCompleteItem"
                    :value="suggestion"
                />
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { PropType, ref, watch, computed, onMounted } from "vue";
import TextInputWithIcon from "./TextInputWithIcon.vue";
import { debounce } from "lodash";

const selectedAutoCompleteItem = ref(-1);
const onKeyUp = (e) => {
    if (e.key === "ArrowDown") {
        selectedAutoCompleteItem.value++;
        if (selectedAutoCompleteItem.value >= suggestions.value.length) {
            selectedAutoCompleteItem.value = -1;
        }
        return true;
    }
    if (e.key === "ArrowUp") {
        if (selectedAutoCompleteItem.value === -1) {
            selectedAutoCompleteItem.value = suggestions.value.length;
        }
        selectedAutoCompleteItem.value--;
        if (selectedAutoCompleteItem.value < 0) {
            selectedAutoCompleteItem.value = -1;
        }
        return true;
    }
    if (e.key === "Enter") {
        console.log(selectedAutoCompleteItem.value);
        if (selectedAutoCompleteItem.value >= 0) {
            props.clickSuggest(
                suggestions.value[selectedAutoCompleteItem.value]
            );
            selectedAutoCompleteItem.value = -1;
            suggestions.value = [];
            return true;
        }
    }

    return false;
};

document.addEventListener("click", (e) => {
    if (!inputElement.value?.contains(e.target as Node)) {
        suggestions.value = [];
        selectedAutoCompleteItem.value = -1;
    }
});

const props = defineProps({
    icon: String,
    placeholder: String,
    modelValue: String,
    onClick: {
        type: Function as PropType<() => void>,
        required: false,
    },
    suggest: {
        type: Function as PropType<(string) => Promise<any[]>>,
        required: true,
    },
    clickSuggest: {
        type: Function as PropType<(any) => void>,
        required: false,
    },
});

const value = ref(props.modelValue);
const input = ref<HTMLInputElement | null>(null);
watch(
    () => props.modelValue,
    (nValue) => {
        value.value = nValue;
    }
);

const inputElement = ref<HTMLInputElement | null>(null);
const suggestOffset = computed(() => ({
    top: inputElement.value.offsetTop + inputElement.value.offsetHeight + "px",
    left: inputElement.value?.offsetLeft + "px",
    width: inputElement.value?.offsetWidth + "px",
}));

const suggestions = ref<string[]>([]);
const onInput = debounce(async () => {
    suggestions.value = (await props.suggest(value.value)).slice(0, 5);
}, 300);

const emits = defineEmits(["update:modelValue", "change", "submit"]);

const onChange = () => {
    emits("update:modelValue", value.value);
    emits("change", value.value);
    onInput();
};

const submit = (e) => {
    emits("submit", e);
    suggestions.value = [];
};

defineExpose({
    focus: () => {
        input.value?.focus();
    },
});
</script>

<style lang="scss" scoped>
.suggestions {
    background: var(--bg-base-lt);
    border: var(--border-container);
    z-index: 1001;
    background: var(--bg-base);
    border-radius: 0 0 1em 1em;
    filter: var(--drop-shadow);
    overflow: hidden;
}
</style>

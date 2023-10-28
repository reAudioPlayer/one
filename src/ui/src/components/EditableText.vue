<script setup lang="ts">
import { nextTick, ref, watch, computed, onMounted, watchEffect } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    locked: {
        type: Boolean,
        default: false,
    },
    noOutline: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "Click to edit",
    },
});

const value = ref(props.modelValue);
watch(
    () => props.modelValue,
    (newValue) => (value.value = newValue)
);

const editing = ref(false);
const emit = defineEmits(["update:modelValue", "change"]);
const area = ref(null as HTMLTextAreaElement | null);
const startEditing = () => {
    if (props.locked) return;

    editing.value = true;

    nextTick(() => {
        if (!area.value) return;
        area.value.focus();
    });
};

const showSlot = computed(() => {
    if (props.locked) return true;
    if (editing.value) return false;
    return value.value;
});

const update = (newValue: string) => {
    value.value = newValue;
    emit("change", newValue);
    emit("update:modelValue", newValue);
};

const autoResize = () => {
    if (!area.value) return;

    area.value.style.height = "auto";
    area.value.style.height = area.value.scrollHeight + "px";
};

onMounted(() => autoResize());

watchEffect(() => {
    if (!editing.value) return;
    autoResize();
});
</script>
<template>
    <div
        class="editable-text"
        :class="{ outlined: !noOutline && editing }"
        @dblclick.stop="startEditing"
    >
        <slot v-if="showSlot" />
        <textarea
            v-else
            ref="area"
            rows="1"
            v-model="value"
            @change="update(($event.target as HTMLInputElement).value)"
            @input="autoResize()"
            @click.stop="editing = true"
            @keydown.enter="editing = false"
            @keydown.esc="editing = false"
            @blur="editing = false"
            :placeholder="placeholder"
        />
    </div>
</template>
<style scoped lang="scss">
.editable-text {
    &.outlined {
        border: var(--border-container);
        border-radius: 0.5em;
    }
}

.h1 textarea {
    font-size: inherit;
    margin-block-start: 0;
    margin-block-end: 0;
}

textarea,
.textarea {
    width: 100%;
    border: none;
    background: none;
    font-size: inherit;
    font-weight: 900;
    font-family: inherit;
    color: inherit;
    outline: none;
    color: var(--fg-base);
    resize: none;
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */

    &:placeholder {
        color: var(--fg-base-dk);
        font-weight: 400;
        font-style: italic;
    }
}
</style>

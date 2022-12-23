<script setup lang="ts">
import {IDropdownOption} from "../../../common";
import {PropType} from "vue";
import {toTitleCase, openInNewTab, parseCover} from "@/common";
import Dropdown from "../../Dropdown.vue";

interface IOption {
    value: string;
    name: string;
    type: "text" | "number" | "upload";
    accept?: string;
    placeholder?: string;
    required?: boolean;
    imagePreview?: boolean;
    onUpload?: (file: File) => void;
    onChange?: (value: unknown) => void;
    options: IDropdownOption[];
}

const props = defineProps({
    options: {
        type: Array as PropType<IOption[]>,
        required: true
    }
})

const toObject = () => {
    const obj: Record<string, unknown> = {};
    props.options.forEach(option => {
        obj[option.name] = option.value;
    })
    return obj;
}

defineExpose({
    toObject
})
</script>

<template>
    <div class="form">
        <div
            v-for="option in options"
            :key="option.name"
            class="option"
        >
            <h4>{{toTitleCase(option.name)}}</h4>
            <div class="content">
                <!-- INPUT TYPES -->
                <template v-if="option.type == 'upload'">
                    <button
                        @click="() => $refs['upload-' + option.name]?.[0]?.click()"
                        class="icon-button"
                    >
                        <span class="material-symbols-rounded">file_upload</span>
                    </button>
                    <input
                        type="file"
                        :ref="'upload-' + option.name"
                        style="display: none"
                        :accept="option.accept"
                        @change="option?.onUpload($event.target.files[0])"
                    />

                    <input
                        type="text"
                        class="addSong cover"
                        v-model="option.value"
                        ref="cover"
                        @change="option?.onChange(option.value)"
                    >
                    <img
                        v-if="option.imagePreview"
                        @click="openInNewTab(option.value)"
                        class="imagePreview"
                        :src="parseCover(option.value)"
                    >
                </template>
                <template v-else-if="option.type == 'dropdown'">
                    <Dropdown
                        v-model="option.value"
                        :options="option.options"
                    />
                </template>
                <template v-else>
                    <input
                        v-model="option.value"
                        :type="option.type"
                        @change="option.onChange ? option?.onChange(option.value) : null"
                    >
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: row;

    .icon-button {
        margin-right: 10px;
    }

    img.imagePreview {
        height: 42px;
        width: 42px;
        margin-left: 10px;
        border-radius: 5px;

        &:hover {
            cursor: pointer;
            filter: grayscale(0.4) blur(2px);
        }
    }
}
</style>

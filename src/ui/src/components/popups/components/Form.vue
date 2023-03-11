<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { IDropdownOption, openInNewTab, parseCover, toTitleCase } from "../../../common";
import { PropType } from "vue";
import Dropdown from "../../inputs/Dropdown.vue";
import TextInputWithIcon from "../../inputs/TextInputWithIcon.vue";
import Cover from "../../image/Cover.vue";

interface IOption {
    value: string;
    name: string;
    type: "text" | "number" | "upload" | "dropdown";
    icon?: string;
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
                    <span
                        class="material-symbols-rounded icon-button"
                        @click="() => $refs['upload-' + option.name]?.[0]?.click()"
                    >
                        file_upload
                    </span>
                    <input
                        :ref="'upload-' + option.name"
                        :accept="option.accept"
                        style="display: none"
                        type="file"
                        @change="option?.onUpload($event.target.files[0])"
                    />

                    <TextInputWithIcon
                        ref="cover"
                        v-model="option.value"
                        :icon="option.icon"
                        class="addSong cover"
                        type="text"
                        @change="option?.onChange(option.value)"
                    />
                    <div
                        v-if="option.imagePreview"
                        class="imagePreview"
                    >
                        <Cover
                            :src="parseCover(option.value)"
                            class="cover"
                            @click="openInNewTab(option.value)"
                        />
                    </div>
                </template>
                <template v-else-if="option.type == 'dropdown'">
                    <Dropdown
                        v-model="option.value"
                        :icon="option.icon"
                        :options="option.options"
                    />
                </template>
                <template v-else-if="option.type == 'text'">
                    <TextInputWithIcon
                        v-model="option.value"
                        :icon="option.icon"
                        :placeholder="option.placeholder"
                        :required="option.required"
                        :type="option.type"
                        @change="option.onChange ? option?.onChange(option.value) : null"
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
        background: var(--bg-contrast);
        color: var(--fg-contrast);
        border-radius: 1000vmax;
        padding: 11px;
        cursor: pointer;
        font-variation-settings: "wght" 300;
    }

    .imagePreview {
        min-width: 42px;
        max-width: 42px;
        margin-left: 10px;

        .cover {
            border-radius: 5px;

            &:hover {
                cursor: pointer;
                filter: grayscale(0.4) blur(2px);
            }
        }
    }
}
</style>

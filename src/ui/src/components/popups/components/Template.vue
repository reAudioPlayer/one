<script lang="ts" setup>
import {PropType, ref} from "vue";
import Loader from "../../Loader.vue";
import IconButton, {IButton} from "../../inputs/IconButton.vue";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    submit: {
        type: Object as PropType<IButton>,
        required: true
    },
    secondary: {
        type: Object as PropType<IButton>,
        required: false,
        default: null
    },
})

const loading = ref(false);
const showModal = ref(false);
const error = ref("");
const hide = () => showModal.value = false;

const show = () => {
    loading.value = false;
    showModal.value = true;
};

const load = () => {
    loading.value = true;
    showModal.value = true;
}

const fetch = async (url: string, options: RequestInit) => {
    load();
    const res = await window.fetch(url, options);
    show();
    if (!res.ok) {
        error.value = await res.text();
        return null;
    }
    return res;
}

const emit = defineEmits(["submit", "close", "secondary"]);

const close = () => {
    hide();
    emit("close");
}

const submit = () => {
    emit("submit");
    close();
}

const secondary = () => {
    emit("secondary");
    close();
}

defineExpose({
    show, hide, load, fetch
})
</script>
<template>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content" @click.stop @contextmenu.stop @drag.stop>
        <div class="wrapper">
            <div class="header bg-secondary rounded-t-2xl p-3">
                <h3 class="title font-black">{{name}}</h3>
                <button class="modal-close" @click="close">
                    <span class="title material-icons-round">
                        close
                    </span>
                </button>
            </div>
            <Loader v-if="loading" />
            <div v-else-if="error">

            </div>
            <div
                v-else
                class="p-4 pt-0"
            >
                <slot />
                <div v-if="props.submit || props.secondary" class="confirm">
                    <IconButton
                        v-if="props.secondary"
                        :icon="props.secondary.icon"
                        :label="props.secondary.label"
                        :type="props.secondary.type"
                        @click="secondary"
                    />
                    <IconButton
                        v-if="props.submit"
                        :icon="props.submit.icon"
                        :label="props.submit.label"
                        :type="props.submit.type"
                        @click="submit"
                    />
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>
<style lang="scss" scoped>
.wrapper {
    cursor: default;
    position: relative;
    /*overflow: hidden;*/
}

.confirm {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: .5rem;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.title {
    color: white;
}
</style>
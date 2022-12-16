<script setup lang="ts">
import {PropType, ref} from "vue";
import Loader from "../../Loader.vue";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    submitName: {
        type: String,
        required: true
    },
    secondaryName: {
        type: String,
        required: false,
        default: null
    },
    secondaryType: {
        type: String,
        required: false,
        default: null
    },
})

const loading = ref(false);
const showModal = ref(false);
const hide = () => showModal.value = false;

const show = () => {
    loading.value = false;
    showModal.value = true;
};

const load = () => {
    loading.value = true;
    showModal.value = true;
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
    show, hide, load
})
</script>
<template>
    <vue-final-modal @contextmenu.stop v-model="showModal" classes="modal-container" content-class="modal-content">
        <div class="wrapper">
            <div class="header">
                <h3>{{name}}</h3>
                <button class="modal-close" @click="close">
                    <span class="material-icons-round">
                        close
                    </span>
                </button>
            </div>
            <Loader v-if="loading" />
            <template v-else>
                <slot />
                <div v-if="submitName || secondaryName" class="confirm">
                    <button
                        v-if="secondaryName"
                        class="secondary"
                        :class="secondaryType"
                        @click="secondary"
                    >
                        {{secondaryName}}
                    </button>
                    <button
                        v-if="submitName"
                        @click="submit"
                        class="negative"
                    >
                        {{submitName}}
                    </button>
                </div>
            </template>
        </div>
    </vue-final-modal>
</template>
<style scoped lang="scss">
.wrapper {
    cursor: default;
    position: relative;
    /*overflow: hidden;*/
}

.confirm {
    margin-top: 20px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

button {
    &.negative {
        color: var(--font-contrast);
        background-color: var(--font-colour);
        border: none;
        border-radius: 20px;
        padding: 10px 25px 10px 25px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
        font-family: var(--font-family);
        margin-left: 1em;
        cursor: pointer;
    }

    &.secondary {
        color: var(--font-contrast);
        background-color: var(--font-darker);
        border: none;
        border-radius: 20px;
        padding: 10px 25px 10px 25px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
        font-family: var(--font-family);
        margin-left: auto;
        cursor: pointer;
    }

    &.danger {
        color: var(--font-colour);
        background-color: #c73c3c;
    }
}
</style>
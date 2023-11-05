<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType, ref } from "vue";
import Loader from "../../Loader.vue";
import IconButton, { IButton } from "../../inputs/IconButton.vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    submit: {
        type: Object as PropType<IButton>,
        required: false,
    },
    secondary: {
        type: Object as PropType<IButton>,
        required: false,
        default: null,
    },
});

const loading = ref(false);
const showModal = ref(false);
const error = ref("");
const hide = () => (showModal.value = false);

const show = () => {
    loading.value = false;
    showModal.value = true;
};

const load = () => {
    loading.value = true;
    showModal.value = true;
};

const fetch = async (url: string, options: RequestInit) => {
    load();
    const res = await window.fetch(url, options);
    show();
    if (!res.ok) {
        error.value = await res.text();
        return null;
    }
    return res;
};

const emit = defineEmits(["submit", "close", "secondary"]);

const close = () => {
    hide();
    emit("close");
};

const submit = () => {
    emit("submit");
    close();
};

const secondary = () => {
    emit("secondary");
    close();
};

defineExpose({
    show,
    hide,
    load,
    fetch,
});
</script>
<template>
    <teleport v-if="showModal" to="#popup-target">
        <div
            class="modal"
            @click.stop="showModal = false"
            @contextmenu.stop
            @drag.stop
        >
            <div class="modal-content" @click.stop>
                <div class="header bg-secondary rounded-t-2xl p-3">
                    <h3 class="title font-black">{{ name }}</h3>
                    <button class="modal-close" @click="close">
                        <span class="title material-icons-round"> close </span>
                    </button>
                </div>
                <Loader v-if="loading" />
                <div v-else-if="error">
                    <p class="p-4 error">{{ error }}</p>
                </div>
                <div
                    v-else
                    class="p-4 pt-0 flex flex-col overflow-x-hidden overflow-y-auto"
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
        </div>
    </teleport>
</template>
<style lang="scss" scoped>
.modal {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.7);
    animation: fadeIn 0.2s ease-in-out forwards;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error {
    color: var(--danger);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-content {
    cursor: default;
    display: flex;
    flex-direction: column;
    width: 40%;
    max-height: 80vh;
    background: var(--fg-contrast);
    border-radius: 1rem;
    color: var(--fg-base);
}

.confirm {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
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

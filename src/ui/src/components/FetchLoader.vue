<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->
<script setup lang="ts">
import { PropType, onMounted, ref, watch } from "vue";
import Error from "./Error.vue";
import Loader from "./Loader.vue";

const props = defineProps({
    response: {
        type: Promise as PropType<Promise<Response>>,
        required: true,
    },
    error: {
        type: Function as PropType<(res: Response) => string>,
        default: (res) => `Failed to fetch (${res.status})`,
    },
});

const loading = ref(false);
const error = ref("");

const handle = async () => {
    if (!props.response) {
        return;
    }
    loading.value = true;
    error.value = "";
    const value = await props.response;
    loading.value = false;
    if (!value.ok) {
        error.value = props.error(value);
    }
};

onMounted(handle);
watch(() => props.response, handle);
</script>
<template>
    <Loader v-if="loading" />
    <Error v-else-if="error" :msg="error" />
    <slot v-else-if="response" />
</template>

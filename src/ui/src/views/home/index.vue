<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup>
import Dashboard from "@/views/home/Dashboard.vue";
import Onboarding from "@/views/home/Onboarding.vue";
import { useDataStore } from "@/store/data";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const dataStore = useDataStore();
const noOnboarding = ref(false);
const router = useRouter();

onMounted(() => {
    if (document.body.clientWidth < 768) {
        noOnboarding.value = true;
        router.push("/collection/playlist");
    }
});
</script>

<template>
    <Dashboard v-if="dataStore.notEmpty || noOnboarding" />
    <Onboarding v-else />
</template>

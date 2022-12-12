<script setup>
import Dashboard from "@/views/home/Dashboard.vue";
import Onboarding from "@/views/home/Onboarding.vue";
import {useDataStore} from "@/store/data";

const dataStore = useDataStore();
</script>

<template>
    <Dashboard v-if="dataStore.notEmpty" />
    <Onboarding v-else />
</template>

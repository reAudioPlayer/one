<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

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

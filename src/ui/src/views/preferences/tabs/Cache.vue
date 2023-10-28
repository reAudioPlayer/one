<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Checkbox from "../../../components/inputs/Checkbox.vue";
import { computed, ref } from "vue";
import IconButton from "../../../components/inputs/IconButton.vue";
import Dropdown from "../../../components/inputs/Dropdown.vue";
import { getConfig, IConfig, setConfig } from "../../../api/config";

const config = ref(null as IConfig | null);
const cachedConfig = ref("");
getConfig().then((x) => {
    config.value = x;
    cachedConfig.value = JSON.stringify(x);
});
const configChanged = computed(() => {
    if (!config.value) return false;
    return JSON.stringify(config.value) !== cachedConfig.value;
});
const updateConfig = async () => {
    if (!configChanged.value) return;
    await setConfig(config.value);
    cachedConfig.value = JSON.stringify(config.value);
};
</script>
<template>
    <div class="relative">
        <Checkbox
            v-if="config"
            v-model="config.cache.preserve"
            label="Preserve cache"
        />
        <Checkbox
            v-if="config"
            v-model="config.cache.preserveInSession"
            :disabled="config.cache.preserve"
            label="Preserve cache in session"
        />
        <Dropdown
            v-if="config"
            v-model="config.cache.strategy"
            :options="[
                {
                    value: 'all',
                    label: 'All Songs',
                },
                {
                    value: 'playlist',
                    label: 'Current Playlist',
                },
                {
                    value: 'currentNext',
                    label: 'Current + Next Song ',
                },
                {
                    value: 'current',
                    label: 'Current Song Only',
                },
            ]"
            icon="cached"
        />
        <IconButton
            :disabled="!config || !configChanged"
            class="ml-auto mt-4"
            icon="save"
            label="Save"
            @click="updateConfig"
        />
    </div>
</template>

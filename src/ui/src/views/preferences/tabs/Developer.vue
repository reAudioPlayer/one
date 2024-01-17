<script setup lang="ts">
import { useSettingsStore } from "../../../store/settings";
import IconButton from "../../../components/inputs/IconButton.vue";

const settings = useSettingsStore();

const restart = () => {
    fetch("/api/system/kill");
};
const restartNginx = () => {
    fetch("/api/system/restart/nginx");
};
</script>
<template>
    <div class="flex items-center gap-2">
        <IconButton
            icon="refresh"
            label="Restart"
            @click="restart"
            type="danger"
        />
        <IconButton
            icon="refresh"
            label="Restart Nginx"
            @click="restartNginx"
        />
    </div>
</template>

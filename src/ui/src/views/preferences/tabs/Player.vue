<script setup lang="ts">
import { useSettingsStore } from "../../../store/settings";
import Checkbox from "../../../components/inputs/Checkbox.vue";
import Dropdown from "../../../components/inputs/Dropdown.vue";

const settings = useSettingsStore();
</script>
<template>
    <div class="relative">
        <Checkbox
            v-model="settings.player.pictureInPicture"
            label="Support Picture in Picture"
            sublabel="this will slightly reduce performance"
        />
        <Dropdown
            v-model="settings.player.type"
            :options="[
                {
                    value: 'web',
                    label: 'Native player',
                    icon: 'horizontal_rule',
                },
                {
                    value: 'web/wave',
                    label: 'Wave player',
                    icon: 'graphic_eq',
                },
            ]"
            icon="music_note"
        />
    </div>
</template>

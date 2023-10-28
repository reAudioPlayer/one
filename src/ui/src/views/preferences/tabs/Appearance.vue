<script setup lang="ts">
import { useSettingsStore } from "../../../store/settings";
import Theme from "../../../components/Preferences/Theme.vue";
import Checkbox from "../../../components/inputs/Checkbox.vue";

const settings = useSettingsStore();

const themes = ["dynamic", "light", "dark"];
</script>
<template>
    <h3 class="mt-[10px]">Theme</h3>
    <Checkbox
        v-model="settings.ambient"
        :disabled="!settings.themeSupportsAmbient"
        label="Ambient"
    />
    <div class="themes">
        <Theme v-for="(theme, index) in themes" :key="index" :name="theme" />
    </div>
    <h3 class="mt-[10px]">Sidebar</h3>
    <Checkbox v-model="settings.sidebar.news" label="Show 'News' Tab" />
    <Checkbox v-model="settings.sidebar.sports" label="Show 'Sports' Tab" />
</template>
<style lang="scss" scoped>
.themes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;

    .wrapper {
        max-width: 200px;
    }
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { Ref, ref } from "vue";
import Card from "../../containers/Card.vue";
import TabButton from "./TabButton.vue";

import About from "./tabs/About.vue";
import LocalData from "./tabs/LocalData.vue";
import Privacy from "./tabs/Privacy.md";
import Cache from "./tabs/Cache.vue";
import Appearance from "./tabs/Appearance.vue";
import Player from "./tabs/Player.vue";
import Integration from "./tabs/Integration.vue";
import { useRoute } from "vue-router";

const TABS = {
    About: About,
    Privacy: Privacy,
    "Local Data": LocalData,
    Integrations: Integration,
    "Cache Policy": Cache,
    Appearance: Appearance,
    Player: Player,
};

const groups = ref([
    {
        name: "General",
        items: ["About"],
    },
    {
        name: "My Data",
        items: ["Privacy", "Local Data", "Integrations"],
    },
    {
        name: "Player",
        items: ["Player", "Cache Policy"],
    },
    {
        name: "Appearance",
        items: ["Appearance"],
    },
]);

const route = useRoute();
let requestTab = route.query.tab as string;
const activeTab: Ref<keyof typeof TABS> = ref("About");

if (Object.keys(TABS).includes(requestTab)) {
    activeTab.value = requestTab as keyof typeof TABS;
}
</script>
<template>
    <div class="p-[10px] preferences">
        <h1 class="w-full">Preferences</h1>
        <div class="wrapper">
            <div class="sections flex flex-col">
                <div class="section p-2" v-for="group in groups">
                    <span class="h5 text-sm">{{ group.name }}</span>
                    <TabButton
                        v-for="tab in group.items"
                        :key="tab"
                        :name="tab"
                        :active="activeTab === tab"
                        @click="activeTab = tab as keyof typeof TABS"
                    />
                </div>
            </div>
            <Card class="content h-max p-4 pt-0">
                <h2>{{ activeTab }}</h2>
                <component :is="TABS[activeTab]" />
            </Card>
        </div>
    </div>
</template>
<style lang="scss">
ul {
    margin-left: 2em;
    list-style-type: disc;
}

.markdown-body {
    line-height: 1.5;
}
</style>

<style lang="scss" scoped>
.preferences {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section:not(:last-child) {
    border-bottom: var(--border-container);
}

.btn {
    width: 100%;
    text-align: left;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    font-size: 0.9rem;
    border: 1px solid transparent;

    &.active {
        background: var(--bg-base-lt);
        border: var(--border-container);
    }
}

.preferences > * {
    max-width: 1000px;
    width: 100%;
}

.wrapper {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1em;
}
</style>

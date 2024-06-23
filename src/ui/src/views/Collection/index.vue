<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="parent">
        <CollectionHeader class="header" />
        <main class="collection">
            <component :is="component" />
        </main>
    </div>
</template>

<script setup lang="ts">
import CollectionHeader from "@/components/CollectionHeader.vue";
import Albums from "./Albums.vue";
import Playlists from "./Playlists.vue";
import Releases from "./Releases.vue";
import Artists from "./Artists.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const component = computed(() => {
    switch (route.path.split("/")[2]) {
        case "albums":
            return Albums;
        case "playlists":
            return Playlists;
        case "releases":
            return Releases;
        case "artists":
            return Artists;
    }
});
</script>
<style scoped lang="scss">
.header {
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
    background-color: var(--bg-base);
}

main {
    position: relative;
    height: 100%;
    padding: 1em;
    padding-top: calc(70px + 1em);

    > div {
        height: 100%;
    }
}

.parent {
    height: 100%;
    position: relative;
}
</style>

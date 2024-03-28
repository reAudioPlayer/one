<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import PlayerInPicture from "./PlayerInPicture.vue";
import Header from "./Header.vue";

import { usePlayerStore } from "./store/player";
import { useSettingsStore } from "./store/settings";
import { ref, onMounted, watch, computed } from "vue";
import Startup from "@/views/Startup.vue";
import { initPictureInPicture } from "@/pictureInPicture";
import { getCover, generatePlaceholder } from "@/components/image/placeholder";
import Notifications from "@/components/notifications/NotificationHandler.vue";

initPictureInPicture();

const playerStore = usePlayerStore();
const settings = useSettingsStore();

const cover = ref(null);
watch(
    () => playerStore.song.cover,
    () => {
        setCover();
    }
);

const setCover = async () => {
    cover.value = await getCover(
        playerStore.song.cover,
        playerStore.song.title,
        200
    );
};
const setPlaceholder = async () => {
    cover.value = await generatePlaceholder(playerStore.song.title, 200);
};
setCover();

const coverAsBackground = computed(() => {
    return (window as any).getCurrentThemeProperty("coverAsBackground");
});

onMounted(() => {
    // if space is pressed and no element is focused
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space" && document.activeElement === document.body) {
            e.preventDefault();
            playerStore.playPause();
        } else if (e.code === "F1") {
            e.preventDefault();
            settings.mode.toggle();
        }
    });
});
</script>

<template>
    <div :class="{ hidden: !coverAsBackground }" class="bgImageWrapper">
        <div :style="{ backgroundImage: `url(${cover})` }" class="bgImage">
            <img :src="cover" class="hidden" @error="setPlaceholder" />
        </div>
    </div>
    <DropImport>
        <div id="appRoot" class="appRoot">
            <template v-if="playerStore.ready">
                <Header />
                <div class="interface">
                    <Sidebar v-if="!maximised" />
                    <Body @maximise="(val) => (maximised = val)" />
                </div>

                <Player />
                <PlayerInPicture v-if="!maximised" />
            </template>
            <template v-else>
                <Startup />
            </template>
        </div>
    </DropImport>
    <div id="popup-target"></div>
    <div id="dropdown-target"></div>
    <div id="autocomplete-target"></div>
    <Notifications />
</template>

<script lang="ts">
import "v-contextmenu/dist/themes/dark.css";

// January 2022, dxstiny (https://github.com/dxstiny)
// check out the README.md!

//import * as Vibrant from 'node-vibrant'
import themes from "./assets/themes.json";
import { connect } from "@/ws";
import { initialiseStores } from "@/store";
import { authoriseSpotify, isFirstRun } from "@/api/config";
import Sidebar from "@/Sidebar.vue";
import Body from "@/Body.vue";
import Player from "@/components/player/Player.vue";
import DropImport from "./DropImport.vue";

const LOCAL_STORAGE_KEY = "theme"; // change it to whatever you like

export default {
    name: "App",
    components: {
        Sidebar,
        Body,
        Player,
    },
    async mounted() {
        initialiseStores();
        connect();

        if (await isFirstRun()) {
            this.$router.push("/welcome");
        }

        await authoriseSpotify();
    },
    data() {
        return {
            maximised: false,
        };
    },
    watch: {
        $route(to) {
            document.title = to.meta.title || "reAudioPlayer One";
        },
    },
};
</script>
<style lang="scss">
.noLink {
    text-decoration: none;
    color: unset;

    &:hover {
        text-decoration: none;
        cursor: default;
        color: unset;
    }
}

.linkOnHover {
    text-decoration: none;
    color: unset;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
        color: var(--fg-base);
    }
}

.hidden {
    display: none;
}

.v-contextmenu {
    background: var(--fg-contrast) !important;
    font-family: var(--ff-base) !important;
    border: 1px solid var(--bg-hover-dk);
    border-radius: 1em;
    color: var(--fg-base) !important;

    .material-symbols-rounded {
        font-size: 1rem;
    }
}

.v-contextmenu-inner {
    padding: 0.5em;
}

.v-contextmenu-divider {
    border-color: var(--border-base);
}

.v-contextmenu-item {
    color: var(--fg-base) !important;
    padding: 0.75em;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    gap: 0.5em;

    .v-contextmenu-submenu {
        position: relative;
        width: 100%;

        > .v-contextmenu-item {
            padding: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 1em;
        }

        .v-contextmenu-submenu__arrow {
            position: relative;
        }
    }
}

.v-contextmenu-item--hover {
    background: var(--bg-hover-dk) !important;
}
</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700;900&display=swap");
</style>

<style lang="scss">
@import "./assets/css/scrollbars.css";
@import "./assets/css/main.css";
@import "./assets/css/material-symbols.css";

#app {
    font-family: var(--ff-base) !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: var(--bg-base);
    color: var(--fg-base) !important;
}

hr {
    border-color: var(--border-base);
}

div.interface {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    z-index: 2;
    max-height: calc(100vh - var(--h-player) - var(--h-header));

    @media only screen and (max-width: 750px) {
        max-height: calc(100vh - var(--h-player-mobile));
        overflow: auto;
        flex-direction: column;
    }
}

div.appRoot {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    height: 100svh;
}

html,
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
}

.bgImageWrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0 !important;
    background: black;
}

.bgImage {
    height: 100%;
    width: 100%;
    z-index: 0 !important;
    filter: blur(100px) brightness(0.75);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(1.1);
}

.mobileMenu {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

input[type="text"],
input[type="password"] {
    background: var(--hover-2);
    border: 1px solid var(--hover-3);
    border-radius: 5px;
    color: var(--font-colour);
    padding: 10px;
    width: auto;
    flex-grow: 1;
    font-family: var(--font-family);

    &:focus {
        outline: none;
    }

    &:hover {
        background: var(--hover-1);
        border: 1px solid var(--font-colour);
    }
}
</style>

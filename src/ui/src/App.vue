<script setup>
import Body from '@/Body.vue'
import Player from '@/Player.vue'
import Sidebar from '@/Sidebar.vue'
import PlayerInPicture from "./PlayerInPicture.vue";
import Header from './Header.vue';

import {usePlayerStore} from "@/store/player";
import {computed, ref, watch} from "vue";
import Startup from "@/views/Startup.vue";
import {parseAnyCover} from "@/common";
import {initPictureInPicture} from "@/pictureInPicture";

initPictureInPicture();

const playerStore = usePlayerStore();

const src = ref(playerStore.song.cover);
watch(() => playerStore.song.cover, () => {
    src.value = playerStore.song.cover;
});
const cover = computed(() => parseAnyCover(src.value));
</script>

<template>
    <div class="bgImageWrapper" :class="{ hidden: !coverAsBackground }">
        <div
            class="bgImage"
            :style="{ backgroundImage: `url(${cover})` }"
        >
            <img
                :src="cover"
                class="hidden"
                @error="src = null"
            />
        </div>
    </div>
    <div class="appRoot" id="appRoot">
        <template v-if="playerStore.ready">
            <Header/>
            <div class="interface">
                <Sidebar v-if="!maximised"/>
                <Body @maximise="val => maximised = val"/>
            </div>
            <Player v-if="!maximised"/>
            <PlayerInPicture v-if="!maximised"/>
        </template>
        <template v-else>
            <Startup />
        </template>
    </div>
</template>

<script>
import "v-contextmenu/dist/themes/dark.css";

// January 2022, dxstiny (https://github.com/dxstiny)
// check out the README.md!

//import * as Vibrant from 'node-vibrant'
import themes from "./assets/themes.json";
import {connect} from "@/ws";
import {initialiseStores} from "@/store";
import {useSettingsStore} from "@/store/settings";
import {authoriseSpotify, isFirstRun} from "@/api/config";


const LOCAL_STORAGE_KEY = "theme" // change it to whatever you like

export default {
    name: 'App',
    components: {
        Sidebar,
        Body,
        Player
    },
    async mounted() {
        const settings = useSettingsStore();

        window.getThemes = () => { // returns a string array of all available themes
            window.themes = []
            for (const key of Object.keys(themes)) {
                for (const theme of Object.keys(themes[key])) {
                    if (!window.themes.includes(theme)) {
                        window.themes.push(theme)
                    }
                }
            }
            return window.themes;
        }

        window.getCurrentTheme = () => {
            return settings.theme;
        }

        window.setTheme = (theme) => { // accepts a string (theme name)
            if (!window.getThemes().includes(theme)) {
                return;
            }

            settings.theme = theme;

            for (const key of Object.keys(themes)) {
                const value = themes[key]

                if (key == "coverAsBackground") {
                    this.coverAsBackground = Boolean(value[theme]);
                    continue;
                }

                document.documentElement.style.setProperty(`--${key}`, value[theme] || value.dark);
            }
        }

        window.setTheme(settings.theme || "dynamic") // optional, loads the default theme

        initialiseStores();
        connect();

        if (await isFirstRun()) {
            this.$router.push("/welcome")
        }

        await authoriseSpotify();
    },
    data() {
        return {
            maximised: false,
            coverAsBackground: false
        }
    },
    watch: {
        '$route'(to) {
            document.title = to.meta.title || 'reAudioPlayer One'
        }
    },
}
</script>

<!-- Popups -->
<style lang="scss">
.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0000;
}

.modal-content {
    position: absolute;
    width: 40%;
    max-height: 80vh;
    padding: 16px;
    /*overflow: hidden;*/
    background: var(--font-contrast);
    border-radius: 10px;
    color: var(--font-colour);

    display: flex;
    flex-direction: column;
}

.modal-close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    font-size: 1.5em;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--font-darker);
}

h3 {
    margin: 0;
}

.modal-close:hover {
    color: var(--font-colour);
}

.material-symbols-rounded {
    font-variation-settings: 'FILL' 0,
    'wght' 100,
    'GRAD' -25,
    'opsz' 48
}
</style>

<style lang="scss">
.linkOnHover {
    text-decoration: none;
    color: unset;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
        color: var(--font-colour);
    }
}

.hidden {
    display: none;
}

.v-contextmenu {
    background: var(--font-contrast) !important;
    font-family: var(--font-family) !important;
    border: 1px solid var(--hover-1);
    /*box-shadow: 2px 2px 8px 0 var(--hover-4) !important;
--webkit-box-shadow: 2px 2px 8px 0 var(--hover-4) !important;*/
    box-shadow: none;
    --webkit-box-shadow: none;
    color: var(--font-colour) !important;
}

.v-contextmenu-divider {
    border-color: var(--border);
}

.v-contextmenu-item {
    color: var(--font-colour) !important;
    margin: 5px;
    padding: 10px 22px 10px 15px;
    border-radius: 5px;
}

.v-contextmenu-item--hover {
    background: var(--hover-1) !important;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
</style>

<style lang="scss">
@import "./assets/css/scrollbars.css";
@import "./assets/css/main.css";
@import "./assets/css/material-symbols.css";

#app {
    font-family: var(--font-family) !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: var(--background);
    color: var(--font-colour) !important;
}

hr {
    border-color: var(--font-darker)
}

$horizontalWidth: 1200px;
$mobileWidth: 950px;

div.interface {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    z-index: 2;
    max-height: calc(100vh - var(--player-height) - var(--header-height));

    @media screen and (max-width: $mobileWidth) {
        flex-direction: column;
    }
}

div.appRoot {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

html,
body {
    margin: 0;
    padding: 0;
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
    filter: blur(100px);
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

.hideIfMobile {
    @media screen and (max-width: $mobileWidth) {
        display: none !important;
    }
}

.showIfMobile {
    @media screen and (min-width: $mobileWidth) {
        display: none !important;
    }
}

input[type="text"], input[type="password"] {
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
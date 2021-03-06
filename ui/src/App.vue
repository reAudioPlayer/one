<script setup>
import Body from '@/Body.vue'
import Player from '@/Player.vue'
import Sidebar from '@/Sidebar.vue'
import PlayerInPicture from "./PlayerInPicture.vue";
</script>

<template>
    <div class="appRoot" id="appRoot">
        <div class="bgImageWrapper" :class="{ hidden: !coverAsBackground }" ><div class="bgImage" :style="{ backgroundImage: `url(${cover})` }" /></div>
        <div class="interface">
            <Sidebar v-if="!maximised" @expandCover="expandCover" :expandCover="shallExpandCover" />
            <Body @maximise="val => maximised = val" />
        </div>
        <Player v-if="!maximised" @expandCover="expandCover" :expandCover="!shallExpandCover" />
        <PlayerInPicture v-if="!maximised" @expandCover="expandCover" :expandCover="!shallExpandCover" />
    </div>
</template>

<script>
    import "v-contextmenu/dist/themes/dark.css";

    // January 2022, dxstiny (https://github.com/dxstiny)
    // check out the README.md!

    //import * as Vibrant from 'node-vibrant'
    import themes from "./assets/themes.json";
    //fetch("/assets/themes/themes.json").then(x => x.json()).then(json => themes = json) // in case you can't use import


    const LOCAL_STORAGE_KEY = "theme" // change it to whatever you like

    export default {
        name: 'App',
        components: {
            Sidebar,
            Body,
            Player
        },
        mounted() {
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
                return window.localStorage.getItem(LOCAL_STORAGE_KEY) || "jade"
            }

            window.setTheme = (theme) => { // accepts a string (theme name)
                if (!window.getThemes().includes(theme)) {
                    return;
                }

                window.localStorage.setItem(LOCAL_STORAGE_KEY, theme)

                for (const key of Object.keys(themes)) {
                    const value = themes[key]

                    if (key == "coverAsBackground")
                    {
                        this.coverAsBackground = Boolean(value[theme])
                        window.localStorage.setItem("player.coverAsBackground", this.coverAsBackground ? "true" : "false")
                        continue;
                    }

                    document.documentElement.style.setProperty(`--${key}`, value[theme] || value.dark);
                }
            }

            window.setTheme(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "jade") // optional, loads the default theme
        },
        data() {
            const connect = () => {
                console.log("attempting reconnect")
                let ws = new WebSocket('ws://localhost:1234/ws');

                ws.onclose = () => {
                    console.log("ws closed")

                    setTimeout(connect, 1000);
                }

                ws.onopen = () => {
                    console.log("ws connected")
                }

                ws.onmessage = msg => {
                    const jdata = JSON.parse(msg.data);
                    this.updateData(jdata)
                }
            }
            connect()
            return {
                cover: null,
                shallExpandCover: window.localStorage.getItem("player.expandCover") == "true",
                maximised: false,
                coverAsBackground: window.localStorage.getItem("player.coverAsBackground") == "true"
            }
        },
        watch: {
            '$route' (to) {
                document.title = to.meta.title || 'reAudioPlayer One'
            }
        },
        methods: {
            expandCover(shallExpand) {
                this.shallExpandCover = shallExpand
                window.localStorage.setItem("player.expandCover", shallExpand)
            },
            updateData(jdata) {
                if (jdata.path == "player.song") {
                    this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"
                    if (window.getCurrentTheme() == "dynamic") {
                        console.log(this.cover)
                        /*Vibrant.from(this.cover).getPalette()
                            .then((palette) => {
                                /*for (const key of Object.keys(themes)) {
                                    const value = themes[key]
                                    document.documentElement.style.setProperty(`--${key}`, value[theme] || value.default);
                                }*
                                console.log(palette)
                                document.documentElement.style.setProperty(`--accent-dark`, palette.DarkVibrant.hex);
                                document.documentElement.style.setProperty(`--fixedplaylistheader-background`, palette.DarkVibrant.hex);
                                document.documentElement.style.setProperty(`--fixedplaylistheader-border`, palette.DarkVibrant.hex);
                                document.documentElement.style.setProperty(`--fixedplaylistheader-border`, palette.DarkVibrant.hex);
                                document.documentElement.style.setProperty(`--accent`, palette.Vibrant.hex);
                            })*/
                    }
                    return;
                }
            }
        }
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
        position: relative;
        width: 40%;
        max-height: 70vh;
        padding: 16px;
        overflow: auto;
        background: var(--font-contrast);
        border-radius: 10px;
        color: var(--font-colour);
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
        font-variation-settings:
        'FILL' 0,
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

    input[type="text"] {
        background: var(--hover-2);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font-colour);
        padding: 10px;
        width: auto;
        flex-grow: 1;
        font-family: var(--font-family);
    }

    input[type="text"]:focus {
        outline: none;
    }

    input[type="text"]:hover {
        background: var(--hover-1);
        border: 1px solid var(--font-colour);
    }
</style>
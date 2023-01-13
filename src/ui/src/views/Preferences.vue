<script setup>
import FullShelf from "../components/Catalogue/FullShelf.vue"
import Theme from "../components/Preferences/Theme.vue"

import { Buffer } from 'buffer';
window.Buffer = Buffer;
import {useSettingsStore} from "@/store/settings";
import {ref} from "vue";

const host = window.location.host
const spotifyRedirect = `http://${host}/api/spotify/callback`

const settings = useSettingsStore();
const themeSelected = ref(window.getCurrentTheme());
const spotifyClient = ref({
    secret: "",
    id: ""
})
const themes = [ "dynamic", "light", "dark" ];

const updateThemes = () => {
    themeSelected.value = window.getCurrentTheme()
}

const saveRestrictedMode = () => {
    spotifyClient.value.id = spotifyClient.value.secret = "";

    fetch("/api/config/spotify", {
        method: "POST",
        body: JSON.stringify({
            "id": "restricted",
            "secret": "restricted"
        })
    }).then(x => console.log(x))
}

const saveSpotify = () => {
    if (Object.values(spotifyClient.value).some(x => x === "")) {
        return;
    }

    fetch("/api/config/spotify", {
        method: "POST",
        body: JSON.stringify(spotifyClient.value)
    }).then(x => console.log(x))
}
</script>
<template>
    <div class="preferences">
        <div class="padding-10">
            <div class="sidebar" v-if="false">
                <h2>Data Backup</h2>
                <div class="wrapTogether spaceBetween">
                    <button @click="$router.push('/export')">Save</button>
                    <button @click="$router.push('/import')">Restore</button>
                </div>
            </div>
            <div class="spotify">
                <h2>Spotify</h2>
                <details>
                    <summary class="cursor-pointer">How to</summary>
                <p>1) Head over to the <a href="https://developer.spotify.com/dashboard/applications" target="_blank">spotify developer dashboard</a></p>
                <p>2) Create An App</p>
                <p>3) Enter any name and any description</p>
                <p>4) Edit the settings: set the redirect url to <a :href="spotifyRedirect">{{spotifyRedirect}}</a></p>
                <p>5) Copy and enter the client id and secret into the corresponding input field</p>
                </details>
                <div class="wrapTogether">
                    <p>Client ID: </p><input type="text" v-model="spotifyClient.id" />
                </div>
                <div class="wrapTogether">
                    <p>Client Secret: </p><input type="text" v-model="spotifyClient.secret" />
                </div>
                <div class="wrapTogether spaceBetween">
                    <button @click="saveSpotify">save</button>
                    <button @click="saveRestrictedMode" class="restrictedMode">enter restricted mode</button>
                </div>
            </div>
        </div>
        <div>
            <h2>Themes</h2>
            <full-shelf :key="themeSelected">
                <theme @selected="updateThemes" v-for="(theme, index) in themes" :key="index"
                    :name="theme" />
            </full-shelf>
        </div>
        <div class="sidebar">
            <h2>Sidebar</h2>
            <div class="checkbox">
                <input v-model="settings.sidebar.news" type="checkbox" id="checkbox" name="" value="">
                <label for="checkbox"><span>Show "News" tab</span></label>
            </div>

            <div class="checkbox">
                <input v-model="settings.sidebar.sports" type="checkbox" id="checkbox2" name="" value="">
                <label for="checkbox2"><span>Show "Sports" tab</span></label>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .preferences, .padding-20 {
        padding: 20px;
    }

    .preferences {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .padding-10 {
        padding: 10px;
    }

    h2 {
        font-size: 1.5em;
    }

    p {
        margin: 0;
    }

    button {
        color: var(--font-contrast);
        background-color: var(--font-colour);
        border: none;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 10px 20px;
        font-family: var(--font-family);
        font-weight: bold;

        &:not(:first-child) {
            margin-left: 20px;
        }
    }

    button:hover {
        cursor: pointer;
    }

    .restrictedMode {
        color: white;
        background-color: #c73c3c;
    }

    input[type="checkbox"] {
        color: var(--font-contrast);
        background-color: var(--font-colour);

        &:checked {
            color: var(--accent);
            background-color: var(--accent);
        }

        &.disabled {
            color: var(--font-colour);
            background-color: var(--font-colour);
        }
    }

    input[type="text"] {
        margin-bottom: 20px;
        width: 20vw !important;
    }
</style>

<style scoped lang="scss">
.checkbox {
  width: 100%;
  margin: 15px auto;
  position: relative;
  display: block;
}
.checkbox label {
  position: relative;
  min-height: 34px;
  display: block;
  padding-left: 40px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}
.checkbox label span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.checkbox {
    label:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        margin: 4px;
        width: 22px;
        height: 22px;
        transition: transform 0.28s ease;
        border-radius: 3px;
        border: 2px solid var(--font-colour);
        transition: border ease 0.25s;
    }

    &.disabled label {
        &:before, &:after {
            border-color: var(--font-darker) !important;
        }
    }
}
.checkbox label:after {
  content: "";
  display: block;
  width: 10px;
  height: 5px;
  border-bottom: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
  transform: rotate(-45deg) scale(0);
  transition: transform ease 0.25s;
  position: absolute;
  top: 12px;
  left: 10px;
}
.checkbox input[type=checkbox] {
  width: auto;
  opacity: 1e-8;
  position: absolute;
  left: 0;
  margin-left: -20px;
}
.checkbox input[type=checkbox]:checked ~ label:before {
  border: 2px solid var(--accent);
  transition: border ease 0.25s;
}
.checkbox input[type=checkbox]:checked ~ label:after {
  transform: rotate(-45deg) scale(1);
}
.checkbox input[type=checkbox]:focus + label::before {
  outline: 0;
}
</style>

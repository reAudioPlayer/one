<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Checkbox from "../../components/inputs/Checkbox.vue";
import { computed, ref } from "vue";
import Card from "../../containers/Card.vue";
import PasswordInputWithIcon from "../../components/inputs/PasswordInputWithIcon.vue";
import { useSettingsStore } from "../../store/settings";
import Theme from "../../components/Preferences/Theme.vue";
import IconButton from "../../components/inputs/IconButton.vue";
import Dropdown from "../../components/inputs/Dropdown.vue";
import { getConfig, IConfig, setConfig } from "../../api/config";
import TextInputWithIcon from "../../components/inputs/TextInputWithIcon.vue";

const spotifyEnabled = ref(false);
const spotifyClient = ref({
    id: "",
    secret: ""
});
const spotifyChanged = computed(() => {
    if (!spotifyEnabled.value) {
        return currentSpotifyConfig.value.enabled;
    }

    if (Object.values(spotifyClient.value).some(x => x === "")) {
        return false;
    }

    return spotifyClient.value.id !== currentSpotifyConfig.value.id
        || spotifyClient.value.secret !== currentSpotifyConfig.value.secret
        || spotifyEnabled.value !== currentSpotifyConfig.value.enabled;
});
const currentSpotifyConfig = ref({
    id: "",
    secret: "",
    enabled: false
});

fetch("/api/config/spotify").then(async x => {
    let jdata = {
        id: "",
        secret: "",
        enabled: false
    };

    if (x.status == 200) {
        jdata = await x.json();
    }
    else if ([204, 401].includes(x.status)) {
        jdata = {
            id: "restricted",
            secret: "restricted",
            enabled: false
        };
    }
    else {
        throw new Error("Failed to fetch spotify config");
    }

    currentSpotifyConfig.value = jdata;
    currentSpotifyConfig.value.enabled = ![ jdata.id, jdata.secret ].includes("restricted");
    spotifyEnabled.value = currentSpotifyConfig.value.enabled;
    spotifyClient.value.id = jdata.id.replace("restricted", "");
    spotifyClient.value.secret = jdata.secret.replace("restricted", "");
});
const saveSpotify = async () => {
    if (!spotifyChanged.value) return;

    let id = spotifyClient.value.id;
    let secret = spotifyClient.value.secret;

    if (!spotifyEnabled.value) {
        secret = id = "restricted";
    }

    const res = await fetch("/api/config/spotify", {
        method: "POST",
        body: JSON.stringify({
            id,
            secret
        })
    });
    if (res.ok) {
        currentSpotifyConfig.value = {
            id,
            secret,
            enabled: spotifyEnabled.value
        };
    }
};

const config = ref(null as IConfig | null);
const cachedConfig = ref("");
getConfig().then(x => {
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
}

const settings = useSettingsStore();

const themes = [ "dynamic", "light", "dark" ];

const clearBrowser = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
};

const host = window.location.host
const spotifyRedirect = `http://${host}/api/spotify/callback`
</script>
<template>
    <div class="p-[10px] preferences">
        <Card aria-description="spotify" class="p-4 pt-0">
            <Checkbox
                v-model="spotifyEnabled"
                class="h2 mb-2"
                label="Spotify"
            />
            <details>
                <summary class="cursor-pointer">How to</summary>
                <p>1) Head over to the <a href="https://developer.spotify.com/dashboard/applications" target="_blank">spotify developer dashboard</a></p>
                <p>2) Create An App</p>
                <p>3) Enter any name and any description</p>
                <p>4) Edit the settings: set the redirect url to <a :href="spotifyRedirect">{{spotifyRedirect}}</a></p>
                <p>5) Copy and enter the client id and secret into the corresponding input field</p>
            </details>
            <hr class="my-4">
            <h5>Client ID: </h5>
            <PasswordInputWithIcon
                v-model="spotifyClient.id"
                :disabled="!spotifyEnabled"
                icon="token"
            />
            <h5 class="mt-4">Client Secret: </h5>
            <PasswordInputWithIcon
                v-model="spotifyClient.secret"
                :disabled="!spotifyEnabled"
                icon="lock"
            />
            <IconButton
                :disabled="!spotifyChanged"
                class="ml-auto mt-4"
                icon="save"
                label="Save"
                @click="saveSpotify"
            />
        </Card>
        <Card aria-description="player" class="p-4 pt-0">
            <h2 class="mt-[10px]">Player</h2>
            <Checkbox
                v-model="settings.player.pictureInPicture"
                label="Support Picture in Picture"
                sublabel="this will slightly reduce performance"
            />
            <Dropdown
                v-model="settings.player.type"
                :options="[{
                    value: 'web',
                    label: 'Native player',
                    icon: 'horizontal_rule'
                }, {
                    value: 'web/wave',
                    label: 'Wave player',
                    icon: 'graphic_eq'
                }]"
                icon="music_note"
            />
        </Card>
        <Card aria-description="theme" class="p-4 pt-0">
            <h2 class="mt-[10px]">Theme</h2>
            <Checkbox
                v-model="settings.ambient"
                :disabled="!settings.themeSupportsAmbient"
                label="Ambient"
            />
            <div class="themes">
                <Theme
                    v-for="(theme, index) in themes"
                    :key="index"
                    :name="theme"
                />
            </div>
        </Card>
        <Card aria-description="sidebar" class="p-4 pt-0">
            <h2 class="mt-[10px]">Sidebar</h2>
            <Checkbox
                v-model="settings.sidebar.news"
                label="Show 'News' Tab"
            />
            <Checkbox
                v-model="settings.sidebar.sports"
                label="Show 'Sports' Tab"
            />
        </Card>
        <Card aria-description="cache behaviour" class="p-4 pt-0">
            <h2 class="mt-[10px]">Cache Behaviour</h2>
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
                :options="[{
                    value: 'all',
                    label: 'All Songs'
                }, {
                    value: 'playlist',
                    label: 'Current Playlist'
                }, {
                    value: 'currentNext',
                    label: 'Current + Next Song '
                }, {
                    value: 'current',
                    label: 'Current Song Only'
                }]"
                icon="cached"
            />
            <IconButton
                :disabled="!config || !configChanged"
                class="ml-auto mt-4"
                icon="save"
                label="Save"
                @click="updateConfig"
            />
        </Card>
        <Card aria-description="github settings" class="p-4 pt-0">
            <h2 class="mt-[10px]">Github</h2>
            <h5 class="mt-4">PAT: </h5>
            <TextInputWithIcon
                v-if="config"
                v-model="config.github.githubPat"
                icon="lock"
            />
            <h5 class="mt-4">Gist ID: </h5>
            <TextInputWithIcon
                v-if="config"
                v-model="config.github.gistId"
                icon="numbers"
            />
            <IconButton
                :disabled="!config || !configChanged"
                class="ml-auto mt-4"
                icon="save"
                label="Save"
                @click="updateConfig"
            />
        </Card>
        <Card aria-description="my data" class="p-4 pt-0">
            <h2 class="mt-[10px]">My Data</h2>
            <IconButton
                class="mx-auto mt-4"
                icon="backup"
                label="Back up database"
                @click="$router.push('/export')"
            />
            <IconButton
                class="mx-auto mt-4"
                icon="cloud_download"
                label="Import database"
                @click="$router.push('/import')"
            />
            <IconButton
                class="mx-auto mt-4"
                icon="delete"
                label="Clean browser settings"
                @click="clearBrowser"
            />
            <IconButton
                class="mx-auto mt-4"
                icon="folder"
                label="Manage files"
                @click="$router.push('/preferences/my-data')"
            />
        </Card>
    </div>
</template>
<style lang="scss" scoped>
.preferences {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 10px;

    .themes {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;

        .wrapper {
            max-width: 200px;
        }
    }
}
</style>
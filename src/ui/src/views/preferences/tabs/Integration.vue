<script lang="ts" setup>
import Checkbox from "../../../components/inputs/Checkbox.vue";
import { computed, ref, watch } from "vue";
import PasswordInputWithIcon from "../../../components/inputs/PasswordInputWithIcon.vue";
import IconButton from "../../../components/inputs/IconButton.vue";
import { getConfig, IConfig, setConfig } from "../../../api/config";
import TextInputWithIcon from "../../../components/inputs/TextInputWithIcon.vue";
import gistClient from "../../../api/gistClient";

const spotifyEnabled = ref(false);
const spotifyClient = ref({
    id: "",
    secret: "",
});
const spotifyChanged = computed(() => {
    if (!spotifyEnabled.value) {
        return currentSpotifyConfig.value.enabled;
    }

    if (Object.values(spotifyClient.value).some((x) => x === "")) {
        return false;
    }

    return (
        spotifyClient.value.id !== currentSpotifyConfig.value.id ||
        spotifyClient.value.secret !== currentSpotifyConfig.value.secret ||
        spotifyEnabled.value !== currentSpotifyConfig.value.enabled
    );
});
const currentSpotifyConfig = ref({
    id: "",
    secret: "",
    enabled: false,
});

fetch("/api/config/spotify").then(async (x) => {
    let jdata = {
        id: "",
        secret: "",
        enabled: false,
    };

    if (x.status == 200) {
        jdata = await x.json();
    } else if ([204, 401].includes(x.status)) {
        jdata = {
            id: "restricted",
            secret: "restricted",
            enabled: false,
        };
    } else {
        throw new Error("Failed to fetch spotify config");
    }

    currentSpotifyConfig.value = jdata;
    currentSpotifyConfig.value.enabled = ![jdata.id, jdata.secret].includes(
        "restricted"
    );
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
            secret,
        }),
    });
    if (res.ok) {
        currentSpotifyConfig.value = {
            id,
            secret,
            enabled: spotifyEnabled.value,
        };
    }
};

const config = ref(null as IConfig | null);
const cachedConfig = ref("");
getConfig().then((x) => {
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
};

const host = window.location.host;
const spotifyRedirect = `http://${host}/api/spotify/callback`;

watch(
    () => config.value?.github?.githubPat,
    async () => {
        if (!config.value?.github?.githubPat) return;
        if (config.value.github.gistId) return;

        config.value.github.gistId = await gistClient.search(
            config.value.github.githubPat
        );
        console.log(config.value.github.gistId);
    }
);
</script>
<template>
    <Checkbox v-model="spotifyEnabled" class="h3 mb-2" label="Spotify" />
    <details>
        <summary class="cursor-pointer">How to</summary>
        <p>
            1) Head over to the
            <a
                href="https://developer.spotify.com/dashboard/applications"
                target="_blank"
                >spotify developer dashboard</a
            >
        </p>
        <p>2) Create An App</p>
        <p>3) Enter any name and any description</p>
        <p>
            4) Edit the settings: set the redirect url to
            <a :href="spotifyRedirect">{{ spotifyRedirect }}</a>
        </p>
        <p>
            5) Copy and enter the client id and secret into the corresponding
            input field
        </p>
    </details>
    <hr class="my-4" />
    <h5>Client ID:</h5>
    <PasswordInputWithIcon
        v-model="spotifyClient.id"
        :disabled="!spotifyEnabled"
        icon="token"
    />
    <h5 class="mt-4">Client Secret:</h5>
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
    <h3 class="mt-[10px]">Github</h3>
    <h5 class="mt-4">PAT:</h5>
    <TextInputWithIcon
        v-if="config"
        v-model="config.github.githubPat"
        icon="lock"
    />
    <h5 class="mt-4">Gist ID:</h5>
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
</template>

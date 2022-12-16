<template>
    <div class="onboarding p-4">
        <h1>So nice to meet you!</h1>
        <p>Let's get you set up</p>
        <IconButton
            icon="add"
            label="create your first playlist"
            @click="redirect('/playlist/create')"
        />
        <IconButton
            icon="import_export"
            label="import from Spotify"
            @click="redirect('/collection/playlists')"
        />
    </div>
</template>

<script lang="ts" setup>
import {authoriseSpotify} from "../../api/config";
import {ref} from "vue";
import IconButton from "../../components/elements/IconButton.vue";
import {useRouter} from "vue-router";

const spotifyEnabled = ref(false);
const router = useRouter();

authoriseSpotify().then(x => {
    spotifyEnabled.value = x;
});

const redirect = to => {
    router.push(to);
}
</script>

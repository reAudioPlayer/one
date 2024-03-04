<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="onboarding p-4">
        <h1>So nice to meet you!</h1>
        <p>Let's get you set up</p>

        <div class="grid grid-cols-2 gap-4 mt-8">
            <Card class="p-4">
                <div class="flex flex-row items-center">
                    <span
                        class="material-symbols-rounded ms-wght-700 text-4xl mr-4"
                        >add</span
                    >
                    <h2>Create your first playlist</h2>
                </div>
                <Form ref="createForm" :options="createFormOptions.fields" />
                <div class="flex flex-row justify-end w-full">
                    <IconButton
                        @click="createFormOptions.submit.action()"
                        icon="add"
                        :label="createFormOptions.submit.label"
                    />
                </div>
            </Card>
            <Card v-if="spotifyPlaylists.length" class="p-4">
                <div class="flex flex-row items-center">
                    <SpotifyLogo class="spotify mr-4" />
                    <h2>Import from Spotify</h2>
                </div>
                <div class="spotify-playlists">
                    <PlaylistItem
                        v-for="playlist in spotifyPlaylists"
                        :playlist="{
                            ...playlist,
                            type: 'classic',
                            plays: 0,
                            href: `https://open.spotify.com/playlist/${playlist.id}`,
                        }"
                        is-spotify
                    />
                </div>
            </Card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { authoriseSpotify } from "@/api/config";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Card from "@/containers/Card.vue";
// @ts-ignore
import SpotifyLogo from "@/assets/images/src/spotify.svg";
import Form, {
    type IOption,
} from "../../components/popups/components/Form.vue";
import PlaylistItem from "@/components/playlist/PlaylistCard.vue";
import IconButton from "@/components/inputs/IconButton.vue";
import { createPlaylistWithMetadata } from "@/api/playlist";

const spotifyPlaylists = ref([]);
const spotifyEnabled = ref(false);
const createForm = ref(null);
const router = useRouter();

authoriseSpotify().then((x) => {
    spotifyEnabled.value = x;
});

fetch("/api/spotify/playlists")
    .then((x) => x.json())
    .then((jdata) => {
        spotifyPlaylists.value = jdata;
    });

const redirect = (to) => {
    router.push(to);
};

const createFormOptions = {
    fields: [
        {
            name: "name",
            placeholder: "Playlist name",
            icon: "title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            placeholder: "Playlist description",
            icon: "description",
            type: "text",
            required: false,
        },
    ] as IOption[],
    submit: {
        label: "Create",
        action: async () => {
            const data = createForm.value.toObject();
            await createPlaylistWithMetadata(data.name, data.description);
        },
    },
};
</script>

<style lang="scss">
.onboarding {
    .spotify {
        width: 30px;
        height: 30px;

        path {
            fill: var(--fg-base);
        }
    }
}
</style>

<style lang="scss" scoped>
.spotify-playlists {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>

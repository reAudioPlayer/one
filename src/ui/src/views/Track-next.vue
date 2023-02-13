<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { getRecommendations, getSongByHash, getSongMetadata } from "../api/song";
import { computed, onMounted, ref, watch } from "vue";
import { getCamelotKey, IMetadata, ISong, ISpotifySong, localeDate, openInNewTab, parseSpotifyId } from "../common";
import Loader from "../components/Loader.vue";
import Cover from "../components/image/Cover.vue";
import Card from "../containers/Card.vue";
import ProgressCircle from "../components/inputs/ProgressCircle.vue";
import ExternalEntry from "../components/songContainers/ExternalEntry.vue";
import { usePlayerStore } from "../store/player";
import TextInputWithIcon from "../components/inputs/TextInputWithIcon.vue";
import FactCard from "../containers/FactCard.vue";

const route = useRoute();
const player = usePlayerStore();

const hash = computed(() => route.params.hash as string);

const song = ref(null as ISong | null);
const spotifyUrl = ref(null as string | null);
const spotifyUrlIcon = ref("url");
const metadata = ref(null as IMetadata | null);
const recommendations = ref([] as ISpotifySong[]);
const circles = ref([] as { key: string; value: number, icon: string }[]);

const icons = {
    "acousticness": "piano",
    "danceability": "nightlife",
    "energy": "electric_bolt",
    "happiness": "mood",
    "instrumentalness": "mic_off",
    "liveness": "groups_2",
    "speechiness": "mic",
    "loudness": "volume_up",
}

const load = async (spotifyId: string = null) => {
    // reset
    song.value = null;
    metadata.value = null;
    recommendations.value = [];

    song.value = await getSongByHash(hash.value);

    window.document.title = `${song.value.title} - reAudioPlayer One`

    metadata.value = await getSongMetadata(song.value.id, !!spotifyId, spotifyId);
    spotifyUrl.value = `https://open.spotify.com/track/${metadata.value.spotify.id}`;
    recommendations.value = await getRecommendations(song.value.id)
    circles.value = [];

    for (let [key, value] of Object.entries(metadata.value.spotify.features)) {
        if (["key", "mode", "tempo", "duration_ms", "time_signature"].includes(key)) {
            continue;
        }
        if (typeof value !== "number") {
            continue;
        }

        key = key.replaceAll("_", " ");
        key = key.replace("valence", "happiness");

        if (key === "loudness") {
            value = 60 + value;
        }

        circles.value.push({
            key,
            value,
            icon: icons[key]
        });
    }
}

onMounted(load);
watch(route, load, { deep: true });
watch(spotifyUrl, () => {
    if (song.value?.metadata?.spotify?.id == parseSpotifyId(spotifyUrl.value, "track")) {
        spotifyUrlIcon.value = "link";
        return;
    }

    spotifyUrlIcon.value = "save";
});
const onSpotifyUrlClick = () => {
    if (spotifyUrlIcon.value === "save") {
        const id = parseSpotifyId(spotifyUrl.value, "track");
        if (!id) {
            return;
        }
        load(id);
        return;
    }

    openInNewTab(spotifyUrl.value);
}
</script>
<template>
<div class="track p-4">
    <Loader v-if="!song" />
    <div v-else class="wrap">
        <div
            class="track__data"
        >
            <div class="upper">
                <Cover
                    :src="song.cover"
                    class="max-w-sm rounded-xl"
                />
                <div
                    :class="{
                        'justify-end': metadata,
                        'justify-center': !metadata,
                    }"
                    class="track__info__details flex flex-col"
                >
                    <div class="trac__info__details__normal">
                        <h3 class="text-secondary my-0 text-2xl font-bold">
                            {{ song.artist }} <span class="text-muted text-base ml-2 font-light">• {{ song.album }}</span>
                        </h3>
                        <div class="flex flew-row items-center">
                            <span
                                class="text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto"
                                @click="player.loadPlaylist('track', song.id)"
                            >
                                play_circle
                            </span>
                            <h1
                                class="font-black text-5xl ml-4"
                            >
                                {{ song.title }}
                            </h1>
                        </div>
                    </div>
                    <template v-if="metadata && metadata.spotify.features">
                        <div
                        v-if="metadata && metadata.spotify.features"
                        class="features flex flex-row gap-4 mt-4"
                    >
                        <FactCard
                            :primary-text="metadata.spotify.features.key + ' ' + metadata.spotify.features.mode"
                            class="w-full"
                            secondary-text="Key"
                        />
                        <FactCard
                            :primary-text="getCamelotKey(metadata)"
                            class="w-full"
                            secondary-text="Camelot"
                        />
                        <FactCard
                            :primary-text="Math.round(metadata.spotify.features.tempo)"
                            class="w-full"
                            secondary-text="BPM"
                        />
                        <FactCard
                            :primary-text="song.duration"
                            class="w-full"
                            secondary-text="Duration"
                        />
                        </div>
                            <div class="spotify-infos mt-4">
                                <div class="meta items-center ">
                                    <span class="text-muted">{{ localeDate(metadata.spotify.releaseDate) }}</span>
                                    <span v-if="metadata.spotify.explicit" class="material-symbols-rounded ms-fill">explicit</span>
                                    <span class="flex flex-row align-items">
                                        <span class="material-symbols-rounded ms-fill mr-2">local_fire_department</span>
                                        <span class="font-bold">{{ metadata.spotify.popularity }}</span>
                                    </span>
                                </div>
                                <TextInputWithIcon
                                    v-model="spotifyUrl"
                                    :icon="spotifyUrlIcon"
                                    :onClick="onSpotifyUrlClick"
                                />
                            </div>
                    </template>
                </div>
            </div>
            <Card
                v-if="recommendations.length"
                class="p-4 mt-8"
            >
                <h2 class="!text-left">Similar Songs</h2>
                <ExternalEntry
                    v-for="(recommendation, index) in recommendations"
                    :key="index"
                    :index="index"
                    :song="recommendation"
                    can-import
                    cannot-add
                    with-album
                    with-cover
                />
            </Card>
        </div>
        <aside class="spotify__features__circles mt-4">
            <Card
                v-for="circle in circles"
                class="p-2"
            >
                <ProgressCircle
                    v-if="circle.key === 'loudness'"
                    v-model="circle.value"
                    :display-value="Math.round(-60 + circle.value) + 'dB'"
                    class="circle"
                    max="60"
                />
                <ProgressCircle
                    v-else
                    v-model="circle.value"
                    :display-value="Math.round(circle.value * 100) + '%'"
                    class="circle"
                    max="1"
                />
                <p class="text-muted mb-0 text-center text-sm capitalize flex justify-center">
                    <span class="material-symbols-rounded mr-2">{{circle.icon}}</span>
                    {{ circle.key }}
                </p>
            </Card>
        </aside>
    </div>
</div>
</template>

<style lang="scss" scoped>
.track__data .upper {
    display: grid;
    grid-template-columns: fit-content(100%) minmax(500px, 1fr);
    gap: 2rem;
}

.spotify-infos {
    display: grid;
    grid-template-columns: fit-content(100%) 1fr;
    gap: 1rem;

    .meta {
        display: grid;
        grid-template-columns: repeat(3, fit-content(100%));

        >*:not(:last-child) {
            margin-right: 1rem;
        }
    }
}

.card {
    p, h2 {
        text-align: center;
    }
}

.wrap {
    grid-template-columns: 2fr 1fr;
    display: grid;
    align-items: start;
}

.spotify__features__circles {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
    margin-left: 1rem;

    div {
        min-width: 150px;
        flex: 1;
    }

    .circle {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    p {
        text-align: center;
    }
}
</style>
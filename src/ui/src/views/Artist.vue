<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { ISong, openInNewTab, parseSpotifyId } from "../common";
import Cover from "../components/image/Cover.vue";
import AmbientBackground from "../components/image/AmbientBackground.vue";
import FactCard from "../containers/FactCard.vue";
import PlaylistHeader from "../components/songContainers/PlaylistHeader.vue";
import PlaylistEntry from "../components/songContainers/PlaylistEntry.vue";
import Loader from "../components/Loader.vue";
import Tag from "../containers/Tag.vue";
import ExternalEntry from "../components/songContainers/ExternalEntry.vue";
import Card from "../containers/Card.vue";
import TextInputWithIcon from "../components/inputs/TextInputWithIcon.vue";

const route = useRoute();
const router = useRouter();
const artistName = computed(() => route.params.name as string);

interface IArtist {
    name: string;
    cover: string;
    songs: ISong[];
    metadata: {
        id: string;
        description: string;
        genres: string[];
        followers: number;
        popularity: number;
        topTracks: ISong[];
        related: IArtist[];
    }
}

const artist = ref<IArtist>(null);
const selectedSongId = ref(null as number | null);
const spotifyUrl = ref(null as string | null);
const spotifyUrlIcon = ref("url");

const load = async () => {
    const res = await fetch(`/api/artists/${artistName.value}`);
    artist.value = await res.json();
    selectedSongId.value = null;
    spotifyUrl.value = "https://open.spotify.com/artist/" + artist.value.metadata.id;
    spotifyUrlIcon.value = "link";
}

watch(spotifyUrl, () => {
    if (artist.value?.metadata?.id == parseSpotifyId(spotifyUrl.value, "artist")) {
        spotifyUrlIcon.value = "link";
        return;
    }

    spotifyUrlIcon.value = "save";
});

const onSpotifyUrlClick = () => {
    openInNewTab(spotifyUrl.value);
}

onMounted(load);
watch(() => route.params.name, () => {
    artist.value = null;
    load();
});
</script>
<template>
<AmbientBackground
    v-if="artist"
    :src="artist.cover"
    class="-z-10"
/>
<div v-if="!artist" class="fill-page">
    <Loader />
</div>
<div
    v-else
    class="artist p-4"
>
    <div
        class="wrap"
    >
        <div
            class="artist__data"
        >
            <div class="upper">
                <Cover
                    :src="artist.cover"
                    class="max-w-sm rounded-xl"
                    placeholder="person"
                />
                <div
                    :class="{
                        'justify-end': artist.metadata,
                        'justify-center': !artist.metadata,
                    }"
                    class="track__info__details flex flex-col"
                >
                    <div class="trac__info__details__normal">
                        <div v-if="artist.metadata?.genres" class="mt-0 mb-2 flex flex-row gap-2">
                            <Tag
                                v-for="genre in artist.metadata.genres"
                                :tag="genre"
                                with-hash
                            />
                        </div>
                        <div class="flex flew-row items-center">
                            <h1
                                class="font-black text-5xl ml-4"
                            >
                                {{ artist.name }}
                            </h1>
                        </div>
                    </div>
                    <template v-if="artist.metadata">
                        <div
                            class="features flex flex-row gap-4 mt-4 overflow-x-auto"
                        >
                            <FactCard
                                :primary-text="artist.metadata.followers.toLocaleString()"
                                class="w-full"
                                secondary-text="Followers"
                            />
                            <FactCard
                                :primary-text="artist.songs.length"
                                class="w-full"
                                secondary-text="Tracks in Your Library"
                            />
                        </div>
                        <div class="spotify-infos pt-4 pb-2">
                            <div class="meta items-center ">
                                <span class="flex flex-row align-items">
                                        <span class="material-symbols-rounded ms-fill mr-2">local_fire_department</span>
                                        <span class="font-bold">{{ artist.metadata.popularity }}</span>
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
            <PlaylistHeader
                class="hideIfMobile mt-8"
                with-album
                with-more
            />
            <hr class="mb-4">
            <div class="items">
                <PlaylistEntry
                    v-for="element in artist.songs"
                    v-show="true"
                    :index="artist.songs.findIndex(x => x.source == element.source)"
                    :selected="selectedSongId == element.id"
                    :song="element"
                    playlist-id="track"
                    with-album
                    with-cover
                    with-more
                    @click="selectedSongId == element.id ? selectedSongId = -1 : selectedSongId = element.id"
                    @update="$emit('update')"
                />
            </div>
            <div
                v-if="artist.metadata"
                class="spotify-suggestions mt-4"
            >
                <Card
                    v-if="artist.metadata.topTracks?.length"
                    class="p-4"
                >
                    <h2>Top Tracks</h2>
                    <div class="items">
                        <ExternalEntry
                            v-for="(element, index) in artist.metadata.topTracks"
                            :index="index"
                            :song="element"
                            with-album
                            with-cover
                            with-more
                            @update="$emit('update')"
                        />
                    </div>
                </Card>
                <Card
                    v-if="artist.metadata.related?.length"
                    class="p-4 flex flex-col gap-2 related overflow-y-auto"
                >
                    <h2>Related Artists</h2>
                    <Card
                        v-for="element in artist.metadata.related"
                        class="cursor-pointer px-4 py-2"
                        with-hover
                        @click="$router.push(`/artist/${element.name}`)"
                    >
                        <div
                            class="flex flex-row items-center gap-4"
                        >
                            <Cover
                                :src="element.cover"
                                class="w-8 h-8 rounded-xl"
                                placeholder="person"
                            />
                            <div
                                class="flex flex-col"
                            >
                                <h3
                                    class="font-bold"
                                >
                                    {{ element.name }}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Card>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.related {
    max-height: calc(768px + 1rem);
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

.spotify-suggestions {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: start;
    gap: 2rem;
}

.artist__data .upper {
    display: grid;
    grid-template-columns: fit-content(100%) minmax(500px, 1fr);
    gap: 2rem;
}

.wrap {
    grid-template-columns: 1fr;
    display: grid;
    align-items: start;
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { ISong } from "../common";
import Cover from "../components/image/Cover.vue";
import AmbientBackground from "../components/image/AmbientBackground.vue";
import FactCard from "../containers/FactCard.vue";
import PlaylistHeader from "../components/songContainers/PlaylistHeader.vue";
import PlaylistEntry from "../components/songContainers/PlaylistEntry.vue";
import Loader from "../components/Loader.vue";
import Tag from "../containers/Tag.vue";

const route = useRoute();
const router = useRouter();
const artistName = computed(() => route.params.name as string);

interface IArtist {
    name: string;
    cover: string;
    songs: ISong[];
    metadata: {
        description: string;
        genres: string[];
        followers: number;
        popularity: number;
    }
}

const artist = ref<IArtist>(null);
const selectedSongId = ref(null as number | null);

const load = async () => {
    const res = await fetch(`/api/artists/${artistName.value}`);
    artist.value = await res.json();
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
                                :primary-text="artist.metadata.popularity"
                                class="w-full"
                                secondary-text="Popularity"
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
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
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

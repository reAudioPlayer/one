<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="artists">
        <FetchLoader :response="localArtistsPromise">
            <full-shelf heading="In your library">
                <CardWithImageAndText
                    v-for="item in artists"
                    :title="item.name"
                    :cover="item.image"
                    @click="$router.push(`/artist/${item.name}`)"
                    imageType="artist"
                />
            </full-shelf>
        </FetchLoader>
        <FetchLoader :response="spotifyArtistsPromise">
            <full-shelf heading="Following on Spotify">
                <artist-item
                    v-for="(element, index) in spotifyArtists"
                    :id="element.id"
                    :key="index"
                    :cover="element.cover"
                    :description="element.description"
                    :name="element.name"
                    initially-following
                    show-follow-button
                />
            </full-shelf>
        </FetchLoader>
    </div>
</template>

<script lang="ts" setup>
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import ArtistItem from "@/components/Catalogue/Items/Artist/ArtistItem.vue";
import CardWithImageAndText from "@/containers/CardWithImageAndText.vue";
import { onMounted, ref } from "vue";
import FetchLoader from "../../components/FetchLoader.vue";

const spotifyArtists = ref([]);
const artists = ref([]);

const localArtistsPromise = ref<Promise<Response> | null>(null);
const spotifyArtistsPromise = ref<Promise<Response> | null>(null);

onMounted(async () => {
    localArtistsPromise.value = fetch("/api/artists");
    let res = await localArtistsPromise.value;
    let data = await res.json();
    artists.value = data.sort((a, b) => a.name.localeCompare(b.name));

    spotifyArtistsPromise.value = fetch("/api/spotify/artists");
    res = await spotifyArtistsPromise.value;
    data = await res.json();
    spotifyArtists.value = data.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
.artists {
    display: flex;
    flex-direction: column;
    gap: 1em;
}
</style>

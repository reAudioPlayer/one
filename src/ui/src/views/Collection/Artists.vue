<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div v-if="!loading">
        <div class="artists">
            <full-shelf heading="In your library">
                <CardWithImageAndText
                    v-for="item in artists"
                    :title="item.name"
                    :cover="item.image"
                    @click="$router.push(`/artist/${item.name}`)"
                    imageType="artist"
                />
            </full-shelf>
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
        </div>
    </div>
    <div class="fill-page" v-else><Loader /></div>
</template>

<script lang="ts" setup>
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import ArtistItem from "@/components/Catalogue/Items/Artist/ArtistItem.vue";
import CardWithImageAndText from "@/containers/CardWithImageAndText.vue";
import { onMounted, ref } from "vue";
import Loader from "../../components/Loader.vue";

const spotifyArtists = ref([]);
const artists = ref([]);
const loading = ref(true);

onMounted(async () => {
    let res = await fetch("/api/spotify/artists");
    let data = await res.json();
    spotifyArtists.value = data.sort((a, b) => a.name.localeCompare(b.name));

    res = await fetch("/api/artists");
    data = await res.json();
    artists.value = data.sort((a, b) => a.name.localeCompare(b.name));

    loading.value = false;
});
</script>

<style scoped>
.padding-20 {
    padding: 20px;
}
</style>

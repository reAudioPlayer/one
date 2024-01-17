<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="search">
        <div v-if="loading" class="fill-page">
            <Loader />
        </div>
        <div v-else-if="error" class="fill-page">
            <h1>Something went wrong</h1>
            <p>{{ error }}</p>
        </div>
        <template v-else>
            <div class="top flex gap-8">
                <div class="top min-w-max">
                    <h2>Top Result</h2>
                    <SearchResultItem :item="topResult" large />
                </div>
                <div class="list songs flex-1" v-if="songs.length">
                    <div class="flex justify-between items-center">
                        <h2>Songs</h2>
                        <span
                            v-if="songs.length > 4"
                            class="more cursor-pointer text-muted hover:text-primary text-sm uppercase"
                            @click="showAllSongs = !showAllSongs"
                        >
                            {{
                                showAllSongs
                                    ? "Show less"
                                    : `Show all ${songs.length} songs`
                            }}
                        </span>
                    </div>
                    <SearchResultItem
                        v-for="item in showAllSongs ? songs : songs.slice(0, 4)"
                        :item="item"
                    />
                </div>
            </div>
            <div class="flex flex-wrap flexibleSearchResults">
                <div
                    class="list flex-1 min-w-[40vw] artists"
                    v-if="artists.length"
                >
                    <h2>Artists</h2>
                    <SearchResultItem v-for="item in artists" :item="item" />
                </div>
                <div
                    class="list flex-1 min-w-[40vw] playlists"
                    v-if="playlists.length"
                >
                    <h2>Playlists</h2>
                    <SearchResultItem v-for="item in playlists" :item="item" />
                </div>
                <div
                    class="list flex-1 min-w-[40vw] albums"
                    v-if="albums.length"
                >
                    <h2>Albums</h2>
                    <SearchResultItem v-for="item in albums" :item="item" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Loader from "../../components/Loader.vue";
import { computed, onMounted, ref, watch } from "vue";
import { type ISearchResponse, SCOPES, TYPES } from "./search";
import SearchResultItem from "./SearchResultItem.vue";

const route = useRoute();

const loading = ref(true);
const error = ref(null);
const showAllSongs = ref(false);
const response = ref<ISearchResponse | null>(null);

const topResult = computed(() => {
    return response.value?.items?.[0];
});

const songs = computed(() => {
    return response.value?.items?.filter((item) => item.type === "song");
});

const artists = computed(() => {
    return response.value?.items?.filter((item) => item.type === "artist");
});

const playlists = computed(() => {
    return response.value?.items?.filter((item) => item.type === "playlist");
});

const albums = computed(() => {
    return response.value?.items?.filter((item) => item.type === "album");
});

const query = computed(() => route.params.query as string);
const scope = computed(() => {
    return [...SCOPES, ...TYPES];
});

const search = async () => {
    loading.value = true;
    error.value = null;
    const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
            query: query.value,
            scope: scope.value,
        }),
    });
    loading.value = false;
    if (!res.ok) {
        error.value = await res.text();
        return;
    }
    const jdata: ISearchResponse = await res.json();
    response.value = jdata;
};

onMounted(search);
watch(query, search);
</script>

<style lang="scss" scoped>
.search {
    padding: 20px;
    height: calc(100% - 40px);
}

input {
    margin-left: 10px;
    margin-bottom: 20px;
    width: 20vw !important;
}
</style>

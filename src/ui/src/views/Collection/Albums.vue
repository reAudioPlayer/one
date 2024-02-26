<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="padding-20" v-if="albums.length">
        <CollectionHeader />
        <div class="albums">
            <full-shelf heading="In your library">
                <CardWithImageAndText
                    v-for="item in albums"
                    :title="item.name"
                    :description="item.artists.join(', ')"
                    :cover="item.image"
                    @click="$router.push(item.href)"
                    imageType="album"
                />
            </full-shelf>
        </div>
    </div>
    <div class="fill-page" v-else><Loader /></div>
</template>

<script lang="ts" setup>
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import CollectionHeader from "@/components/CollectionHeader.vue";
import CardWithImageAndText from "@/containers/CardWithImageAndText.vue";
import { onMounted, ref } from "vue";
import Loader from "../../components/Loader.vue";

const albums = ref([]);

onMounted(async () => {
    const res = await fetch("/api/albums");
    const data = await res.json();
    albums.value = data.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
.padding-20 {
    padding: 20px;
}
</style>

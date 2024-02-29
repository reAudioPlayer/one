<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <FetchLoader :response="promise">
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
    </FetchLoader>
</template>

<script lang="ts" setup>
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import CardWithImageAndText from "@/containers/CardWithImageAndText.vue";
import { onMounted, ref } from "vue";
import FetchLoader from "../../components/FetchLoader.vue";

const albums = ref([]);
const promise = ref<Promise<Response> | null>(null);

onMounted(async () => {
    promise.value = fetch("/api/albums");
    const res = await promise.value;
    const data = await res.json();
    albums.value = data.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
.padding-20 {
    padding: 20px;
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div
        v-if="loading"
        class="fill-page"
    >
        <Loader />
    </div>
    <div class="padding-20">
        <CollectionHeader />
        <div class="releases">
            <full-shelf v-if="outSoon.length" heading="Out Soon">
                <item-big v-for="element in outSoon" :key="element.url" :artist="element.artists.join(', ')" :cover="element.cover" :href="element.url" :releaseDate="element.releaseDate" :title="element.title" />
            </full-shelf>
            <full-shelf v-if="outNow.length" heading="Out Now">
                <ItemBig v-for="element in outNow" :key="element.url" :artist="element.artists.join(', ')" :cover="element.cover" :href="element.url" :releaseDate="element.releaseDate" :title="element.title" />
            </full-shelf>
            <full-shelf v-if="outAlready.length" heading="Releases">
                <Item v-for="element in outAlready" :key="element.url" :artist="element.artists.join(', ')" :cover="element.cover" :href="element.url" :releaseDate="element.releaseDate" :title="element.title" />
            </full-shelf>
        </div>
    </div>
</template>

<script lang="ts">
import FullShelf from "@/components/Catalogue/FullShelf.vue";
import Item from "@/components/Catalogue/Items/Release/ReleaseItem.vue";
import ItemBig from "@/components/Catalogue/Items/Release/ReleaseItemBig.vue";
import CollectionHeader from "@/components/CollectionHeader.vue";
import Loader from "@/components/Loader.vue";

export default {
    components: { Loader, CollectionHeader, FullShelf, Item, ItemBig },
    name: 'Releases',
    data() {
        return {
            outSoon: [ ],
            outNow: [ ],
            outAlready: [ ],
            loading: true
        }
    },
    mounted() {
        this.loading = true;
        fetch("/api/releases")
            .then(x => x.json())
            .then(jdata => {
                const today = new Date()

                for (const album of jdata)
                {
                    const releaseDate = new Date(album.releaseDate)

                    if (today < releaseDate)
                    {
                        this.outSoon.push(album)
                    }
                    else if (today.getMonth() == releaseDate.getMonth() && today.getDate() == releaseDate.getDate() && today.getFullYear() == releaseDate.getFullYear())
                    {
                        this.outNow.push(album)
                    }
                    else
                    {
                        this.outAlready.push(album)
                    }
                }

                this.loading = false;
            })
    }
}
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }
</style>

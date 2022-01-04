<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="releases">
            <full-shelf v-if="outSoon.length" heading="Out Soon">
                <item-big v-for="element in outSoon" :key="element.url" :releaseDate="element.releaseDate" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
            </full-shelf>
            <full-shelf v-if="outNow.length" heading="Out Now">
                <Item v-for="element in outNow" :key="element.url" :releaseDate="element.releaseDate" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
            </full-shelf>
            <full-shelf v-if="outAlready.length" heading="Releases">
                <Item v-for="element in outAlready" :key="element.url" :releaseDate="element.releaseDate" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
import FullShelf from '../../Catalogue/FullShelf.vue'
import Item from '../../Catalogue/Item.vue'
import ItemBig from '../../Catalogue/ItemBig.vue'
import CollectionHeader from './CollectionHeader.vue'
    export default {
        components: { CollectionHeader, FullShelf, Item, ItemBig },
        name: 'Releases',
        data() {
            return {
                outSoon: [ ],
                outNow: [ ],
                outAlready: [ ]
            }
        },
        mounted() {
            fetch("http://localhost:1234/api/releases")
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
                })
        }
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="padding-20">
        <div class="news">
            <h1>News</h1>
            <div v-if="!news.length" class="fillPage">
                <Loader />
            </div>
            <full-shelf v-for="source in news" :key="source.source" :heading="source.source" class="mt-10">
                <news-item-big v-for="element in source.items" :key="element.url" :href="element.link" :image="element.image" :source="element.source" :summary="element.summary" :title="element.title" :updated="element.updated" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
import FullShelf from '../components/catalogue/FullShelf.vue'
import NewsItemBig from '../components/catalogue/Items/News/NewsItemBig.vue'
import Loader from "@/components/Loader.vue";

export default {
        components: {Loader, FullShelf, NewsItemBig },
        name: 'News',
        data() {
            return {
                news: [ ]
            }
        },
        mounted() {
            fetch("/api/news/articles")
                .then(x => x.json())
                .then(jdata => {
                    this.news.length = 0

                    for (const entry of jdata)
                    {
                        const i = this.news.findIndex(x => x.source == entry.source)
                        if (i >= 0)
                        {
                            this.news[i].items.push(entry)
                        }
                        else
                        {
                            this.news.push({
                                source: entry.source,
                                items: [ entry ]
                            })
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

    .fillPage {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - var(--h-header) - var(--h-player) - 200px);
    }
</style>

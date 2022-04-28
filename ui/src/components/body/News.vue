<template>
    <div class="padding-20">
        <div class="news">
            <h1>News</h1>
            <full-shelf v-for="source in news" :key="source.source" :heading="source.source">
                <news-item-big v-for="element in source.items" :key="element.url" :title="element.title" :image="element.image" :summary="element.summary" :href="element.link" :updated="element.updated" :source="element.source" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
import FullShelf from '../Catalogue/FullShelf.vue'
import NewsItemBig from '../Catalogue/Items/News/NewsItemBig.vue'
    export default {
        components: { FullShelf, NewsItemBig },
        name: 'News',
        data() {
            return {
                news: [ ]
            }
        },
        mounted() {
            fetch("/api/news")
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

    h1 {
        margin-left: 10px;
    }
</style>

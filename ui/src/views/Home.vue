<template>
    <div class="home">
        <h1>{{greeting}}</h1>
        <full-shelf-smaller-grid>
            <playlist-item-wide v-for="(element, index) in playlists" :key="index" :href="element.href" :cover="element.cover"
                        :title="element.name" :spotify="false" :id="index" />
        </full-shelf-smaller-grid>
        <shelf v-if="releases.length" heading="New releases for you" href="/collection/releases">
            <release-item v-for="element in releases" :key="element.url" :releaseDate="element.releaseDate" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
        </shelf>
        <shelf v-if="news.length" heading="Something to read while you're listening" href="/news">
            <news-item-big v-for="element in news" :key="element.url" :title="element.title" :image="element.image" :summary="element.summary" :href="element.link" :updated="element.updated" :source="element.source" />
        </shelf>
    </div>
</template>

<script>
import FullShelfSmallerGrid from '../components/Catalogue/FullShelfSmallerGrid.vue'
import NewsItemBig from '../components/Catalogue/Items/News/NewsItemBig.vue'
import PlaylistItemWide from '../components/Catalogue/Items/Playlists/PlaylistItemWide.vue'
import ReleaseItem from '../components/Catalogue/Items/Release/ReleaseItem.vue'
import Shelf from '../components/Catalogue/Shelf.vue'

import Hashids from 'hashids'
const hashids = new Hashids("reapOne.playlist", 22)

export default {
      components: { Shelf, ReleaseItem, PlaylistItemWide, FullShelfSmallerGrid, NewsItemBig },
    name: 'Home',
    data() {
        const time = new Date()
        const greeting = time.getHours() < 12 ? "Good morning" : time.getHours() < 18 ? "Good afternoon" : "Good evening"
        return {
            greeting,
            releases: [ ],
            playlists: [ ],
            news: [ ]
        }
    },
    mounted() {
        fetch("/api/config")
            .then(x => {
                if (x.status == 400)
                {
                    this.$router.push("/welcome")
                }
            })
        fetch("/api/releases")
            .then(x => x.json())
            .then(jdata => {
                this.releases.length = 0
                this.releases.push(...jdata)
            })
        if (window.localStorage.getItem("sidebar.showNewsTab") == "true")
        {
            fetch("/api/news/articles")
                .then(x => x.json())
                .then(jdata => {
                    this.news.length = 0
                    this.news.push(...jdata)
                })
        }
        fetch("/api/playlists")
            .then(x => x.json())
            .then(async jdata => {
                for (let i = 0; i < jdata.length; i++) {
                    const resp = await fetch(`/api/playlists/${i}`)
                    const pdata = await resp.json()
                    this.playlists.push({
                        name: pdata.name,
                        description: pdata.description,
                        cover: pdata.songs?.[0]?.cover || "/assets/img/music_placeholder.png",
                        href: `/playlist/${hashids.encode(i)}`
                    })
                }
            })
    }
}
</script>

<style scoped>
    .home {
        padding: 20px;
    }
</style>

<template>
    <div class="search">
        <input @keyup="enterText" v-model="query" type="text">
        <Shelf v-if="tracks.length" heading="Songs">
            <Item v-for="element in tracks" :key="element.url" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
        </Shelf>
        <Shelf v-if="spotifyTracks.length" heading="Songs (Spotify)">
            <search-item v-for="element in spotifyTracks" :key="element.url" :preview="element.preview" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
        </Shelf>
        <Shelf v-if="youtubeTracks.length" heading="Songs (Youtube)">
            <search-item v-for="element in youtubeTracks" :key="element.url" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
        </Shelf>
        <Shelf v-if="artists.length" heading="Artists">
            <Item v-for="element in artists" :key="element.url" :cover="element.cover" :href="element.url" :artist="element.artists.join(', ')" :title="element.title" />
        </Shelf>
        <Shelf v-if="spotifyArtists.length" heading="Artists (Spotify)">
            <artist-item v-for="(element, index) in spotifyArtists" :key="index" :cover="element.cover"
                    :description="element.description" :name="element.name" :id="element.id" :showFollowButton="true" />
        </Shelf>
    </div>
</template>

<script>
    import ArtistItem from '../Catalogue/Items/Artist/ArtistItem.vue'
    import Item from '../Catalogue/Items/Release/ReleaseItem.vue'
    import SearchItem from '../Catalogue/Items/Search/SearchItem.vue'
    import Shelf from "../Catalogue/Shelf.vue"

    export default {
        name: 'Search',
        components: {
            Shelf,
            Item,
            SearchItem,
            ArtistItem
        },
        data() {
            return {
                query: "",
                spotifyTracks: [ ],
                spotifyArtists: [ ],
                tracks: [ ],
                artists: [ ],
                youtubeTracks: [ ]
            }
        },
        methods: {
            search() {
                const query = this.$route.params.query

                if (!query)
                {
                    return
                }

                fetch("http://localhost:1234/api/search", {
                    method: "POST",
                    body: JSON.stringify({ query })
                }).then(x => x.json())
                  .then(jdata => {
                        this.spotifyTracks.length = 0;
                        this.spotifyArtists.length = 0;
                        this.tracks.length = 0;
                        this.artists.length = 0;
                        this.youtubeTracks.length = 0;

                        this.spotifyTracks.push(... (jdata.spotifyTracks || []) )
                        this.spotifyArtists.push(... (jdata.spotifyArtists || []) )
                        this.tracks.push(... (jdata.tracks || []) )
                        this.artists.push(... (jdata.artists || []) )
                        this.youtubeTracks.push(... (jdata.youtubeTracks || []) )
                  })

            },
            enterText(event) {
                if (event.key === "Enter") {
                    this.$router.push("/search/" + this.query)
                }
            }
        },
        watch: {
            $route() {
                this.search()
            }
        },
        mounted() {
            this.search()
        }
    }
</script>

<style scoped>
    .search {
        padding: 20px;
    }

    input {
        margin-left: 10px;
        margin-bottom: 20px;
        border-radius: 40px;
        border: none;
        padding: 10px;
        font-family: var(--font-family);
        width: 20vw;
    }

    input:focus {
        outline: none;
    }
</style>

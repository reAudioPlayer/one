<template>
    <div class="search">
        <!--input @keyup="enterText" ref="searchBox" v-model="query" type="text"-->
        <div class="fillPage" v-if="loading">
            <Loader />
        </div>
        <template v-else>
            <Shelf v-if="tracks.length" heading="Songs">
                <TrackItem
                    v-for="element in tracks"
                    :key="element.url"
                    :cover="element.cover"
                    :href="element.url"
                    :artist="element.artists.join(', ')"
                    :title="element.title"
                />
            </Shelf>
            <Shelf v-if="spotifyTracks.length" heading="Songs (Spotify)">
                <search-item
                    v-for="element in spotifyTracks"
                    :key="element.url"
                    :preview="element.preview"
                    :cover="element.cover"
                    :href="element.url"
                    :artist="element.artists.join(', ')"
                    :title="element.title"
                />
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
        </template>
    </div>
</template>

<script>
    import ArtistItem from '../components/Catalogue/Items/Artist/ArtistItem.vue'
    import Item from '../components/Catalogue/Items/Release/ReleaseItem.vue'
    import SearchItem from '../components/Catalogue/Items/Search/SearchItem.vue'
    import Shelf from "../components/Catalogue/Shelf.vue"
    import TrackItem from "../components/Catalogue/Items/Tracks/TrackItem.vue"
    import Loader from '../components/Loader.vue'

    export default {
        name: 'Search',
        components: {
            Shelf,
            Item,
            SearchItem,
            ArtistItem,
            TrackItem,
            Loader
        },
        data() {
            return {
                query: "",
                spotifyTracks: [ ],
                spotifyArtists: [ ],
                tracks: [ ],
                artists: [ ],
                youtubeTracks: [ ],
                loading: false
            }
        },
        methods: {
            search() {
                this.query = this.$route.params.query

                if (!this.query)
                {
                    return
                }

                this.loading = true;

                fetch("/api/search", {
                    method: "POST",
                    body: JSON.stringify({ query: this.query })
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
                        this.loading = false;
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

<style scoped lang="scss">
    .search {
        padding: 20px;
        height: calc(100% - 40px);
    }

    input {
        margin-left: 10px;
        margin-bottom: 20px;
        width: 20vw !important;
    }

    .fillPage {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

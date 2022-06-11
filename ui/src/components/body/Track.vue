<template>
    <div class="playlist">
        <fixed-playlist-header @loadPlaylist="loadPlaylist" ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }"
            :title="playlistName" />
        <div class="padding-20 songdetails" @click="editPlaylist" v-observe-visibility="headerVisibilityChanged">
            <img class="cover" :src="cover" />
            <div class="details">
                <h7>Song</h7>
                <h1>{{title}}</h1>
                <h5>{{artist}}</h5>
            </div>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" @click="loadPlaylist" class="material-icons-outlined">play_circle_filled</span>
            <span id="addToPlaylist" @click="addToPlaylist" class="material-icons-outlined">add_circle</span>
            <div class="grid">
                <h2>{{"Recommendations based on " + title}}</h2>
                <grid-header />
                <hr>
                <div class="playlistEntries">
                    <draggable v-model="recommendations">
                        <template #item="{element}">
                            <spotify-playlist-entry @requestUpdate="updatePlaylist"
                                :index="recommendations.findIndex(x => x.src == element.src)"
                                :source="element.src" :id="element.id"
                                :title="element.title" :album="element.album" :artist="element.artists.join(', ')"
                                :preview="element.preview"
                                :cover="element.cover" :favourite="element.favourite" :duration="element.duration" />
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FixedPlaylistHeader from '../Playlist/FixedPlaylistHeader.vue'
    import GridHeader from '../Playlist/GridHeader.vue'
    import draggable from 'vuedraggable'
    import SpotifyPlaylistEntry from '../SpotifyPlaylist/SpotifyPlaylistEntry.vue'

    import Hashids from 'hashids'
    const hashids = new Hashids("reapOne.track", 22)

    export default {
        components: {
            FixedPlaylistHeader,
            GridHeader,
            draggable,
            SpotifyPlaylistEntry
        },
        name: 'Track',
        data() {
            this.updatePlaylist()

            return {
                fixedHeaderHidden: true,
                title: "N/A",
                artist: "N/A",
                cover: "/assets/img/music_placeholder.png",
                recommendations: []
            }
        },
        methods: {
            getId() {
                return hashids.decode(this.$route.params.id);
            },
            onPlaylistRearrange(type) {
                const moved = type.moved

                if (!moved) {
                    return;
                }
            },
            connect() {
                const ctx = this
                console.log("attempting reconnect")
                let ws = new WebSocket('ws://localhost:1234/ws');

                ws.onclose = function () {
                    console.log("ws closed")

                    setTimeout(this.connect, 1000);
                }

                ws.onopen = () => {
                    console.log("ws connected")
                }

                ws.onmessage = function (msg) {
                    const jdata = JSON.parse(msg.data);
                    ctx.updateData(jdata)
                }
            },
            headerVisibilityChanged(a) {
                this.fixedHeaderHidden = a
            },
            addToPlaylist() {
                this.$refs.addSongPopup.showModal = true
            },
            editPlaylist() {
                this.$refs.editPlaylistPopup.showModal = true
            },
            updateData(jdata) {
                if (jdata.path == "player.song") {
                    let title = jdata?.data?.title || "N/A"

                    for (const entry of this.playlist) {
                        entry.playing = entry.title == title;
                    }
                }
            },
            updatePlaylist() {
                if (!this.getId()) {
                    return;
                }
                if (!this.$route.path.includes("/track/"))
                {
                    return;
                }
                fetch("/api/track", {
                    method: "POST",
                    body: JSON.stringify({
                        id: Number(this.getId())
                    })
                }).then(async x => {
                    if (x.status == 404) {
                        this.$router.push("/")
                        return
                    }

                    const jdata = await x.json()
                    console.log(jdata)
                    this.title = jdata.title || "N/A"
                    this.artist = jdata.artist || "N/A"
                    this.cover = jdata.cover || "/assets/img/music_placeholder.png"
                    document.title = `${this.title} • ${this.artist}`;
                    this.connect()

                    const resp = await fetch("/api/spotify/recommend", {
                        method: "POST",
                        body: JSON.stringify({
                            query: `${this.artist} ${this.title}`
                        })
                    })
                    const recommendations = await resp.json()
                    this.recommendations.push(...recommendations)
                })
            },
            loadPlaylist() {
                fetch("/api/loadPlaylist", {
                    method: "POST",
                    body: JSON.stringify({
                        id: Number(this.getId()),
                        type: "track"
                    })
                })
            }
        },
        watch: {
            $route() {
                this.updatePlaylist()
            }
        }
    }
</script>

<style scoped>
    .songdetails {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        margin-top: 5vh;
    }

    .songdetails>img {
        width: 20%;
        margin-right: 20px;
        border-radius: 5px;
    }

    .songdetails>.details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .songdetails:hover {
        cursor: pointer;
    }

    .songdetails>.details>h1 {
        font-size: 3em;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .songdetails>.details>.detailswrapper {
        font-size: .8em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .songdetails>.details>.detailswrapper>.share {
        margin-left: 10px;
        line-height: 15px;
        font-size: 15px;
    }

    .share:hover {
        cursor: pointer;
    }

    .songdetails>.details>h5 {
        font-size: .8em;
        font-weight: normal;
        color: var(--font-darker);
        margin: 0;
    }

    .playlistEntries {
        display: flex;
        flex-direction: column;
    }

    #loadPlaylist,
    #addToPlaylist {
        cursor: pointer;
        font-size: 60px;
        margin-bottom: 20px;
        width: 70px;
        line-height: 70px;
        text-align: center;
        align-items: center;
        vertical-align: middle;
    }

    #loadPlaylist:hover,
    #addToPlaylist:hover {
        cursor: pointer;
        font-size: 62px;
    }

    .padding-20 {
        padding: 20px;
    }

    h3 {
        text-transform: uppercase;
    }

    h7 {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.83em;
    }

    h1 {
        margin-block-start: 0.15em;
        margin-block-end: 0.15em;
        font-size: 2.91em;
    }

    .hidden {
        display: none !important;
    }
</style>
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="playlist">
        <EditSong
            ref="editSongPopup"
            :song="{
                cover,
                album,
                title,
                artist,
                source: src,
                id,
            }"
            @close="updatePlaylist"
        />
        <fixed-playlist-header ref="fixedHeading" :class="{ 'hidden': fixedHeaderHidden }"
                               :title="`${artist} - ${title}`"
                               @loadPlaylist="loadPlaylist" />
        <div v-observe-visibility="headerVisibilityChanged" class="padding-20 songdetails" @click="editSong">
            <img :src="cover" class="cover" />
            <div class="details">
                <h7>Song</h7>
                <h1>{{ title }}</h1>
                <h5>{{ artist }}</h5>
            </div>
        </div>
        <hr>
        <div class="padding-20">
            <span id="loadPlaylist" class="material-icons-outlined" @click="loadPlaylist">play_circle_filled</span>
            <!-- implement after context menu refactoring -->
            <span
                v-show="false"
                id="addToPlaylist"
                class="material-icons-outlined"
                @click="addToPlaylist"
            >add_circle</span>
            <div v-if="recommendations.length" class="grid">
                <h2>{{ "Recommendations based on " + title }}</h2>
                <PlaylistHeader />
                <hr>
                <div class="playlistEntries">
                    <spotify-playlist-entry
                        v-for="(element, index) in recommendations"
                        :id="element.id"
                        :album="element.album"
                        :artist="element.artists.join(', ')"
                        :cover="element.cover"
                        :duration="element.duration"
                        :favourite="element.favourite"
                        :index="index"
                        :preview="element.preview"
                        :source="element.href"
                        :title="element.title"
                        no-add
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FixedPlaylistHeader from "../components/Playlist/FixedPlaylistHeader.vue";
import PlaylistHeader from "@/components/songContainers/PlaylistHeader.vue";
import EditSong from "@/components/popups/EditSong";
import draggable from "vuedraggable";
import SpotifyPlaylistEntry from "../components/SpotifyPlaylist/SpotifyPlaylistEntry.vue";
import { parseCover, unhashTrack } from "@/common";

export default {
    components: {
        PlaylistHeader,
        FixedPlaylistHeader,
        draggable,
        SpotifyPlaylistEntry,
        EditSong,
    },
    data() {
        this.updatePlaylist();

        return {
            fixedHeaderHidden: true,
            title: "N/A",
            artist: "N/A",
            album: "N/A",
            cover: parseCover(null),
            src: "",
            id: -1,
            recommendations: [],
        };
    },
    methods: {
        getId() {
            return unhashTrack(this.$route.params.id);
        },
        onPlaylistRearrange(type) {
            const moved = type.moved;

            if (!moved) {

            }
        },
        headerVisibilityChanged(a) {
            this.fixedHeaderHidden = a;
        },
        editSong() {
            this.$refs.editSongPopup.show();
        },
        addToPlaylist() {
            return;
            this.$refs.addSongPopup.show();
        },
        updatePlaylist() {
            if (!this.getId()) {
                return;
            }
            if (!this.$route.path.includes("/track/")) {
                return;
            }
            fetch(`/api/tracks/${this.getId()}`).then(async x => {
                if (x.status == 404) {
                    this.$router.push("/");
                    return;
                }

                const jdata = await x.json();
                console.log(jdata);
                this.title = jdata.title || "N/A";
                this.artist = jdata.artist || "N/A";
                this.cover = parseCover(jdata.cover);
                this.src = jdata.source;
                this.album = jdata.album || "N/A";
                this.id = jdata.id;
                document.title = `${this.title} • ${this.artist}`;

                const resp = await fetch("/api/spotify/recommendations", {
                    method: "POST",
                    body: JSON.stringify({
                        query: `${this.artist} ${this.title}`,
                    }),
                });
                const recommendations = await resp.json();
                this.recommendations.push(...recommendations);
            });
        },
        loadPlaylist() {
            fetch("/api/player/load", {
                method: "POST",
                body: JSON.stringify({
                    id: Number(this.getId()),
                    type: "track",
                }),
            });
        },
    },
    watch: {
        $route() {
            this.updatePlaylist();
        },
        currentSong() {
            this.updateIsPlaying();
        },
    },
};
</script>

<style scoped>
.songdetails {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 5vh;
}

.songdetails > img {
    width: 20%;
    margin-right: 20px;
    border-radius: 5px;
}

.songdetails > .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.songdetails:hover {
    cursor: pointer;
}

.songdetails > .details > h1 {
    font-size: 3em;
    margin-top: 10px;
    margin-bottom: 10px;
}

.songdetails > .details > .detailswrapper {
    font-size: .8em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.songdetails > .details > .detailswrapper > .share {
    margin-left: 10px;
    line-height: 15px;
    font-size: 15px;
}

.share:hover {
    cursor: pointer;
}

.songdetails > .details > h5 {
    font-size: .8em;
    font-weight: normal;
    color: var(--fg-base-dk);
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
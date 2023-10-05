<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import FlexShelf from "/src/components/Catalogue/FlexShelf.vue";
import Playlist from "/src/components/Catalogue/Items/home/Playlist.vue";
import TrackCompact from "/src/components/Catalogue/Items/home/TrackCompact.vue";
import PlaylistHeader from "@/components/songContainers/PlaylistHeader.vue";
import PlaylistEntry from "@/components/songContainers/PlaylistEntry.vue";

import { parseCover } from "@/common";
</script>

<template>
    <div class="home">
        <div class="main">
            <div v-if="playlists.length" class="playlists">
                <h2>
                    <router-link class="linkOnHover" to="/collection/playlists"
                        >Playlists</router-link
                    >
                </h2>
                <FlexShelf>
                    <Playlist
                        v-for="(playlist, index) in playlists"
                        :key="index"
                        :cover="playlist.cover"
                        :href="playlist?.href"
                        :name="playlist.name"
                    />
                </FlexShelf>
            </div>
            <div v-if="liked.length" class="liked">
                <h2>
                    <router-link class="linkOnHover" to="/collection/tracks"
                        >Liked Songs</router-link
                    >
                </h2>
                <PlaylistHeader />
                <PlaylistEntry
                    v-for="(element, index) in liked"
                    :key="index"
                    :index="index"
                    :playlist-id="-1"
                    :song="element"
                    with-cover
                />
            </div>
            <div v-if="breaking.length" class="breaking">
                <h2>
                    <router-link
                        class="linkOnHover"
                        to="/collection/tracks/breaking"
                        >Breaking Songs</router-link
                    >
                </h2>
                <PlaylistHeader />
                <PlaylistEntry
                    v-for="(element, index) in breaking"
                    :key="index"
                    :index="index"
                    :playlist-id="-2"
                    :song="element"
                    with-cover
                />
            </div>
        </div>
        <div class="side">
            <div v-if="releases.length" class="releases">
                <h2>
                    <router-link class="linkOnHover" to="/collection/releases"
                        >Out now</router-link
                    >
                </h2>
                <FlexShelf>
                    <TrackCompact
                        v-for="(song, index) in releases"
                        :key="index"
                        :artist="song.artist"
                        :cover="song.cover"
                        :href="song.url"
                        :title="song.title"
                        @play="() => playRecommendation(song)"
                    />
                </FlexShelf>
            </div>

            <div v-if="picks.length" class="disovery">
                <h2>
                    <router-link class="linkOnHover" to="/discover"
                        >Discover</router-link
                    >
                </h2>
                <FlexShelf>
                    <TrackCompact
                        v-for="(song, index) in picks"
                        :id="song.id"
                        :key="index"
                        :artist="song.artist"
                        :cover="parseCover(song.cover)"
                        :href="song.href"
                        :title="song.title"
                        @play="() => playDiscover(song)"
                    />
                </FlexShelf>
            </div>

            <div v-if="recommendations.length" class="recommendations">
                <h2>Recommendations</h2>
                <FlexShelf>
                    <TrackCompact
                        v-for="(song, index) in recommendations"
                        :key="index"
                        :artist="song.artist"
                        :cover="song.cover"
                        :href="song.href"
                        :title="song.title"
                        @play="() => playRecommendation(song)"
                    />
                </FlexShelf>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useDataStore } from "../../store/data";
import { getPlaylist } from "../../api/playlist";

export default {
    name: "Home",
    data() {
        const time = new Date();
        const greeting =
            time.getHours() < 12
                ? "Good morning"
                : time.getHours() < 18
                ? "Good afternoon"
                : "Good evening";
        return {
            greeting,
            releases: [],
            picks: [],
            songs: [],
            recommendations: [],
            data: useDataStore(),
        };
    },
    mounted() {
        fetch("/api/releases")
            .then((x) => x.json())
            .then((jdata) => {
                this.releases = jdata.slice(0, 3);
            });
        this.pick();
    },
    computed: {
        playlists() {
            return this.data.playlists;
        },
        liked() {
            return getPlaylist("liked").songs.slice(0, 3);
        },
        breaking() {
            return getPlaylist("breaking").songs.slice(0, 3);
        },
    },
    methods: {
        playDiscover(song) {
            fetch("/api/player/load", {
                method: "POST",
                body: JSON.stringify({
                    id: song.id,
                    type: "track",
                }),
            });
        },
        playRecommendation(song) {
            const event = new CustomEvent("player.play", {
                detail: {
                    artist: song.artist,
                    title: song.title,
                    source: song.source || song.url || song.href,
                },
            });
            window.dispatchEvent(event);
        },
        async pick() {
            if (!this.data.playlists.length) {
                setTimeout(() => this.pick(), 2000);
                return;
            }

            this.songs = this.playlists
                .map(async (playlist) => getPlaylist(playlist.id)?.songs || [])
                .flat();

            if (this.songs.length < 3) {
                return;
            }

            for (let i = 0; i < 3; i++) {
                this.picks.push(
                    this.songs[Math.floor(Math.random() * this.songs.length)]
                );
            }

            fetch("/api/spotify/recommendations", {
                method: "POST",
                body: JSON.stringify({
                    query: `${this.picks[0].artist} ${this.picks[0].title}`,
                }),
            })
                .then((x) => x.json())
                .then((jdata) => {
                    this.recommendations = jdata.slice(0, 3);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.home {
    padding: 20px;
    display: flex;
    flex-direction: row;

    .main {
        flex: 2;
        flex-shrink: 0;
    }

    .side {
        flex: 1;
        flex-shrink: 0;
        margin-left: 20px;
    }
}
</style>

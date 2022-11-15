<script setup>
import FlexShelf from "/src/components/Catalogue/FlexShelf.vue";
import Playlist from "/src/components/Catalogue/Items/home/Playlist.vue";
import TrackCompact from "/src/components/Catalogue/Items/home/TrackCompact.vue";
import SpotifyPlaylistHeader from '../components/SpotifyPlaylist/SpotifyPlaylistHeader.vue'
import LightPlaylistEntry from '@/components/Playlist/LightPlaylistEntry.vue'

import {parseCover} from "@/common";
</script>

<template>
    <div class="home">
        <div class="main">
            <div class="playlists" v-if="playlists.length">
                <h2><router-link to="/collection/playlists" class="linkOnHover">Playlists</router-link></h2>
                <FlexShelf>
                    <Playlist v-for="(playlist, index) in playlists" :key="index" :name="playlist.name" :cover="playlist.cover" :href="playlist?.href" />
                </FlexShelf>
            </div>
            <div class="liked" v-if="liked.length">
                <h2><router-link to="/collection/tracks" class="linkOnHover">Liked Songs</router-link></h2>
                <spotify-playlist-header />
                <light-playlist-entry v-for="(element, index) in liked" :key="index" :index="index" :loadAt="{ type: 'collection' }" :source="element.source" :id="element.id" :title="element.title" :playing="element.playing" :album="element.album" :artist="element.artist" :cover="parseCover(element.cover)" :favourite="element.favourite" :duration="element.duration" />
            </div>
            <div class="breaking" v-if="breaking.length">
                <h2><router-link to="/collection/tracks/breaking" class="linkOnHover">Breaking Songs</router-link></h2>
                <spotify-playlist-header />
                <light-playlist-entry v-for="(element, index) in breaking" :key="index" :index="index" :loadAt="{ type: 'collection/breaking' }" :source="element.source" :id="element.id" :title="element.title" :playing="element.playing" :album="element.album" :artist="element.artist" :cover="parseCover(element.cover)" :favourite="element.favourite" :duration="element.duration" />
            </div>
        </div>
        <div class="side">
            <div class="releases" v-if="releases.length">
                <h2><router-link to="/collection/releases" class="linkOnHover">Out now</router-link></h2>
                <FlexShelf>
                    <TrackCompact @play="() => playRecommendation(song)" v-for="(song, index) in releases" :key="index" :artist="song.artist" :title="song.title" :cover="song.cover" :href="song.url" />
                </FlexShelf>
            </div>

            <div class="disovery" v-if="picks.length">
                <h2><router-link to="/discover" class="linkOnHover">Discover</router-link></h2>
                <FlexShelf>
                    <TrackCompact @play="() => playDiscover(song)" v-for="(song, index) in picks" :key="index" :artist="song.artist" :title="song.title" :cover="parseCover(song.cover)" :id="song.id" />
                </FlexShelf>
            </div>

            <div class="recommendations" v-if="recommendations.length">
                <h2>Recommendations</h2>
                <FlexShelf>
                    <TrackCompact @play="() => playRecommendation(song)" v-for="(song, index) in recommendations" :key="index" :artist="song.artist" :title="song.title" :cover="song.cover" :href="song.src" />
                </FlexShelf>
            </div>
        </div>
    </div>
</template>

<script>
import {hashPlaylist} from "@/common";

export default {
    name: 'Home',
    data() {
        const time = new Date()
        const greeting = time.getHours() < 12 ? "Good morning" : time.getHours() < 18 ? "Good afternoon" : "Good evening"
        return {
            greeting,
            releases: [],
            playlists: [],
            picks: [],
            songs: [],
            liked: [],
            breaking: [],
            recommendations: []
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
                this.releases = jdata.slice(0, 3);
            })
        fetch("/api/playlists")
            .then(x => x.json())
            .then(async jdata => {
                for (let i = 0; i < jdata.length; i++) {
                    const resp = await fetch(`/api/playlists/${i}`)
                    const pdata = await resp.json()
                    this.playlists.push({
                        name: pdata.name,
                        description: pdata.description,
                        cover: pdata.cover || pdata.songs?.[0]?.cover || "/assets/img/music_placeholder.png",
                        href: `/playlist/${hashPlaylist(i)}`, // #TODO migrate to pinia
                        songs: pdata.songs
                    })
                }
                this.pick();
            })
        fetch("/api/me/liked")
            .then(x => x.json()).then(jdata => {
                this.liked = jdata.songs.slice(0, 3)
            })
        fetch("/api/me/new")
            .then(x => x.json()).then(jdata => {
                this.breaking = jdata.songs.slice(0, 3)
            })
    },
    methods: {
        playDiscover(song) {
            fetch("/api/player/load", {
                method: "POST",
                body: JSON.stringify({
                    id: song.id,
                    type: "track"
                })
            })
        },
        playRecommendation(song) {
            const event = new CustomEvent('player.play', { detail: {
                artist: song.artist,
                title: song.title,
                source: song.src || song.url
            } });
            window.dispatchEvent(event);
        },
        pick() {
            this.songs = this.playlists.map(playlist => playlist.songs).flat();

            for (let i = 0; i < 3; i++)
            {
                this.picks.push(this.songs[Math.floor(Math.random() * this.songs.length)])
            }

            fetch("/api/spotify/recommendations", {
                method: "POST",
                body: JSON.stringify({
                    query: `${this.picks[0].artist} ${this.picks[0].title}`
                })
            }).then(x => x.json()).then(jdata => {
                this.recommendations = jdata.slice(0, 3)
            })
        }
    }
}
</script>

<style scoped lang="scss">
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

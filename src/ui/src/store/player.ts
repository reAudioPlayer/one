import { defineStore } from 'pinia'
import {parseCover, zeroPad} from "../common";
import {useDataStore} from "./data";


type PlaylistType = "playlist" | "collection" | "collection/breaking" | "track";


export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        playing: false,
        progress: 0,
        ready: false,
        song: {
            title: null,
            artist: null,
            album: null,
            cover: parseCover(null),
            src: null,
            duration: null,
            favourite: false,
            id: -1,
        },
        playlist: {
            cover: null,
            description: null,
            index: -1, // of song in playlist
            name: null,
            id: -1,
            songs: [],
        },
        volume: 50,
    }),
    actions: {
        setSong(song) {
            if (song.id == this.song.id) return;
            this.song = song;
            this.song.cover = parseCover(song.cover);
            this.progress = 0;
        },
        setReady(ready) {
            if (this.ready === ready) return;

            this.ready = ready;

            if (ready) {
                useDataStore().initialise();
            } else {
                this.$reset();
                useDataStore().$reset();
            }
        },
        setDuration(duration) {
            this.song.duration = `${Math.floor(duration / 60)}:${zeroPad(Math.round(duration % 60), 2)}`;

            fetch(`/api/tracks/${this.song.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    duration
                })
            })

            //saveDuration(this.song.id, duration);
        },
        setPlaying(playing) {
            this.playing = playing;
        },
        setProgress(progress) {
            this.progress = progress;
        },
        incrementProgress() {
            this.progress += 1;
        },
        setFavourite(favourite) {
            this.song.favourite = favourite;
        },
        setPlaylist(playlist) {
            this.playlist = playlist;
        },
        setVolume(volume) {
            this.volume = volume;
            localStorage.setItem("reap.volume", volume);
        },
        initialise() {
            this.volume = localStorage.getItem("reap.volume") || 50;
        },
        loadPlaylist(playlistId: number | PlaylistType, id: number = null) {
            const body = {
                id: playlistId,
            }

            if (typeof playlistId === "string") {
                body["type"] = playlistId;
                body.id = id;
            }

            fetch("/api/player/load", {
                method: "POST",
                body: JSON.stringify(body)
            })
        },
        loadSong(playlist: number | PlaylistType, index: number) {
            const body = {
                index
            }

            if (typeof playlist === "number") {
                body["playlistIndex"] = playlist;
            } else {
                body["type"] = playlist;
            }

            fetch("/api/player/at", {
                method: "POST",
                body: JSON.stringify(body)
            });
        }
    },
    getters: {
        durationSeconds(state) {
            if (state.song.duration == null) return 0;

            const [minutes, seconds] = state.song.duration.split(":");
            return parseInt(minutes) * 60 + parseInt(seconds);
        },
        stream(state) {
            return `/api/player/stream/${state.song.id}`;
        },
        cover(state) {
            return state.song.cover;
        },
        progressPercent(state) {
            return state.progress / this.durationSeconds * 1000;
        },
        getProgress(state) {
            const progress = state.progress;
            return `${Math.floor(progress / 60)}:${zeroPad(Math.floor(progress % 60), 2)}`
        },
        loaded(state) {
            return state.song.id != -1;
        }
    }
});

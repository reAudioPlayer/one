import { defineStore } from 'pinia'
import {zeroPad} from "../common";

export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        playing: false,
        progress: 0,
        song: {
            title: null,
            artist: null,
            album: null,
            cover: null,
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
            songs: [],
        },
        volume: 50,
    }),
    actions: {
        setSong(song) {
            if (song.id == this.song.id) return;
            this.song = song;
            this.progress = 0;
        },
        setDuration(duration) {
            this.song.duration = `${Math.floor(duration / 60)}:${zeroPad(Math.round(duration % 60), 2)}`;
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
        loadPlaylist(playlistId: number) {
            fetch("/api/player/load", {
                method: "POST",
                body: JSON.stringify({
                    id: playlistId,
                    type: "playlist"
                })
            })
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
            return state.song.cover || "/assets/img/music_placeholder.png";
        },
        progressPercent(state) {
            return state.progress / this.durationSeconds * 1000;
        },
        getProgress(state) {
            const progress = state.progress;
            return `${Math.floor(progress / 60)}:${zeroPad(Math.floor(progress % 60), 2)}`
        }
    }
});

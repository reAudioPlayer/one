import {zeroPad} from "@/common";

export default {
    namespaced: true,
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
        }
    }),
    mutations: {
        setSong(state, song) {
            if (song.id == state.song.id) return;
            state.song = song;
            state.progress = 0;
        },
        setDuration(state, duration) {
            state.song.duration = `${Math.floor(duration / 60)}:${zeroPad(Math.round(duration % 60), 2)}`;
        },
        setPlaying(state, playing) {
            state.playing = playing;
        },
        setProgress(state, progress) {
            state.progress = progress;
        },
        incrementProgress(state) {
            state.progress += 1;
        },
        setFavourite(state, favourite) {
            state.song.favourite = favourite;
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
        progressPercent(state, getters) {
            return state.progress / getters.durationSeconds * 1000;
        },
        progress(state) {
            const progress = state.progress;
            return `${Math.floor(progress / 60)}:${zeroPad(Math.floor(progress % 60), 2)}`
        }
    }
}
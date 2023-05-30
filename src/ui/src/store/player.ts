/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineStore } from "pinia";
import { parseCover, zeroPad } from "../common";
import { useDataStore } from "./data";
import { SharedPlayer } from "../api/sharedPlayer";
import { getShuffle, nextSong, prevSong, setShuffle } from "../api/player";
import { computed } from "vue";
import { type ILyrics, findLyrics } from "../views/SingAlong/lyrics";


type PlaylistType = "playlist" | "collection" | "collection/breaking" | "track";
export type RepeatType = "repeat" | "repeat_one_on" | "repeat_on";
export interface Playable {
    play: () => void;
    pause: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    setRepeat?: (repeat: RepeatType) => void; // handled in store
    setMute: (mute: boolean) => void;
}


export const usePlayerStore = defineStore({
    id: 'player',
    state: () => ({
        playing: false,
        progress: 0,
        ready: false,
        muted: false,
        shuffle: false,
        song: {
            title: null,
            artist: null,
            album: null,
            cover: parseCover(null),
            source: null,
            duration: null,
            favourite: false,
            id: -1,
            metadata: {
                plays: 0,
                spotify: {
                    id: null,
                }
            }
        },
        playlist: {
            cover: null,
            description: null,
            name: null,
            id: -1,
            songs: [],
        },
        lyrics: null as ILyrics | null,
        volume: 50,
        repeat: "repeat" as RepeatType,
        sharedPlayer: null as InstanceType<typeof SharedPlayer> | null,
        player: null as Playable | null,
    }),
    actions: {
        playPause() {
            if (this.playing) {
                this.pause();
            } else {
                this.play();
            }
        },
        toggleRepeat() {
            switch (this.repeat) {
                case "repeat":
                    this.repeat = "repeat_on";
                    break;
                case "repeat_on":
                    this.repeat = "repeat_one_on";
                    break;
                case "repeat_one_on":
                    this.repeat = "repeat";
                    break;
            }
            localStorage.setItem("reap.repeat", this.repeat);
            this.player?.setRepeat(this.repeat);
        },
        setRepeat(repeat: RepeatType) {
            this.repeat = repeat;
        },
        setMute(mute: boolean) {
            this.muted = mute;
            this.player?.setMute(mute);
        },
        toggleMute() {
            this.setMute(!this.muted);
        },
        setShuffle(shuffle: boolean) {
            this.shuffle = shuffle;
            setShuffle(shuffle);
        },
        toggleShuffle() {
            this.setShuffle(!this.shuffle);
        },
        onSongEnded() {
            if (this.repeat === "repeat_one_on") {
                this.play();
            } else {
                if (this.repeat === "repeat" && this.playlist.index.value === this.playlist.songs.length - 1) {
                    return;
                }

                this.next();
            }
        },
        play() {
            this.player.play();
        },
        pause() {
            this.player.pause();
        },
        next() {
            nextSong();
        },
        previous() {
            prevSong();
        },
        setPlayer(player: Playable) {
            if (!player) return;
            if (this.player === player) return;

            this.player = player;
        },
        async setSong(song) {
            if (song.id == this.song.id) return;
            this.song = song;
            this.song.cover = parseCover(song.cover);
            this.progress = 0;

            this.lyrics = await findLyrics();
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
            this.song.duration = duration;

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
        seek(time) {
            this.player.seek(time);
        },
        seekPercent(percent) {
            this.seek(this.durationSeconds * percent / 100);
        },
        setProgress(progress) {
            this.progress = Math.round(progress);
        },
        setFavourite(favourite) {
            this.song.favourite = favourite;
            fetch(`/api/tracks/${this.song.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    favourite
                })
            })
        },
        setPlaylist(playlist) {
            this.playlist.songs = playlist.songs;
            this.playlist.cover = parseCover(playlist.cover);
            this.playlist.description = playlist.description;
            this.playlist.name = playlist.name;
            this.playlist.id = playlist.id;
        },
        setVolume(volume) {
            if (volume == this.volume) return;

            this.volume = volume;
            localStorage.setItem("reap.volume", volume);
            if (this.player.setVolume) {
                this.player?.setVolume(volume);
            }
        },
        toggleFavourite() {
            this.setFavourite(!this.song.favourite);
        },
        async initialise() {
            this.volume = localStorage.getItem("reap.volume") || 50;
            this.repeat = localStorage.getItem("reap.repeat") || "repeat_on";
            this.sharedPlayer = new SharedPlayer();

            this.setShuffle(await getShuffle());
        },
        // TODO
        // loadPlaylist( ??? )
        loadPlaylist(playlistId: number | PlaylistType, id: number = null) {
            const body = {
                type: "playlist",
                id: playlistId,
            }

            if (typeof playlistId === "string") {
                body.type = playlistId;
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
                if (!isNaN(playlist)) {
                    body["playlistIndex"] = playlist;
                }
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
        hasLyrics(state) {
            return !state.lyrics?.error;
        },
        durationSeconds(state) {
            return state.song.duration;
        },
        displayDuration(state) {
            const duration = state.song.duration;
            if (isNaN(duration)) return "0:00";
            return `${Math.floor(duration / 60)}:${zeroPad(Math.floor(duration % 60), 2)}`
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
        displayProgress(state) {
            const progress = state.progress;
            if (isNaN(progress)) return "0:00";
            return `${Math.floor(progress / 60)}:${zeroPad(Math.floor(progress % 60), 2)}`
        },
        loaded(state) {
            return state.song.id != -1;
        },
        shuffleIcon(state) {
            if (state.shuffle) {
                return "shuffle_on";
            }
            return "shuffle";
        },
        muteIcon(state) {
            if (state.muted) {
                return "volume_off";
            }
            if (state.volume > 50) {
                return "volume_up";
            }
            if (state.volume > 0) {
                return "volume_down";
            }
            return "volume_mute";
        },
        playlist(state) {
            return {
                ...state.playlist,
                index: computed(() => state.playlist?.songs?.findIndex(song => song.id === state.song.id) ?? -1)
            };
        }
    }
});

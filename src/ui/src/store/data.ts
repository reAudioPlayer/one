import { defineStore } from 'pinia'

import { hashPlaylist } from "../common";
import {usePlayerStore} from "./player";
import {useSettingsStore} from "./settings";

// Create a new store instance.
export const useDataStore = defineStore({
    id: 'data',
    state: () => ({
        playlists: [ ]
    }),
    actions: {
        setPlaylists(playlists) {
            this.playlists = playlists;
        },
        initialise() {
            this.fetchPlaylists();
        },
        async fetchPlaylists() {
            const res = await fetch("/api/playlists");
            const availablePlaylists = await res.json();
            const playlists = [ ];

            for (let i = 0; i < availablePlaylists.length; i++) {
                const resp = await fetch(`/api/playlists/${i}`)
                const playlist = await resp.json();

                playlists.push({
                    name: playlist.name,
                    description: playlist.description,
                    cover: playlist.cover || playlist.songs[0].cover,
                    href: `/playlist/${hashPlaylist( String(i) )}`,
                    id: i
                })
            }

            this.setPlaylists(playlists);
        }
    }
});

/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineStore } from "pinia";

import { IDropdownOption, IFullPlaylist } from "../common";
import { getAllPlaylists } from "../api/playlist";

// Create a new store instance.
export const useDataStore = defineStore({
    id: 'data',
    state: () => ({
        playlists: [ ] as IFullPlaylist[],
    }),
    getters: {
        notEmpty() {
            return !this.empty;
        },
        empty() {
            return this.playlists.length === 0;
        },
        playlistsAsDropdown(allowCreateNew = true): IDropdownOption[] {
            const options = this.playlists.map((playlist) => ({
                value: playlist.id.toString(),
                label: playlist.name,
            }));
            if (allowCreateNew) {
                options.push({
                    value: "new",
                    label: "(new playlist)",
                });
            }
            return options;
        },
        getPlaylistById(): (id: number) => IFullPlaylist {
            return (id: number) => {
                return this.playlists.find((playlist) => playlist.id === id);
            }
        }
    },
    actions: {
        setPlaylists(playlists) {
            this.playlists = playlists;
        },
        initialise() {
            this.fetchPlaylists();
        },
        async fetchPlaylists() {
            const playlists = await getAllPlaylists();
            this.setPlaylists(playlists);
        }
    }
});

/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineStore } from "pinia";

import { IDropdownOption, IFullPlaylist } from "../common";
import { getAllPlaylists, getSinglePlaylist } from "../api/playlist";

// Create a new store instance.
export const useDataStore = defineStore({
    id: "data",
    state: () => ({
        playlists: [] as IFullPlaylist[],
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
                value: playlist.id,
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
        getPlaylistById(): (id: string) => IFullPlaylist {
            return (id: string) => {
                return this.playlists.find((playlist) => playlist.id === id);
            };
        },
    },
    actions: {
        setPlaylists(playlists) {
            this.playlists = playlists;
        },
        initialise() {
            this.fetchPlaylists();
        },
        async fetchPlaylists(...params: string[]) {
            if (params) {
                console.log("fetching playlists", params);
                for (const param of params) {
                    const i = this.playlists.findIndex(
                        (playlist) => playlist.id === param
                    );
                    if (i === -1) {
                        return;
                    }
                    this.playlists[i] = await getSinglePlaylist(param);
                }
            }

            const playlists = await getAllPlaylists();
            this.setPlaylists(playlists);
        },
    },
});

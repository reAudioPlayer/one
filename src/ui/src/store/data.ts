import { defineStore } from 'pinia'

import {hashPlaylist, IDropdownOption, IPlaylist} from "../common";

// Create a new store instance.
export const useDataStore = defineStore({
    id: 'data',
    state: () => ({
        playlists: [ ] as IPlaylist[],
    }),
    getters: {
        notEmpty() {
            return this.playlists.length > 0;
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
            const res = await fetch("/api/playlists");
            const availablePlaylists = await res.json();
            const playlists: IPlaylist[] = [ ];

            for (let i = 0; i < availablePlaylists.length; i++) {
                const resp = await fetch(`/api/playlists/${i}`)
                const playlist = await resp.json();

                playlists.push({
                    name: playlist.name,
                    description: playlist.description,
                    cover: playlist.cover || playlist.songs[0]?.cover,
                    href: `/playlist/${hashPlaylist( String(i) )}`,
                    id: i
                })
            }

            this.setPlaylists(playlists);
        }
    }
});

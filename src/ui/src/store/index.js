import { createStore } from 'vuex'
import player from "./modules/player.js";

import { hashPlaylist } from "@/common";


// Create a new store instance.
const store = createStore({
    modules: {
        player
    },
    state: () => ({
        playlists: [ ]
    }),
    mutations: {
        setPlaylists(state, playlists) {
            console.log("setPlaylists", playlists, state.playlists);
            state.playlists = playlists;
            console.log("setPlaylists", playlists, state.playlists);
        }
    },
    actions: {
        initialise({ dispatch, commit }) {
            dispatch("fetchPlaylists");
            commit("player/initialise");
        },
        async fetchPlaylists({ commit }) {
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
                    href: `/playlist/${hashPlaylist(i)}`
                })
            }

            commit("setPlaylists", playlists);
        }
    }
});

export default store;
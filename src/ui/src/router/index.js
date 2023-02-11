/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: '/',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/discover',
        component: () => import("@/views/Explore.vue"),
        meta: {
            title: "Discover - reAudioPlayer One"
        }
    },
    {
        path: '/search',
        component: () => import("@/views/Search.vue"),
        meta: {
            title: "Search - reAudioPlayer One"
        }
    },
    {
        name: "Search",
        path: '/search/:query',
        component: () => import("@/views/Search.vue"),
        meta: {
            title: "Search - reAudioPlayer One"
        }
    },
    {
        path: '/collection/albums',
        component: () => import("@/views/Collection/Albums.vue"),
        meta: {
            title: "Your Library - reAudioPlayer One"
        }
    },
    {
        path: '/collection/artists',
        component: () => import("@/views/Collection/Artists.vue"),
        meta: {
            title: "Your Library - reAudioPlayer One"
        }
    },
    {
        path: '/collection/playlists',
        component: () => import("@/views/Collection/Playlists.vue"),
        meta: {
            title: "Your Library - reAudioPlayer One"
        }
    },
    {
        path: '/collection/releases',
        component: () => import("@/views/Collection/Releases.vue"),
        meta: {
            title: "Releases - reAudioPlayer One"
        }
    },
    {
        path: '/collection/tracks',
        component: () => import("@/views/Collection/SmartPlaylist/Tracks.vue"),
        meta: {
            title: "Liked Songs - reAudioPlayer One"
        }
    },
    {
        path: '/collection/tracks/breaking',
        component: () => import("@/views/Collection/SmartPlaylist/Breaking.vue"),
        meta: {
            title: "Breaking Songs - reAudioPlayer One"
        }
    },
    {
        path: '/playlist/:id',
        component: () => import("@/views/Playlist.vue"),
        meta: {
            title: "Playlist - reAudioPlayer One"
        }
    },
    {
        path: '/track/:hash',
        component: () => import("@/views/Track-next.vue"),
        meta: {
            title: "Track - reAudioPlayer One"
        }
    },
    {
        path: '/preferences',
        component: () => import("@/views/preferences/index.vue"),
        meta: {
            title: "Preferences - reAudioPlayer One"
        }
    },
    {
        path: '/preferences/my-data',
        component: () => import("@/views/preferences/LocalData.vue"),
        meta: {
            title: "Preferences - reAudioPlayer One"
        }
    },
    {
        path: '/import',
        component: () => import("@/views/Import.vue"),
        meta: {
            title: "Import - reAudioPlayer One"
        }
    },
    {
        path: '/import/:data',
        component: () => import("@/views/Import.vue"),
        meta: {
            title: "Import - reAudioPlayer One"
        }
    },
    {
        path: '/export',
        component: () => import("@/views/Export.vue"),
        meta: {
            title: "Export - reAudioPlayer One"
        }
    },
    {
        path: '/export/:data',
        component: () => import("@/views/Export.vue"),
        meta: {
            title: "Export - reAudioPlayer One"
        }
    },
    {
        path: '/welcome',
        component: () => import("@/views/Welcome.vue"),
        meta: {
            title: "Welcome to reAudioPlayer One"
        }
    },
    {
        path: '/news',
        component: () => import("@/views/News.vue"),
        meta: {
            title: "News - reAudioPlayer One"
        }
    },
    {
        path: '/sports',
        component: () => import("@/views/Sports.vue"),
        meta: {
            title: "Sports - reAudioPlayer One"
        }
    },
    {
        path: '/news/:url',
        component: () => import("@/views/NewsArticle.vue"),
        meta: {
            title: "News - reAudioPlayer One"
        }
    },
    {
        path: '/player',
        component: () => import("@/views/BigPlayer.vue"),
        meta: {
            title: "reAudioPlayer One"
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
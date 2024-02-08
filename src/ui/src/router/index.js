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
    path: '/audius/callback',
    redirect: to => {
        // replace "#" with "?" to make it work with the audius callback
        window.location.href = window.location.origin + '/api/audius/callback' + to.hash.replace("#", "?")
        return null
    },
},
{
    name: "Search",
    path: '/search/:query',
    component: () => import("@/views/Search/index.vue"),
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
    component: () => import("@/views/playlist/special/Liked.vue"),
    meta: {
        title: "Liked Songs - reAudioPlayer One"
    }
},
{
    path: '/collection/tracks/breaking',
    component: () => import("@/views/playlist/special/Breaking.vue"),
    meta: {
        title: "Breaking Songs - reAudioPlayer One"
    }
},
{
    path: '/playlist/create',
    component: () => import("@/views/playlist/Create.vue"),
    meta: {
        title: "Create Playlist - reAudioPlayer One"
    }
},
{
    path: '/playlist/:id/edit',
    component: () => import("@/views/Collection/SmartPlaylist/Editor.vue"),
    meta: {
        title: "Smart Playlist Editor - reAudioPlayer One"
    }
},
{
    path: '/playlist/:id',
    component: () => import("@/views/playlist/Normal.vue"),
    meta: {
        title: "Playlist - reAudioPlayer One"
    }
},
{
    path: '/track/:hash',
    component: () => import("@/views/Track.vue"),
    meta: {
        title: "Track - reAudioPlayer One"
    }
},
{
    path: '/artist/:name',
    component: () => import("@/views/Artist.vue"),
    meta: {
        title: "Artist - reAudioPlayer One"
    }
},
{
    path: '/album/:hash',
    component: () => import("@/views/Album.vue"),
    meta: {
        title: "Album - reAudioPlayer One"
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
    path: '/import',
    component: () => import("@/views/sync/Import.vue"),
    meta: {
        title: "Import - reAudioPlayer One"
    }
},
{
    path: '/import/:id',
    component: () => import("@/views/sync/ImportLink.vue"),
    meta: {
        title: "Import - reAudioPlayer One"
    }
},
{
    path: '/export',
    component: () => import("@/views/sync/Export.vue"),
    meta: {
        title: "Export - reAudioPlayer One"
    }
},
{
    path: '/sing-along',
    component: () => import("@/views/SingAlong/index.vue"),
    meta: {
        title: "Sing Along - reAudioPlayer One"
    }
},
{
    path: '/download',
    component: () => import("@/views/Downloader/index.vue"),
    meta: {
        title: "Download - reAudioPlayer One"
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
    path: '/player/insights',
    component: () => import("@/views/BigPlayer/Insight.vue"),
    meta: {
        title: "Insights - reAudioPlayer One"
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
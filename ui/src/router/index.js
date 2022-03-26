import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [  
  { path: '/', component: () => import(/* webpackChunkName: "home" */ '@/components/body/Home.vue') },
  { path: '/search', component: () => import(/* webpackChunkName: "search" */ "@/components/body/Search.vue") },
  { path: '/search/:query', component: () => import(/* webpackChunkName: "search" */ "@/components/body/Search.vue") },
  { path: '/collection/albums', component: () => import(/* webpackChunkName: "albums" */ "@/components/body/Collection/Albums.vue") },
  { path: '/collection/artists', component: () => import(/* webpackChunkName: "artists" */ "@/components/body/Collection/Artists.vue") },
  { path: '/collection/playlists', component: () => import(/* webpackChunkName: "playlists" */ "@/components/body/Collection/Playlists.vue") },
  { path: '/collection/releases', component: () => import(/* webpackChunkName: "releases" */ "@/components/body/Collection/Releases.vue") },
  { path: '/collection/tracks', component: () => import(/* webpackChunkName: "tracks" */ "@/components/body/Collection/Tracks.vue") },
  { path: '/playlist/:id', component: () => import(/* webpackChunkName: "playlist" */ "@/components/body/Playlist.vue") },
  { path: '/track/:id', component: () => import(/* webpackChunkName: "track" */ "@/components/body/Track.vue") },
  { path: '/preferences', component: () => import(/* webpackChunkName: "preferences" */ "@/components/body/Preferences.vue") },
  { path: '/welcome', component: () => import(/* webpackChunkName: "welcome" */ "@/components/body/Welcome.vue") },
  { path: '/news', component: () => import(/* webpackChunkName: "news" */ "@/components/body/News.vue") },
  { path: '/sports', component: () => import(/* webpackChunkName: "sports" */ "@/components/body/Sports.vue") },
  { path: '/sports/volley/:id', component: () => import(/* webpackChunkName: "volleyMatch" */ "@/components/body/VolleyMatch.vue") },
  { path: '/news/:url', component: () => import(/* webpackChunkName: "newsArticle" */ "@/components/body/NewsArticle.vue") },
  { path: '/player', component: () => import(/* webpackChunkName: "bigPlayer" */ "@/components/body/BigPlayer.vue") },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

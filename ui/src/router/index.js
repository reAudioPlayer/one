import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/search',
    component: () => import( /* webpackChunkName: "search" */ "@/views/Search.vue"),
    meta: {
      title: "Search - reAudioPlayer One"
    }
  },
  {
    path: '/search/:query',
    component: () => import( /* webpackChunkName: "search" */ "@/views/Search.vue"),
    meta: {
      title: "Search - reAudioPlayer One"
    }
  },
  {
    path: '/collection/albums',
    component: () => import( /* webpackChunkName: "albums" */ "@/views/Collection/Albums.vue"),
    meta: {
      title: "Your Library - reAudioPlayer One"
    }
  },
  {
    path: '/collection/artists',
    component: () => import( /* webpackChunkName: "artists" */ "@/views/Collection/Artists.vue"),
    meta: {
      title: "Your Library - reAudioPlayer One"
    }
  },
  {
    path: '/collection/playlists',
    component: () => import( /* webpackChunkName: "playlists" */ "@/views/Collection/Playlists.vue"),
    meta: {
      title: "Your Library - reAudioPlayer One"
    }
  },
  {
    path: '/collection/releases',
    component: () => import( /* webpackChunkName: "releases" */ "@/views/Collection/Releases.vue"),
    meta: {
      title: "Releases - reAudioPlayer One"
    }
  },
  {
    path: '/collection/tracks',
    component: () => import( /* webpackChunkName: "tracks" */ "@/views/Collection/Tracks.vue"),
    meta: {
      title: "Liked Songs - reAudioPlayer One"
    }
  },
  {
    path: '/playlist/:id',
    component: () => import( /* webpackChunkName: "playlist" */ "@/views/Playlist.vue"),
    meta: {
      title: "Playlist - reAudioPlayer One"
    }
  },
  {
    path: '/track/:id',
    component: () => import( /* webpackChunkName: "track" */ "@/views/Track.vue"),
    meta: {
      title: "Track - reAudioPlayer One"
    }
  },
  {
    path: '/preferences',
    component: () => import( /* webpackChunkName: "preferences" */ "@/views/Preferences.vue"),
    meta: {
      title: "Preferences - reAudioPlayer One"
    }
  },
  {
    path: '/import/:data',
    component: () => import("@/components/body/Preferences.vue"),
    meta: {
      title: "Preferences - reAudioPlayer One"
    }
  },
  {
    path: '/welcome',
    component: () => import( /* webpackChunkName: "welcome" */ "@/views/Welcome.vue"),
    meta: {
      title: "Welcome to reAudioPlayer One"
    }
  },
  {
    path: '/news',
    component: () => import( /* webpackChunkName: "news" */ "@/views/News.vue"),
    meta: {
      title: "News - reAudioPlayer One"
    }
  },
  {
    path: '/sports',
    component: () => import( /* webpackChunkName: "sports" */ "@/views/Sports.vue"),
    meta: {
      title: "Sports - reAudioPlayer One"
    }
  },
  {
    path: '/sports/volley/:id',
    component: () => import( /* webpackChunkName: "volleyMatch" */ "@/views/VolleyMatch.vue"),
    meta: {
      title: "Volley - reAudioPlayer One"
    }
  },
  {
    path: '/news/:url',
    component: () => import( /* webpackChunkName: "newsArticle" */ "@/views/NewsArticle.vue"),
    meta: {
      title: "News - reAudioPlayer One"
    }
  },
  {
    path: '/player',
    component: () => import( /* webpackChunkName: "bigPlayer" */ "@/views/BigPlayer.vue"),
    meta: {
      title: "reAudioPlayer One"
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
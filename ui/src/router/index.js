import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    component: () => import( /* webpackChunkName: "home" */ '@/components/body/Home.vue'),
  },
  {
    path: '/search',
    component: () => import( /* webpackChunkName: "search" */ "@/components/body/Search.vue"),
    meta: {
      title: "Search - reAudioPlayer One"
    }
  },
  {
    path: '/search/:query',
    component: () => import( /* webpackChunkName: "search" */ "@/components/body/Search.vue"),
    meta: {
      title: "Search - reAudioPlayer One"
    }
  },
  {
    path: '/collection/albums',
    component: () => import( /* webpackChunkName: "albums" */ "@/components/body/Collection/Albums.vue"),
    meta: {
      title: "Your Library - reAudioPlayer One"
    }
  },
  {
    path: '/collection/artists',
    component: () => import( /* webpackChunkName: "artists" */ "@/components/body/Collection/Artists.vue"),
    meta: {
      title: "Your Library - reAudioPlayer One"
    }
  },
  {
    path: '/collection/playlists',
    component: () => import( /* webpackChunkName: "playlists" */ "@/components/body/Collection/Playlists.vue"),
    meta: {
      title: "Your Library - reAudioPlayer One"
    }
  },
  {
    path: '/collection/releases',
    component: () => import( /* webpackChunkName: "releases" */ "@/components/body/Collection/Releases.vue"),
    meta: {
      title: "Releases - reAudioPlayer One"
    }
  },
  {
    path: '/collection/tracks',
    component: () => import( /* webpackChunkName: "tracks" */ "@/components/body/Collection/Tracks.vue"),
    meta: {
      title: "Liked Songs - reAudioPlayer One"
    }
  },
  {
    path: '/playlist/:id',
    component: () => import( /* webpackChunkName: "playlist" */ "@/components/body/Playlist.vue"),
    meta: {
      title: "Playlist - reAudioPlayer One"
    }
  },
  {
    path: '/track/:id',
    component: () => import( /* webpackChunkName: "track" */ "@/components/body/Track.vue"),
    meta: {
      title: "Track - reAudioPlayer One"
    }
  },
  {
    path: '/preferences',
    component: () => import( /* webpackChunkName: "preferences" */ "@/components/body/Preferences.vue"),
    meta: {
      title: "Preferences - reAudioPlayer One"
    }
  },
  {
    path: '/welcome',
    component: () => import( /* webpackChunkName: "welcome" */ "@/components/body/Welcome.vue"),
    meta: {
      title: "Welcome to reAudioPlayer One"
    }
  },
  {
    path: '/news',
    component: () => import( /* webpackChunkName: "news" */ "@/components/body/News.vue"),
    meta: {
      title: "News - reAudioPlayer One"
    }
  },
  {
    path: '/sports',
    component: () => import( /* webpackChunkName: "sports" */ "@/components/body/Sports.vue"),
    meta: {
      title: "Sports - reAudioPlayer One"
    }
  },
  {
    path: '/sports/volley/:id',
    component: () => import( /* webpackChunkName: "volleyMatch" */ "@/components/body/VolleyMatch.vue"),
    meta: {
      title: "Volley - reAudioPlayer One"
    }
  },
  {
    path: '/news/:url',
    component: () => import( /* webpackChunkName: "newsArticle" */ "@/components/body/NewsArticle.vue"),
    meta: {
      title: "News - reAudioPlayer One"
    }
  },
  {
    path: '/player',
    component: () => import( /* webpackChunkName: "bigPlayer" */ "@/components/body/BigPlayer.vue"),
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
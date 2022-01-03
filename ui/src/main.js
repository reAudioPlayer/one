import { createApp } from 'vue'
import App from './App.vue'
import { ObserveVisibility } from 'vue-observe-visibility';
import VueFinalModal from 'vue-final-modal'

import { createWebHashHistory, createRouter } from "vue-router";

import Home from "./components/body/Home.vue" 
import Playlist from "./components/body/Playlist.vue"
import Search from "./components/body/Search.vue"
import Albums from "./components/body/Collection/Albums.vue"
import Artists from "./components/body/Collection/Artists.vue"
import Playlists from "./components/body/Collection/Playlists.vue"
import Releases from "./components/body/Collection/Releases.vue"
import Tracks from "./components/body/Collection/Tracks.vue"

import contextmenu from "v-contextmenu";

const app = createApp(App)
app.directive("observe-visibility", {
    beforeMount: (el, binding, vnode) => {
      vnode.context = binding.instance
      ObserveVisibility.bind(el, binding, vnode)
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  })
app.use(VueFinalModal())
app.use(contextmenu);

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/search/:query', component: Search },
  { path: '/collection/albums', component: Albums },
  { path: '/collection/artists', component: Artists },
  { path: '/collection/playlists', component: Playlists },
  { path: '/collection/releases', component: Releases },
  { path: '/collection/tracks', component: Tracks },
  { path: '/playlist/:id', component: Playlist },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(router)

app.mount('#app')

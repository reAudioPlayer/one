import { createApp } from 'vue'
import App from './App.vue'
import { ObserveVisibility } from 'vue-observe-visibility';
import VueFinalModal from 'vue-final-modal'
import store from "@/store";

import router from "./router";

import contextmenu from "v-contextmenu";

const app = createApp(App)
app.directive("observe-visibility", {
    beforeMount: (el, binding, vnode) => {
      vnode.context = binding.instance
      ObserveVisibility.bind(el, binding, vnode)
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
});
app.use(VueFinalModal());
app.use(contextmenu);

app.use(router);
app.use(store);

app.mount('#app')

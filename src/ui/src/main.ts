import {createApp} from 'vue'
import App from './App.vue'
import {ObserveVisibility} from 'vue-observe-visibility';
import VueFinalModal from 'vue-final-modal'

import router from "./router";

import contextmenu from "v-contextmenu";
import {createPinia} from "pinia";

const pinia = createPinia()
const app = createApp(App)

app.directive("observe-visibility", {
    beforeMount: (el, binding, vnode) => {
        // @ts-ignore
        vnode.context = binding.instance
        ObserveVisibility.bind(el, binding, vnode)
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
});
app.use(VueFinalModal());
app.use(contextmenu);

app.use(router);
app.use(pinia);

app.mount('#app')

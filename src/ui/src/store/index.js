import { createApp } from 'vue'
import { createStore } from 'vuex'
import player from "./modules/player.js";

// Create a new store instance.
const store = createStore({
    modules: {
        player
    },
});

export default store;
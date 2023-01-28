<script setup>
import {usePlayerStore} from "@/store/player";
import {useDataStore} from "@/store/data";
import {computed} from "vue";
import {useSettingsStore} from "@/store/settings";
import {parsePlaylistCover} from "@/common";

const player = usePlayerStore();
const data = useDataStore();

const cover = computed(() => player.song.cover);
const playlists = computed(() => data.playlists);

const settings = useSettingsStore();
</script>
<template>
    <div class="sidebar drop-shadow-xl">
        <div class="static">
            <nav-entry :minimised="minimised" href="/collection/playlists" icon="library_music" name="Your Library"
                       :hasChildSites="true" parentHref="/collection"/>
            <nav-entry :minimised="minimised" href="/discover" icon="explore" name="Discover"/>
            <br v-if="settings.sidebar.news || settings.sidebar.sports">
            <nav-entry :minimised="minimised" v-if="settings.sidebar.news" href="/news" icon="newspaper" name="News"
                       :hasChildSites="true"/>
            <nav-entry :minimised="minimised" v-if="settings.sidebar.sports" href="/sports" icon="sports_soccer"
                       name="Sports"
                       :hasChildSites="true"/>
            <br class="hideIfMobile">
            <nav-entry class="hideIfMobile" :minimised="minimised" href="/playlist/create" icon="add_circle"
                       name="Create Playlist"/>
            <nav-entry :minimised="minimised" href="/collection/tracks" icon="favorite" name="Liked Songs"/>
        </div>
        <hr class="hideIfMobile" v-if="playlists.length">
        <template v-if="!minimised">
            <div class="playlistList expanded hideIfMobile">
                <router-link v-for="(element, index) in playlists" :key="index" :to="element.href">{{ element.name }}
                </router-link>
            </div>
        </template>
        <template v-else>
            <div class="playlistList hideIfMobile">
                <nav-entry v-for="(element, index) in playlists" :key="index" :minimised="minimised"
                           :href="element.href" :img="element.cover" :name="element.name"/>
            </div>
        </template>
        <img
            v-if="settings.player.expandedCover"
            @click="settings.player.expandedCover = false"
            :src="cover"
            class="cover hideIfMobile"
        />
    </div>
</template>

<script>
import NavEntry from '@/components/Sidebar/NavEntry.vue'
import {computed} from "vue";
import {useSettingsStore} from "@/store/settings";

export default {
    name: 'Sidebar',
    components: {
        NavEntry
    },
    watch: {
        minimised() {
            this.collapseSidebar();
        }
    },
    mounted() {
        this.collapseSidebar();
    },
    computed: {
        minimised() {
            return true
        }
    },
    methods: {
        hideCover() {
            this.$emit("expandCover", false)
        },
        collapseSidebar() {
            document.documentElement.style.setProperty("--w-sidebar", this.minimised ? "44px" : "200px");
        }
    }
}
</script>

<style scoped lang="scss">
$mobileWidth: 750px;

.logo {
    fill: var(--fg-base);
    padding: 10px;
    width: 60%;

    &:hover {
        cursor: pointer;
    }
}

.collapseSidebar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;

    &.minimised {
        justify-content: center;
    }

    .clickSymbol {
        border-radius: 5px;

        &:hover {
            cursor: pointer;
            background: var(--hover-2);
        }
    }
}

.static {
    flex-shrink: 0;
    flex-grow: 0;

    @media screen and (max-width: $mobileWidth) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
}

h2 {
    margin-bottom: 0;
}

.cover {
    position: absolute;
    bottom: 10px;
    width: 100%;
    transform: translate(-10px, 10px);
}

.playlistList {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &.expanded {
        padding: 0px 10px;
    }
}

.playlistList > a {
    font-size: 0.92em;
    text-decoration: none;
    color: var(--font-darker);
    margin-bottom: 4px;
    margin-top: 4px;
}

.playlistList > a:hover {
    color: var(--font-colour)
}

hr {
    width: 100%;
}

div.sidebar {
    background: var(--bg-base-dk);
    width: calc(var(--w-sidebar) + 20px);
    min-width: calc(var(--w-sidebar) + 20px);
    max-width: calc(var(--w-sidebar) + 20px);
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    max-height: 100%;
    z-index: 1;
    position: relative;
    overflow: hidden;

    @media screen and (max-width: $mobileWidth) {
        flex-direction: row;
        width: 100vw;
        position: absolute;
        bottom: 0;
        margin: 0;
        max-width: 100vw;
    }
}

h2:hover {
    cursor: pointer;
}

h2 {
    margin: 0;
    padding: 10px;
}
</style>
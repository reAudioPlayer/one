<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import { usePlayerStore } from "@/store/player";
import { useDataStore } from "@/store/data";
import { computed } from "vue";
import { useSettingsStore } from "@/store/settings";
import NavEntry from "@/components/Sidebar/NavEntry.vue";

const player = usePlayerStore();
const data = useDataStore();

const cover = computed(() => player.song.cover);
const playlists = computed(() => data.playlists);

const settings = useSettingsStore();
</script>
<template>
    <div class="sidebar drop-shadow-xl">
        <div class="static">
            <nav-entry
                :hasChildSites="true"
                minimised
                href="/collection/playlists"
                icon="library_music"
                name="Your Library"
                parentHref="/collection"
            />
            <nav-entry
                minimised
                href="/preferences"
                icon="settings"
                name="Settings"
                class="showIfMobile"
            />
            <nav-entry
                minimised
                href="/discover"
                icon="explore"
                name="Discover"
                class="hideIfMobile"
            />
            <br v-if="settings.sidebar.news || settings.sidebar.sports" />
            <nav-entry
                v-if="settings.sidebar.news"
                :hasChildSites="true"
                minimised
                href="/news"
                icon="newspaper"
                name="News"
            />
            <nav-entry
                v-if="settings.sidebar.sports"
                :hasChildSites="true"
                minimised
                href="/sports"
                icon="sports_soccer"
                name="Sports"
            />
            <br class="hideIfMobile" />
            <nav-entry
                minimised
                class="hideIfMobile"
                href="/playlist/create"
                icon="add_circle"
                name="Create Playlist"
            />
        </div>
        <hr v-if="playlists.length" class="hideIfMobile" />
        <div class="playlistList hideIfMobile">
            <nav-entry
                v-for="(element, index) in playlists.filter(
                    (x) => x.type != 'special'
                )"
                :key="index"
                :href="element.href"
                :img="element.cover"
                minimised
                :name="element.name"
            />
        </div>
        <img
            v-if="settings.player.expandedCover"
            :src="cover"
            class="cover hideIfMobile"
            @click="settings.player.expandedCover = false"
        />
    </div>
</template>

<style lang="scss" scoped>
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
    color: var(--font-colour);
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
    position: fixed;
    top: var(--h-header);
    bottom: var(--h-player);
    overflow: hidden;
    border: var(--border-container);

    @media screen and (max-width: $mobileWidth) {
        flex-direction: row;
        position: absolute;
        inset: 0;
        border-radius: 0;
        max-width: unset;
        width: 100%;
        height: max-content;
        margin: 0;
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

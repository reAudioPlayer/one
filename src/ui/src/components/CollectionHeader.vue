<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="wrapper">
        <router-link class="link" to="/collection/playlists">
            <div class="collection">Playlists</div>
        </router-link>
        <router-link class="link" to="/collection/releases">
            <div class="collection">Releases</div>
        </router-link>
        <router-link class="link" to="/collection/artists">
            <div class="collection">Artists</div>
        </router-link>
        <router-link v-if="false" class="link" to="/collection/albums">
            <div class="collection">Albums</div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "CollectionHeader",
    props: {
        href: String,
    },
};
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

.link {
    text-decoration: none;
}

.collection {
    padding: 0.5em 1em;
    border-radius: 1000vmax;
    font-weight: bold;
    color: var(--fg-base);
    margin-right: 10px;
    font-size: 0.85em;
    border: var(--border-container);

    transition: all 0.2s ease-in-out;
}

.collection:hover {
    background: var(--bg-hover-dk);
    border-color: var(--fg-secondary);
}

.router-link-active div.collection {
    background: var(--fg-secondary);
    color: var(--fg-contrast);
}
</style>

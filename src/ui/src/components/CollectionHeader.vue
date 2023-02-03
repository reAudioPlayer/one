<template>
    <div class="wrapper">
        <router-link class="link" to="/collection/playlists">
            <div class="collection">
                Playlists
            </div>
        </router-link>
        <router-link class="link" to="/collection/releases">
            <div class="collection">
                Releases
            </div>
        </router-link>
        <router-link class="link" to="/collection/artists">
            <div class="collection">
                Artists
            </div>
        </router-link>
        <router-link v-if="false" class="link" to="/collection/albums">
            <div class="collection">
                Albums
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'CollectionHeader',
        props: {
            href: String
        }
    }
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
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        color: var(--fg-base);
        margin-right: 10px;
        font-size: .85em;
    }

    .collection:hover {
        background: var(--bg-hover-dk);
    }

    .router-link-active div.collection {
        background: var(--bg-hover);
    }

</style>

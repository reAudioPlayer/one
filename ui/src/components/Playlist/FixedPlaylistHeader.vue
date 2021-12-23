<template>
    <div class="fixedPlaylistHeader">
        <div class="upperWrapper">
            <span id="loadPlaylist" @click="this.$emit('click')" class="material-icons-outlined">play_circle_filled</span>
            <h3>{{title}}</h3>
        </div>
        <grid-header class="padding-20" />
    </div>
</template>
<script>
import GridHeader from '../Playlist/GridHeader.vue'

export default {
    name: "FixedPlaylistHeader",
    components: {
        GridHeader
    },
    props: {
        title: String
    }
}
</script>

<style scoped>
    .padding-20 {
        padding-left: 20px;
        padding-right: 20px;
    }

    .upperWrapper {
        padding: 10px;
        display: flex;
        flex-direction: row;
    }

    #loadPlaylist {
        font-size: 2.5em;
        line-height: 35px;
        width: 42px;
        vertical-align: middle;
    }

    #loadPlaylist:hover {
        cursor: pointer;
        font-size: 2.6em;
    }

    h3 {
        font-size: 1.4em;
        display: inline;
        margin: 0;
        margin-left: 10px;
    }

    .fixedPlaylistHeader {
        position: fixed;
        top: 0;
        left: calc(var(--sidebar-width) + 16px);
        right: 0;
        padding-right: 3px;

        background: var(--gradient-c1);
        z-index: 100;
        height: 80px;
        padding-bottom: 10px;
    }
</style>

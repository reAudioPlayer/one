<script setup lang=ts>
import { ref } from 'vue';
import { IFullPlaylist } from '../../common';
import PlaylistEntry from '../songContainers/PlaylistEntry.vue';
import PlaylistHeader from '../songContainers/PlaylistHeader.vue';
import Card from '../../containers/Card.vue';

defineProps({
    playlist: {
        type: Object as () => IFullPlaylist,
        required: false
    }
});

const selectedSongId = ref(-1);
</script>
<template>
    <div ref="playlist-scroll" class="playlist" v-if="playlist">
        <PlaylistHeader />
        <PlaylistEntry
            v-for="(element, index) in playlist.songs"
            :id="'bplayer-entry-' + element.id"
            :key="element.source"
            :index="index"
            :selected="selectedSongId == element.id"
            :song="element"
            with-cover
            @click="
                selectedSongId == element.id
                    ? (selectedSongId = -1)
                    : (selectedSongId = element.id)
            "
        />
    </div>
</template>

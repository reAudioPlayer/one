<script setup lang="ts">
import { ref } from "vue";
import { IFullPlaylist } from "../../common";
import PlaylistEntry from "../songContainers/PlaylistEntry.vue";
import PlaylistHeader from "../songContainers/PlaylistHeader.vue";

const playlistScroll = ref(null);

defineProps({
    playlist: {
        type: Object as () => IFullPlaylist,
        required: false,
    },
    useQueue: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const selectedSongId = ref(-1);

defineExpose({
    scrollToSong: (id: number) => {
        const scroll = document.getElementById(
            `bplayer-entry-${id}`
        )?.offsetTop;
        if (scroll >= 150) {
            playlistScroll.value.scrollTop = scroll - 150;
        }
    },
});
</script>
<template>
    <div ref="playlistScroll" class="playlist" v-if="playlist">
        <PlaylistHeader />
        <PlaylistEntry
            v-for="(element, index) in useQueue
                ? playlist.queue
                : playlist.songs"
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

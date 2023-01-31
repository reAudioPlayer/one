<script setup lang="ts">
import {ISpotifySong} from "../../../common";
import {PropType} from "vue";
import AlbumHeader from "../../Album/AlbumHeader.vue";
import AlbumEntry from "../../Album/AlbumEntry.vue";

const props = defineProps({
    songs: {
        type: Array as PropType<ISpotifySong[]>,
        required: true
    },
    noCover: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div class="playlist">
        <AlbumHeader/>
        <hr>
        <div class="entries">
            <AlbumEntry
                @add="$emit('add', index)"
                v-for="(track, index) in songs"
                :key="track.source"
                :added="track.added"
                :index="index"
                :cover="noCover ? null : track.cover"
                :artist="track.artists.join(', ')"
                :title="track.title"
                :source="track.source /* TODO this was src, does this work that way? */"
                :preview="track.source"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.playlist {
    position: relative;
    overflow: hidden;

    .entries {
        position: relative;
        overflow-y: auto;
        display: flex;
        flex-direction: column;

        height: 100%;

        max-height: 30vh;
    }
}
</style>

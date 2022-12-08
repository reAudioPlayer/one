<script setup lang="ts">
import {ISong} from "../../../common";
import {PropType} from "vue";
import AlbumHeader from "../../Album/AlbumHeader.vue";
import AlbumEntry from "../../Album/AlbumEntry.vue";

interface ITrack extends ISong {
    added?: boolean;
    artists: string[];
    source: string;
}

const props = defineProps({
    songs: {
        type: Array as PropType<ITrack[]>,
        required: true
    }
})
</script>
<template>
    <AlbumHeader />
    <hr>
    <AlbumEntry
        @add="$emit('add', index)"
        v-for="(track, index) in songs"
        :key="track.source"
        :added="track.added"
        :index="index"
        :cover="track.cover"
        :artist="track.artists.join(', ')"
        :title="track.title"
        :source="track.src"
        :preview="track.source"
    />
</template>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { ISpotifySong } from "../../../common";
import { PropType } from "vue";
import PlaylistHeader from "../../songContainers/PlaylistHeader.vue";
import ExternalEntry from "../../songContainers/ExternalEntry.vue";

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
        <PlaylistHeader without-duration />
        <hr>
        <div class="entries">
            <ExternalEntry
                v-for="(track, index) in songs"
                :key="track.source"
                :added="track.added"
                :index="index"
                :song="track"
                :title="track.title"
                :with-cover="!noCover"
                @add="$emit('add', index)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.playlist {
    position: relative;

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

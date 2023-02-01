<script lang="ts" setup>

defineProps({
    index: {
        type: Number,
        required: true
    },
    withAlbum: {
        type: Boolean,
        required: false,
        default: false
    },
    withMore: {
        type: Boolean,
        required: false,
        default: false
    },
    withoutDuration: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>
<template>
    <div :class="{ withAlbum, withMore }" class="playlist-header">
        <div class="index text-right">#</div>
        <div class="artist-title">
            title
        </div>
        <div v-if="withAlbum" class="album">
            album
        </div>
        <div v-if="!withoutDuration" class="duration">
            <span class="material-symbols-rounded">schedule</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.playlist-header {
    display: grid;
    grid-template-columns: 50px 40px 1fr 1fr 40px 60px;
    gap: 10px;

    .index {
        margin: auto 0;
    }

    .artist-title {
        grid-column: 2 / span 2;
    }

    .duration {
        text-align: center;
        grid-column-start: 6;
    }

    &:not(.withMore) .duration {
        grid-column-start: 7;
    }

    div {
        margin: auto 0;
        color: var(--fg-base-dk);
        font-size: .9rem;
        text-transform: uppercase;
    }
}
</style>

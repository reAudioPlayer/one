<script lang="ts" setup>
import {usePlayerStore} from "../store/player";

const player = usePlayerStore();
</script>
<template>
    <div class="player">
        {{ player.song.title }}
    </div>
</template>
<style lang="scss">
.player {
    background: var(--bg-base-dk);
    height: var(--h-player);
}
</style>
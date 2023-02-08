<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="albums">
            Albums
        </div>
    </div>
</template>

<script>
import CollectionHeader from '@/components/CollectionHeader.vue'
    export default {
        components: { CollectionHeader },
        name: 'Albums',
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }
</style>

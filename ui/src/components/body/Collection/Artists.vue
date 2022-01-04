<template>
    <div class="padding-20">
        <CollectionHeader />
        <div class="artists">
            Artists
        </div>
    </div>
</template>

<script>
import CollectionHeader from './CollectionHeader.vue'
    export default {
        components: { CollectionHeader },
        name: 'Artists',
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }
</style>

<script setup>
import Index from "@/views/Collection/SmartPlaylist/index";
</script>
<template>
    <index
        src="/api/me/liked"
        :id="-1"
    />
</template>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <router-link :to="href" class="no-underline">
        <div class="home-playlist drop-shadow-md">
            <Cover :src="cover" type="playlist" />
            <h2>{{name}}</h2>
        </div>
    </router-link>
</template>
<script setup>
import Cover from "@/components/image/Cover.vue";

defineProps({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    }
})
</script>

<style scoped lang="scss">

.home-playlist {
    background: var(--bg-base-lt);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex: 1;
    max-width: 150px;

    &:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);
    }

    margin: 10px;

    img {
        border-radius: 12px;
        width: 100%;
    }


    h2 {
        font-size: 1em;
        margin-bottom: 0;
        color: var(--fg-base);
    }
}

</style>
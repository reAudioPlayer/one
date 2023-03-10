<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <router-link :to="href" class="no-underline">
        <Card class="home-playlist drop-shadow-md" with-hover>
            <Cover :src="cover" type="playlist" />
            <h2>{{name}}</h2>
        </Card>
    </router-link>
</template>
<script setup>
import Cover from "@/components/image/Cover.vue";
import Card from "@/containers/Card.vue";

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

<style lang="scss" scoped>

.home-playlist {
    background: var(--bg-base-lt);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex: 1;
    max-width: 200px;
    height: calc(100% - 20px);

    &:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);
    }

    margin: 10px;

    .cover {
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
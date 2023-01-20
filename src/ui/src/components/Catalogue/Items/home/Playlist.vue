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
    background: var(--background-light);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex: 1;
    max-width: 150px;

    &:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    margin: 10px;

    img {
        border-radius: 12px;
        width: 100%;
    }


    h2 {
        font-size: 1em;
        margin-bottom: 0;
        color: var(--font-colour);
    }
}

</style>
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Card class="wrapper" with-hover>
        <div class="item" @click="redirect">
            <Cover :src="cover" />
            <h4>{{ title }}</h4>
            <p>{{ artist }}</p>
        </div>
    </Card>
</template>

<script>
import Cover from "@/components/image/Cover.vue";
import Card from "@/containers/Card.vue";

export default {
    name: "TrackItem",
    components: { Card, Cover },
    methods: {
        redirect() {
            this.$router.push(this.href);
        },
    },
    props: {
        cover: String,
        title: String,
        artist: String,
        href: String,
    },
};
</script>

<style scoped>
p.note {
    font-size: 0.7em;
}

.wrapper {
    background: var(--bg-base-lt);
    border-radius: 20px;
    padding: 20px;
    min-height: 10vh;
    margin: 10px;
}

.wrapper:hover {
    cursor: pointer;
    background: var(--bg-hover-dk);
}

.item {
    height: calc(100% - 40px);
}

img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 1em;
}

h4 {
    margin: 0;
}

p {
    margin: 0;
    color: var(--font-darker);
    font-size: 0.8em;
}
</style>

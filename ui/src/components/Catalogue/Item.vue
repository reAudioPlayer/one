<template>
    <div class="item" @click="redirect">
        <img :src="cover" />
        <h4>{{title}}</h4>
        <p>{{artist}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Item',
        methods: {
            redirect() {
                // TODO, redirect to this page, not to external
                window.open(this.href)
            }
        },
        props: {
            cover: String,
            title: String,
            artist: String,
            href: String
        }
    }
</script>

<style scoped>
    .item {
        background: var(--glass-gradient);
        padding: 20px;
        margin: 10px;
        border-radius: 5px;
        min-height: 10vh;
    }

    .item:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    img {
        width: 100%;
        border-radius: 2px;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: 0;
        color: var(--font-darker);
        font-size: .8em;
    }
</style>

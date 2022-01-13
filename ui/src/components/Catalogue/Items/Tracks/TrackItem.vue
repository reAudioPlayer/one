<template>
    <div class="wrapper">
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{title}}</h4>
            <p>{{artist}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TrackItem',
        methods: {
            redirect() {
                console.log("redirect")
                this.$router.push(this.href)
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
    p.note {
        font-size: .7em;
    }

    .wrapper {
        background: var(--background-light);
        border-radius: 5px;
        min-height: 10vh;
        margin: 10px;
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    .item {
        padding: 20px;
        height: calc(100% - 40px);
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

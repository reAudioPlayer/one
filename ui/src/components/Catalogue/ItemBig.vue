<template>
    <div class="itemBig">
        <div class="item" @click="redirect">
            <img :src="cover" />
            <div class="wrapper">
                <h4>{{title}}</h4>
                <p>{{artist}}</p>
                <p class="note" v-if="releaseDate">Released on {{releaseDate}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ItemBig',
        methods: {
            redirect() {
                this.$router.push(`/album/spotify/${this.href.replace("https://open.spotify.com/album/", "")}`)
            }
        },
        props: {
            cover: String,
            title: String,
            artist: String,
            href: String,
            releaseDate: String
        }
    }
</script>

<style scoped>
    p.note {
        font-size: .8em;
    }

    .itemBig {
        grid-column: span 3;
        background: var(--glass-gradient);
        border-radius: 5px;
        min-height: 10vh;
        margin: 10px;
    }

    .item {
        display: flex;
        flex-direction: row;
        padding: 20px;
        height: calc(100% - 40px);
    }

    .wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .itemBig:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    img {
        width: 50%;
        border-radius: 2px;
    }

    h4 {
        margin: 0;
        font-size: 1.2em;
    }

    p {
        margin: 0;
        color: var(--font-darker);
        font-size: .9em;
    }
</style>

<template>
    <div class="itemBig">
        <PlaylistCtx :href="href" :id="id" :name="title">
            <div class="item" @click="redirect">
                <img :src="cover" />
                <div class="wrapper">
                    <h4>{{title}}</h4>
                </div>
            </div>
        </PlaylistCtx>
    </div>
</template>

<script>
import PlaylistCtx from '../../../ContextMenus/PlaylistCtx.vue'
    export default {
    name: "PlaylistItemWide",
    methods: {
        redirect() {
            this.$router.push(this.href);
        }
    },
    props: {
        title: String,
        href: String,
        cover: String,
        id: Number
    },
    components: { PlaylistCtx }
}
</script>

<style scoped>
    p.note {
        font-size: .8em;
    }

    .itemBig {
        grid-column: span 3;
        background: var(--hover-1);
        border-radius: 5px;
        min-height: 5vh;
        margin: 10px;
    }

    .item {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .itemBig:hover {
        cursor: pointer;
        background: var(--hover-2);
    }

    img {
        width: 30%;
        border-radius: 2px;
        margin-right: 20px;
    }

    h4 {
        margin: 0;
        font-size: 1em;
    }

    p {
        margin: 0;
        color: var(--font-colour);
    }
</style>

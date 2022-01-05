<template>
    <div class="gridHeader">
        <span class="id">#</span>
        <span class="title">Title</span>
    </div>
</template>

<script>
export default {
    name: "AlbumHeader"
}
</script>

<style scoped>
    .gridHeader {
        display: flex;
        flex-direction: row;
        text-transform: uppercase;
        color: var(--font-darker);
        letter-spacing: 1px;
        font-size: 0.87em;
    }

    .gridHeader>.id {
        width: 50px;
        text-align: right;
    }

    .gridHeader>.title {
        flex-grow: 1;
        margin-left: 10px;
    }
</style>

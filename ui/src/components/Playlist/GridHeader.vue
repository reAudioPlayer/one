<template>
    <div class="gridHeader">
        <span class="id">#</span>
        <span class="title">Title</span>
        <span class="album">Album</span>
        <span class="clock material-symbols-rounded">schedule</span>
    </div>
</template>

<script>
export default {
    name: "GridHeader"
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
        width: 50%;
        margin-left: 10px;
    }

    .gridHeader>.clock {
        text-align: right;
        width: 40px;
        margin-right: calc(20px + 40px);
        flex-shrink: 0;
    }

    .gridHeader>.album {
        flex-grow: 1;
        margin-left: 5px;
    }
</style>

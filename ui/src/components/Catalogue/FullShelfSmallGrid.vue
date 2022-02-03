<template>
    <div class="shelf">
        <div class="header">
            <h2>{{heading}}</h2>
        </div>
        <div class="items">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FullShelfSmallGrid',
        props: {
            heading: String
        }
    }
</script>

<style scoped>
    .header {
        margin: 10px 10px 0px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .header>h2 {
        align-self: flex-start;
        margin-top: 0;
        margin-bottom: 10px;
    }

    .header>h5 {
        text-transform: uppercase;
        align-self: center;
        margin: 0;
    }

    .header>h5:hover {
        cursor: pointer;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
        grid-template-rows: 1fr;
        overflow-y: auto;
    }
</style>

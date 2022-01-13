<template>
    <div class="shelf">
        <div v-if="heading" class="header">
            <h2>{{heading}}</h2>
            <h5 @click="redirect">See All</h5>
        </div>
        <div class="items">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Shelf',
        props: {
            heading: String,
            href: String
        },
        methods: {
            redirect() {
                if (!this.href)
                {
                    return
                }
                this.$router.push(this.href)
            }
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
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-auto-rows: 0;
        grid-template-rows: 1fr;
        overflow-y: hidden;
    }
</style>

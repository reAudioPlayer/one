<template>
    <div @click="redirect" class="home-playlist drop-shadow-md">
        <img :src="cover" />
        <h2>{{name}}</h2>
    </div>
</template>
<script>
export default {
    name: 'FlexShelf',
    props: {
        name: String,
        cover: String,
        href: String
    },
    methods: {
        redirect() {
            this.$router.push(this.href)
        }
    }
}
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
    }


    h2 {
        font-size: 1em;
        margin-bottom: 0;
    }
}

</style>
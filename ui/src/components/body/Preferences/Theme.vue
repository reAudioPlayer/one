<template>
    <div @click="select" class="wrapper">
        <img :src="src" :class="{ 'selected': selected() }">
    </div>
</template>

<script>
export default {
    name: "Theme",
    props: {
        name: String
    },
    data() {
        return {
            src: require(`/src/assets/images/themes/${this.name}.svg`)
        }
    },
    methods: {
        selected() {
            return window.getCurrentTheme() == this.name
        },
        select() {
            window.setTheme(this.name)
        }
    }
}
</script>

<style scoped>

    .wrapper {
        grid-column: span 2;
        padding: 20px;
    }

    .wrapper:hover {
        cursor: pointer;
    }

    img {
        width: 100%;
    }

    img.selected {
        border: 2px solid var(--accent);
        border-radius: 8px;
    }

</style>
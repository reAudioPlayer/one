<template>
    <div @click="select" class="wrapper">
        <p :class="{ 'selected': selected() }">{{name}}</p>
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
            src: new URL(`/src/assets/images/themes/${this.name}.svg`, import.meta.url).href
        }
    },
    methods: {
        selected() {
            return window.getCurrentTheme() == this.name
        },
        select() {
            window.setTheme(this.name)
            this.$emit("selected")
        }
    }
}
</script>

<style scoped>

    p {
        margin: 0;
        font-size: .8em;
        color: var(--font-darker);
    }

    p.selected {
        color: var(--accent);
    }

    .wrapper {
        grid-column: span 2;
        padding: 20px;
    }

    .wrapper:hover {
        cursor: pointer;
    }

    img {
        width: 100%;
        border-radius: 8px;
    }

    img.selected {
        border: 2px solid var(--accent);
    }

</style>
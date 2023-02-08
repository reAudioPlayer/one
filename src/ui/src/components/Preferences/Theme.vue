<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div @click="select" class="wrapper">
        <p class="mb-4" :class="{ 'selected': selected() }">{{name}}</p>
        <img :src="`/assets/img/themes/${this.name}.svg`" :class="{ 'selected': selected() }">
    </div>
</template>

<script>
export default {
    name: "Theme",
    props: {
        name: String
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
        margin: 0 0 .5em 0;
        font-size: .8em;
        color: var(--fg-base-dk);
        text-transform: capitalize;
    }

    p.selected {
        color: var(--fg-secondary);
    }

    .wrapper {
        grid-column: span 2;
    }

    .wrapper:hover {
        cursor: pointer;
    }

    img {
        width: 100%;
        border-radius: 8px;
    }

    img.selected {
        border: 2px solid var(--fg-secondary);
    }

</style>
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div @click="select" class="wrapper">
        <img :src="`/assets/img/themes/${this.name}.svg`" :class="{ 'selected': selected() }">
    </div>
</template>

<script>
export default {
    name: "ThemeSmall",
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

    .wrapper {
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
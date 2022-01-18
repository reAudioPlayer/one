<template>
    <div class="preferences">
        <full-shelf heading="Themes" :key="themeSelected">
            <theme @selected="updateThemes" v-for="(theme, index) in themes" :key="index"
                :name="theme" />
        </full-shelf>
    </div>
</template>

<script>
    import FullShelf from "../Catalogue/FullShelf.vue"
    import Theme from "./Preferences/Theme.vue"
    export default {
    components: { Theme, FullShelf },
        name: "Preferences",
        methods: {
            updateThemes() {
                this.themeSelected = window.getCurrentTheme()
            }
        },
        data() {
            const themes = [
                "default",
                "royal",
                "ruby",
                "night-jade",
                "night-cobalt",
                "night-crimson",
                "night-fire",
                "reap",
                "neon",
                "tink",
                "light",
                "light-royal",
                "light-ruby"
            ]
            const themeSelected = window.getCurrentTheme()
            return {
                themes,
                themeSelected
            }
        }
    }
</script>

<style scoped>
    .preferences {
        padding: 20px;
    }
</style>

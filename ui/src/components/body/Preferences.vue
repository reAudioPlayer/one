<template>
    <div class="preferences">
        <full-shelf heading="Themes">
            <theme name="default" />
            <theme name="royal" />
            <theme name="ruby" />
            <theme name="night-jade" />
            <theme name="night-cobalt" />
            <theme name="night-ruby" />
            <theme name="night-fire" />
            <theme name="reap" />
            <theme name="neon" />
            <theme name="tink" />
        </full-shelf>
    </div>
</template>

<script>
    import FullShelf from "../Catalogue/FullShelf.vue"
    import Theme from "./Preferences/Theme.vue"
    export default {
    components: { Theme, FullShelf },
        name: "Preferences"
    }
</script>

<style scoped>
    .preferences {
        padding: 20px;
    }
</style>

<template>
    <div class="header flex flex-row justify-between">
        <Logo class="logo" />
        <div class="search flex flex-row">
            <nav-entry minimised href="/" icon="home" name="Home" class="mr-2" />
            <text-input-with-icon
                class="w-96"
                icon="search"
                placeholder="Search..."
                v-model="query"
                @submit="submit"
            />
        </div>
        <nav-entry minimised href="/preferences" icon="settings" name="Preferences" class="mr-2" />
    </div>
</template>

<script setup>
import Logo from '/src/assets/images/logo/logo.svg'
import NavEntry from '@/components/Sidebar/NavEntry.vue'
import router from "@/router";
import {ref} from "vue";
import TextInputWithIcon from "@/components/TextInputWithIcon";

let query = ref('');
let submit = () => {
    router.push({ name: 'Search', params: { query: query.value } });
}
</script>

<style lang="scss" scoped>
    .header {
        background: var(--sidebar-background);
        height: var(--header-height);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px 0 var(--shadow);
        z-index: 2;
    }

    .logo {
        fill: var(--font-colour);
        padding: 10px;
        translate: 5px 5px;
        height: 100%;

        &:hover {
            cursor: pointer;
        }
    }

    .search input {
        width: 500px;
    }
</style>

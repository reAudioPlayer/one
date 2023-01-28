<template>
    <div class="header flex flex-row justify-between drop-shadow-md">
        <Logo class="logo" @click="$router.push('/')" />
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
import {onMounted, ref} from "vue";
import TextInputWithIcon from "@/components/inputs/TextInputWithIcon.vue";

let query = ref('');

onMounted(() => {
    query.value = router.currentRoute.value.params.query || "";

    router.afterEach(to => {
        query.value = to.params.query || "";
        console.log(query.value);
    });
});

let submit = () => {
    router.push({ name: 'Search', params: { query: query.value } });
}
</script>

<style lang="scss" scoped>
    .header {
        background: var(--bg-base-dk);
        height: var(--h-header);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px 0 var(--shadow);
        z-index: 2;
    }

    .logo {
        fill: var(--fg-base);
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

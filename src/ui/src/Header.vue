<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="header grid grid-cols-3 justify-between drop-shadow-md">
        <Logo class="hideIfMobile logo" @click="$router.push('/')" />
        <div class="search flex flex-row">
            <nav-entry class="sm:ml-0 mr-2" href="/" icon="home" minimised name="Home" />
            <InputWithAutoComplete
                v-model="query"
                class="md:!w-96"
                icon="search"
                placeholder="Search..."
                @submit="submit"
                @change="searchInput"
                :clickSuggest="clickSuggestion"
                :suggest="suggest"
            >
                <template #default="{ value, selected }">
                    <div
                        class="suggestion"
                        :class="{ selected }"
                        @click="clickSuggestion(value)"
                    >
                        <Cover :src="value.cover" />
                        <div class="flex flex-col overflow-hidden">
                            <Marquee :text="value.title" />
                            <Marquee class="text-sm text-muted" :text="value.artist" />
                        </div>
                    </div>
                </template>
            </InputWithAutoComplete>
        </div>
        <div class="mr-2 flex flex-row gap-2">
            <nav-entry href="/download" icon="download" minimised name="Preferences" />
            <nav-entry href="/preferences" icon="settings" minimised name="Preferences" />
        </div>
    </div>
</template>

<script setup>
import Cover from "@/components/image/Cover.vue";
import Marquee from "@/components/Marquee.vue";
import Logo from "/src/assets/images/logo/logo.svg";
import NavEntry from "@/components/Sidebar/NavEntry.vue";
import router from "@/router";
import { onMounted, ref } from "vue";
import InputWithAutoComplete from "@/components/inputs/InputWithAutoComplete.vue";

const clickSuggestion = (value) => {
    router.push(value.href);
}

const suggest = async (value) => {
    if (!value.length) return [];

    const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
            query: value,
            scope: [ "local" ]
        })
    });
    const jdata = await res.json();
    return jdata.tracks;
}

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
    .suggestion {
        display: grid;
        grid-template-columns: 48px 1fr;
        gap: 1em;
        padding: .5em;

        .cover {
            border-radius: .5em;
        }
        
        &:hover, &.selected {
            background: var(--bg-hover-dk);
            cursor: pointer;
        }

        span {
            text-overflow: ellipsis;
            /* Needed to make it work */
            overflow: hidden;
            white-space: nowrap;
        }

        span:last-child {
            color: var(--fg-base-dk);
            font-size: .8rem;
        }
    }

    .header {
        background: var(--bg-base-dk);
        height: var(--h-header);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px 0 var(--shadow);
        z-index: 10;
        border-bottom: var(--border-container);
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

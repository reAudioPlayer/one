<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="header grid grid-cols-3 justify-between drop-shadow-md">
        <Logo class="hideIfMobile logo" @click="$router.push('/')" />
        <div class="search flex flex-row">
            <nav-entry
                class="sm:ml-0 mr-2"
                href="/"
                icon="home"
                minimised
                name="Home"
            />
            <InputWithAutoComplete
                v-model="query"
                class="md:!w-96"
                icon="search"
                placeholder="Search..."
                @submit="submit"
                :clickSuggest="clickSuggestion"
                :suggest="suggest"
                ref="search"
            >
                <template #default="{ value, selected }">
                    <div
                        class="suggestion"
                        :class="{ selected }"
                        @click="clickSuggestion(value)"
                    >
                        <SearchResultItem :item="value" />
                    </div>
                </template>
            </InputWithAutoComplete>
        </div>
        <div class="mr-2 flex flex-row gap-2">
            <div class="download" ref="downloadIcon">
                <nav-entry
                    href="/download"
                    icon="download"
                    minimised
                    name="Download"
                />
                <Teleport to="#popup-target">
                    <span
                        class="download-anim absolute top-0 left-0 z-[1000] material-symbols-rounded"
                        :style="downloadAnimationPosition"
                        v-if="showDownloadAnim"
                        >download</span
                    >
                </Teleport>
            </div>
            <nav-entry
                href="/preferences"
                icon="settings"
                minimised
                name="Preferences"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import Cover from "@/components/image/Cover.vue";
import Marquee from "@/components/Marquee.vue";
import Logo from "./assets/images/logo/logo.svg?component";
import NavEntry from "@/components/Sidebar/NavEntry.vue";
import router from "./router";
import { onMounted, ref, computed } from "vue";
import InputWithAutoComplete from "@/components/inputs/InputWithAutoComplete.vue";
import { useDownloaderStore } from "./store/downloader";
import SearchResultItem from "./views/Search/SearchResultItem.vue";
import { TYPES } from "./views/Search/search";
import { useDataStore } from "./store/data";
import { usePlayerStore } from "./store/player";

const downloadIcon = ref(null);
const showDownloadAnim = ref(false);
const data = useDataStore();
const player = usePlayerStore();
const downloadAnimationPosition = computed(() => {
    if (!downloadIcon.value) return {};
    const top = `calc(${downloadIcon.value.offsetTop}px + 10px)`;
    const left = `calc(${downloadIcon.value.offsetLeft}px + 10px)`;
    return {
        top,
        left,
    };
});
const downloaderStore = useDownloaderStore();
downloaderStore.onDownload.push((songId: number) => {
    showDownloadAnim.value = true;
    setTimeout(() => {
        showDownloadAnim.value = false;
    }, 500);
});

const clickSuggestion = (value, shift = false) => {
    if (shift) {
        if (value.type === "song") {
            player.loadPlaylist("track", value.item.id);
            search.value?.blur();
            return;
        }
        if (value.type === "playlist") {
            player.loadPlaylist(value.item.id);
            search.value?.blur();
            return;
        }
    }

    if (value.type === "artist") {
        router.push(`/artist/${value.item.name}`);
        return;
    }

    router.push(value.item.href);
};

const randomSong = () => {
    const songs = data.playlists.flatMap((p) => p.songs);
    const song = songs[Math.floor(Math.random() * songs.length)];
    console.log(song);
    return song;
};

const suggest = async (value) => {
    if (!value.length) return [];

    if (value === "/rand") {
        const song = randomSong();

        if (!song) return [];

        return [
            {
                type: "command",
                confidence: 1,
                scope: "local",
                item: song,
            },
        ];
    }
    if (["/create", "/new"].includes(value)) {
        return [
            {
                type: "command",
                confidence: 0.5,
                scope: "local",
                item: {
                    name: "Create classic playlist",
                    href: "/playlist/create?type=classic",
                },
            },
            {
                type: "command",
                confidence: 0.5,
                scope: "local",
                item: {
                    name: "Create smart playlist",
                    href: "/playlist/create?type=smart",
                },
            },
        ];
    }

    const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
            query: value,
            scope: ["local", ...TYPES],
        }),
    });
    const jdata = await res.json();
    return jdata.items;
};

let query = ref("");
const search = ref(null);

onMounted(() => {
    query.value = router.currentRoute.value.params.query || "";

    router.afterEach((to) => {
        query.value = to.params.query || "";
        console.log(query.value);
    });

    // Ctrl+K
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "k") {
            e.preventDefault();
            search.value?.focus();
        }
    });
});

let submit = () => {
    router.push({ name: "Search", params: { query: query.value } });
};
</script>

<style lang="scss" scoped>
.download-anim {
    @keyframes anim {
        /* bottom to top, fading out */
        0% {
            opacity: 1;
            transform: translateY(500px);
        }
        100% {
            opacity: 0;
            transform: translateY(0%);
        }
    }

    color: var(--fg-base-dk);
    animation: anim 0.5s ease-out forwards;
}

.suggestion {
    display: grid;
    gap: 1em;
    width: 100%;

    .cover {
        border-radius: 0.5em;
    }

    &:hover,
    &.selected {
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
        font-size: 0.8rem;
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
</style>

<style lang="scss">
.header .search {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 1em;

    .input-with-autocomplete {
        max-width: 800px;
        width: 100%;
        flex: 1;
    }

    .text-input-with-icon {
        width: 100%;
    }
}
</style>

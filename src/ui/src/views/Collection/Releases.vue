<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div v-if="loading" class="fill-page">
        <Loader />
    </div>
    <div class="p-4 overflow-hidden h-full">
        <add-album-to-playlist
            v-if="selectedElement"
            :id="
                selectedElement.url?.replace(
                    'https://open.spotify.com/album/',
                    ''
                )
            "
            ref="addReleaseRef"
            :album="{
                id: selectedElement.url?.replace(
                    'https://open.spotify.com/album/',
                    ''
                ),
                title: selectedElement.title,
                artist: selectedElement.artists.join(', '),
                cover: selectedElement.cover,
                href: selectedElement.url,
                releaseDate: selectedElement.releaseDate,
            }"
            :artist="selectedElement.artist"
            :cover="selectedElement.cover"
            :href="selectedElement.url"
            :title="selectedElement.title"
        />
        <CollectionHeader />
        <div class="releases w-full">
            <div class="current">
                <div class="w-max flex flex-col gap-4" v-if="nextInQueue">
                    <Cover
                        class="rounded-3xl"
                        v-if="nextInQueue"
                        :src="nextInQueue.cover"
                    />
                    <div class="flex justify-between w-full items-center">
                        <div class="flex gap-4 items-center">
                            <span
                                class="preview material-symbols-rounded text-3xl cursor-pointer"
                                @click="previewRelease(nextInQueue)"
                            >
                                play_circle
                            </span>
                            <div class="info">
                                <h3 v-if="nextInQueue">
                                    {{ nextInQueue.title }}
                                </h3>
                                <p v-if="nextInQueue" class="m-0">
                                    {{ nextInQueue.artist }}
                                </p>
                                <p v-if="nextInQueue" class="m-0 text-muted">
                                    {{ nextInQueue.releaseDate }}
                                </p>
                            </div>
                        </div>
                        <div class="actions">
                            <span
                                class="material-symbols-rounded cursor-pointer text-muted hover:text-primary"
                                @click="importRelease(nextInQueue)"
                            >
                                add
                            </span>
                            <span
                                class="material-symbols-rounded cursor-pointer text-muted hover:text-primary"
                                @click="
                                    remember.find(
                                        (x) => x.url === nextInQueue.url
                                    )
                                        ? forgetRelease(nextInQueue)
                                        : rememberRelease(nextInQueue)
                                "
                            >
                                {{
                                    remember.find(
                                        (x) => x.url === nextInQueue.url
                                    )
                                        ? "playlist_remove"
                                        : "push_pin"
                                }}
                            </span>
                            <span
                                class="material-symbols-rounded cursor-pointer text-muted hover:text-primary"
                                @click="seeRelease(nextInQueue)"
                            >
                                done_all
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else class="h-96 flex flex-col justify-center">
                    <span class="italic text-sm text-muted">
                        Nothing to preview
                    </span>
                </div>
            </div>
            <Card class="queue w-full p-2 h-full flex flex-col gap-2 relative">
                <div class="flex items-center gap-4 w-max">
                    <h5
                        class="cursor-pointer"
                        :class="{ selected: activeQueue == 'unseen' }"
                        @click="activeQueue = 'unseen'"
                    >
                        Unseen
                    </h5>
                    <h5
                        class="cursor-pointer"
                        :class="{ selected: activeQueue == 'out-today' }"
                        @click="activeQueue = 'out-today'"
                    >
                        Out Today
                    </h5>
                    <h5
                        class="cursor-pointer"
                        :class="{ selected: activeQueue == 'watching' }"
                        @click="activeQueue = 'watching'"
                    >
                        Watching
                    </h5>
                    <h5
                        class="cursor-pointer"
                        :class="{ selected: activeQueue == 'seen' }"
                        @click="activeQueue = 'seen'"
                    >
                        Seen
                    </h5>
                    <h5
                        class="cursor-pointer"
                        :class="{ selected: activeQueue == 'all' }"
                        @click="activeQueue = 'all'"
                    >
                        All
                    </h5>
                </div>
                <div
                    class="flex justify-end mb-2"
                    v-if="activeQueue === 'unseen' && queue.length"
                >
                    <span
                        class="cursor-pointer text-sm text-muted hover:text-primary flex items-center gap-2"
                        @click="queue.forEach(seeRelease)"
                    >
                        Mark all as seen
                        <span class="material-symbols-rounded"> done_all </span>
                    </span>
                </div>
                <div class="entries overflow-y-auto flex flex-col gap-2">
                    <div
                        class="entry"
                        v-for="entry in queue"
                        v-if="queue.length"
                    >
                        <Cover class="rounded-xl" :src="entry.cover" />
                        <div class="info overflow-hidden">
                            <p class="m-0 overflow-hidden">
                                <Marquee :text="entry.title" />
                            </p>
                            <p class="m-0 overflow-hidden text-sm text-muted">
                                <ArtistMarquee :artist="entry.artist" />
                            </p>
                        </div>
                        <p class="text-sm m-0 text-muted">
                            {{ entry.releaseDate }}
                        </p>
                        <span
                            class="material-symbols-rounded cursor-pointer text-muted hover:text-primary"
                            @click="seeRelease(entry)"
                        >
                            done_all
                        </span>
                        <span
                            class="material-symbols-rounded cursor-pointer text-muted hover:text-primary"
                            @click="
                                remember.find((x) => x.url === entry.url)
                                    ? forgetRelease(entry)
                                    : rememberRelease(entry)
                            "
                        >
                            {{
                                remember.find((x) => x.url === entry.url)
                                    ? "playlist_remove"
                                    : "push_pin"
                            }}
                        </span>
                        <span
                            class="material-symbols-rounded cursor-pointer text-muted hover:text-primary"
                            @click="importRelease(entry)"
                        >
                            add
                        </span>
                    </div>
                </div>
                <div v-if="!queue.length" class="flex flex-col items-center">
                    <span class="italic text-sm text-muted">
                        No releases in this queue
                    </span>
                </div>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import AddAlbumToPlaylist from "../../components/popups/ImportSpotifyAlbum.vue";
import CollectionHeader from "@/components/CollectionHeader.vue";
import Loader from "../../components/Loader.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import Card from "../../containers/Card.vue";
import Cover from "../../components/image/Cover.vue";
import { playInPicture } from "../../api/playerInPicture";
import { useRouter } from "vue-router";
import ArtistMarquee from "../../components/ArtistMarquee.vue";
import Marquee from "../../components/Marquee.vue";

const loading = ref(true);
const activeQueue = ref<"unseen" | "out-today" | "watching" | "seen" | "all">(
    "unseen"
);

const router = useRouter();

watch(activeQueue, (x) => {
    const query = { queue: x };
    router.replace({ query });
});

const queue = computed(() => {
    switch (activeQueue.value) {
        case "unseen":
            return releases.value.filter((x) => !seen.value.includes(x.url));
        case "out-today":
            return outToday.value;
        case "watching":
            return remember.value;
        case "all":
            return releases.value;
        case "seen":
            return seen.value.map((x) =>
                releases.value.find((y) => y.url == x)
            );
    }
});

const nextInQueue = computed(() => {
    return queue.value[0];
});

const previewRelease = (release: IRelease) => {
    playInPicture(release.artist, release.title, release.url);
};

interface IRelease {
    url: string;
    title: string;
    artists: string[];
    artist: string;
    cover: string;
    releaseDate: string;
}

const selectedElement = ref<IRelease | null>(null);
const addReleaseRef = ref<typeof AddAlbumToPlaylist | null>(null);

const today = new Date();
const releases = ref<IRelease[]>([]);

const importRelease = (release: IRelease) => {
    selectedElement.value = release;
    nextTick(() => {
        addReleaseRef.value?.show();
    });
};

const outToday = computed(() => {
    return releases.value.filter((x) => {
        const releaseDate = new Date(x.releaseDate);
        return (
            today.getMonth() == releaseDate.getMonth() &&
            today.getDate() == releaseDate.getDate() &&
            today.getFullYear() == releaseDate.getFullYear()
        );
    });
});

const rememberRelease = (release: IRelease) => {
    if (!remember.value.find((x) => x.url == release.url)) {
        remember.value.push(release);
    }
};

const forgetRelease = (release: IRelease) => {
    remember.value = remember.value.filter((x) => x.url != release.url);
};

const seeRelease = (release: IRelease) => {
    let autoPlayNextPreview = false;
    if (release.url === nextInQueue.value?.url) {
        autoPlayNextPreview = true;
    }

    if (!seen.value.includes(release.url)) {
        seen.value.push(release.url);
    }

    if (autoPlayNextPreview) {
        previewRelease(nextInQueue.value!);
    }
};

const seen = ref<string[]>([]);
const remember = ref<IRelease[]>([]);
const SEEN_KEY = "reap.releases.seen";
const REMEMBER_KEY = "reap.releases.remember";

onMounted(async () => {
    loading.value = true;
    const res = await fetch("/api/releases");
    releases.value = await res.json();
    loading.value = false;

    seen.value = localStorage.getItem(SEEN_KEY)?.split(",") ?? [];
    remember.value = JSON.parse(localStorage.getItem(REMEMBER_KEY) ?? "[]");
});
watch(
    seen,
    (seen) => {
        localStorage.setItem(SEEN_KEY, seen.join(","));
    },
    { deep: true }
);
watch(
    remember,
    (remember) => {
        localStorage.setItem(REMEMBER_KEY, JSON.stringify(remember));
    },
    { deep: true }
);
</script>

<style scoped>
.releases {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    gap: 1em;
    overflow-y: hidden;
    height: calc(100% - 40px);
}

.entry {
    display: grid;
    grid-template-columns: 50px 1fr 10ch 20px 20px 20px;
    gap: 0.5em;
}

h5.selected {
    background: var(--bg-hover);
    padding: 0.25em 0.5em;
    border-radius: 0.5em;
    color: var(--fg-base);
}

.current {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
}

.queue {
    height: calc(100% - 220px);
    overflow: hidden;
    margin: 100px 0;
}

.queue > .entries {
    padding: 0.5em;
}

.current .cover {
    max-width: min(50vh, 500px);
}
</style>

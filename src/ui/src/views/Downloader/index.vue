<script setup lang="ts">
import { ref } from "vue";
import Card from "../../containers/Card.vue";
import IconButton from "../../components/inputs/IconButton.vue";
import { Notifications } from "../../components/notifications/createNotification";
import { type ISong, bytesToDisplay } from "../../common";
import Cover from "../../components/image/Cover.vue";
import Loader from "../../components/Loader.vue";
import { fetchMetadata } from "../../api/song";
import Form from "../../components/popups/components/Form.vue";
import { useDownloaderStore } from "../../store/downloader";

const downloader = useDownloaderStore();

const reDownload = (songId: number) => {
    Notifications.addYesNo(
        "Are you sure you want to redownload this song?",
        null,
        null,
        () => {
            console.log("[downloader] reDownload", songId);
            downloader.downloadFromDb(songId);
        }
    );
};

const song: ISong = {
    title: "",
    artist: "",
    album: "",
    cover: "",
    source: "",
    href: "",
};
const form = ref(null);
const formOptions = ref([
    {
        name: "source",
        type: "text",
        accept: "audio/mp3",
        required: true,
        onChange: async (src: string) => {
            const metadata = await fetchMetadata(src);
            formOptions.value.find((x) => x.name === "title").value =
                metadata.title;
            formOptions.value.find((x) => x.name === "artist").value =
                metadata.artist;
            formOptions.value.find((x) => x.name === "album").value =
                metadata.album;
            formOptions.value.find((x) => x.name === "cover").value =
                metadata.cover;
            formOptions.value.find((x) => x.name === "source").value =
                metadata.source;
        },
        value: song.source,
    },
    {
        name: "title",
        type: "text",
        icon: "title",
        required: true,
        value: song.title,
    },
    {
        name: "artist",
        type: "text",
        icon: "person",
        required: true,
        value: song.artist,
    },
    {
        name: "album",
        type: "text",
        icon: "album",
        value: song.album,
    },
    {
        name: "cover",
        type: "upload",
        accept: "image/*",
        imagePreview: true,
        value: song.cover,
    },
]);

const requestDownload = async () => {
    const song = form.value.toObject();
    song.id = new Date().getTime();
    console.log("[downloader] requestDownload", song);
    downloader.downloadOther(song);
};
</script>
<template>
    <div class="downloader py-2 pr-2 grid gap-4 grid-cols-2 items-start">
        <div class="downloads">
            <template v-for="state in downloader.states" :key="state.songId">
                <Card
                    v-if="!state.internal"
                    :class="[
                        'song',
                        {
                            downloading:
                                downloader.states[state.songId]?.status ==
                                'downloading',
                        },
                    ]"
                    class="p-4 card items-center"
                >
                    <template v-if="state.status !== 'pending'">
                        <main class="main">
                            <h2 class="m-0 mb-4">
                                <template v-if="state.song">
                                    {{ state.song.title }}
                                </template>
                                <template v-else>
                                    {{ state.filename }}
                                </template>
                            </h2>
                            <div class="status">
                                <template v-if="state.song">
                                    <Card class="info p-4">
                                        <Cover
                                            :src="state.song.cover"
                                            class="cover"
                                        />

                                        <div class="flex flex-col">
                                            <span>
                                                {{ state.song.album }}
                                            </span>
                                            <span>
                                                {{ state.song.artist }}
                                            </span>
                                        </div>
                                    </Card>
                                </template>
                                <template v-if="state.status !== 'error'">
                                    <div
                                        class="info"
                                        v-if="state.downloaded || state.total"
                                    >
                                        <span class="material-symbols-rounded"
                                            >cloud</span
                                        >
                                        {{ bytesToDisplay(state.downloaded) }} /
                                        {{ bytesToDisplay(state.total) }}
                                    </div>
                                    <div class="info" v-if="state.chunk">
                                        <!-- chunk -->
                                        <span class="material-symbols-rounded"
                                            >file_download</span
                                        >
                                        {{ state.chunk }}
                                    </div>
                                    <div class="info">
                                        <span class="material-symbols-rounded"
                                            >percent</span
                                        >
                                        {{
                                            state.status === "downloading"
                                                ? state.percent
                                                : 100
                                        }}%
                                    </div>
                                    <div
                                        class="info"
                                        v-if="state.speed !== '0'"
                                    >
                                        <span class="material-symbols-rounded"
                                            >speed</span
                                        >
                                        {{ state.speed }}
                                    </div>
                                    <div
                                        class="info"
                                        v-if="
                                            state.elapsed !== '0' ||
                                            state.eta !== 0
                                        "
                                    >
                                        <span class="material-symbols-rounded"
                                            >timer</span
                                        >
                                        {{ state.elapsed }} / {{ state.eta }}s
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="error">
                                        <span
                                            >This song could not be
                                            downloaded:</span
                                        >
                                        <ul class="block list-disc ml-8">
                                            <li>
                                                verify that the source link is
                                                working
                                            </li>
                                            <li>try again later</li>
                                        </ul>
                                    </div>
                                    <div class="info" v-if="state.song">
                                        <!-- link -->
                                        <span class="material-symbols-rounded"
                                            >link</span
                                        >
                                        <a
                                            :href="state.song.source"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {{ state.song.source }}
                                        </a>
                                    </div>
                                </template>
                            </div>
                        </main>
                        <aside>
                            <div class="wrap-progress">
                                <div
                                    v-if="state.status == 'downloading'"
                                    class="progress-bar"
                                    role="progressbar"
                                    :aria-valuenow="state.percent"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    :style="{
                                        '--progress': state.percent + '%',
                                    }"
                                />
                                <span
                                    class="material-symbols-rounded downloading"
                                    v-if="state.status == 'downloading'"
                                >
                                    south
                                </span>
                                <span
                                    class="material-symbols-rounded cursor-pointer finished"
                                    v-else-if="state.status == 'finished'"
                                    @click="downloader.download(state.songId)"
                                >
                                    download_for_offline
                                </span>
                                <span
                                    class="material-symbols-rounded cursor-pointer downloaded"
                                    v-else-if="state.status == 'downloaded'"
                                    @click="reDownload(state.songId)"
                                >
                                    download_done
                                </span>
                                <span
                                    class="material-symbols-rounded cursor-pointer error"
                                    v-else-if="state.status == 'error'"
                                    @click="reDownload(state.songId)"
                                >
                                    error
                                </span>
                            </div>
                        </aside>
                    </template>
                    <div
                        v-else
                        class="col-span-2 flex flex-row justify-center items-center"
                    >
                        <Loader />
                    </div>
                </Card>
            </template>
        </div>
        <div class="new-download">
            <Card class="custom p-4 flex flex-col">
                <Form ref="form" :options="formOptions" />
                <IconButton
                    icon="download_for_offline"
                    label="Download"
                    class="w-full mt-8"
                    @click="requestDownload"
                />
            </Card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.downloads {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;

    .card {
        display: grid;
        grid-template-columns: 1fr max-content;
        gap: 5em;
    }

    > * {
        flex: 1;
        min-width: max-content;
    }
}

.status {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    color: var(--fg-base-dk);

    .error span {
        color: var(--fail);
    }

    .info {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        align-items: center;

        .material-symbols-rounded {
            font-size: 1.5rem;
            font-variation-settings: "wght" 400;
        }

        .cover {
            width: 48px;
            aspect-ratio: 1/1;
            border-radius: 0.5em;
        }

        &:has(.cover) {
            font-size: 0.8rem;

            > div > span:first-child {
                color: var(--fg-base);
            }
        }
    }
}

aside {
    position: relative;
    width: 70px;
    height: 70px;

    .progress-bar {
        border-radius: 50%;
        position: absolute;
        inset: 0;

        --progress: 25%;

        background: radial-gradient(
                closest-side,
                var(--bg-base-lt) 90%,
                transparent 90% 100%
            ),
            conic-gradient(var(--fg-secondary) var(--progress), transparent 0);

        @keyframes rotate {
            to {
                rotate: 360deg;
            }
        }

        animation: rotate 1s linear infinite;
    }

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        font-variation-settings: "wght" 400;

        &.finished {
            font-size: 3rem;
        }
    }
}
</style>

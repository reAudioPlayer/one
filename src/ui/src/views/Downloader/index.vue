<script setup lang="ts">
import { ref } from 'vue';
import Card from '../../containers/Card.vue';
import TextInputWithIcon from '../../components/inputs/TextInputWithIcon.vue';
import IconButton from '../../components/inputs/IconButton.vue';
import { Notifications } from '../../components/notifications/createNotification';
import { ISong } from '../../common';
import Cover from '../../components/image/Cover.vue';
import { downloadSong, getSongMetadata } from "../../api/song";

interface IStatus {
    songId: number;
    filename: string;
    status: "downloading" | "finished" | "downloaded" | "error";
    downloaded: number;
    total: number;
    percent: number;
    speed: string;
    elapsed: string;
    eta: number;
    action?: string;
    song?: ISong;
    chunk?: string;
};

const states = ref({ } as Record<number, IStatus>);

const bytesToDisplay = (bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    while (bytes > 1000 && i < sizes.length)
    {
        bytes /= 1000;
        i++;
    }

    return `${bytes.toFixed(0)} ${sizes[i]}`;
};

let ws = null as WebSocket | null;

const connect = () => {
    console.log("[downloader] attempting reconnect")
    const host = window.location.hostname;
    const port = window.location.port === "5173" ? 1234 : window.location.port
    ws = new WebSocket(`ws://${host}:${port}/download/ws`);

    ws.onclose = () => {
        console.log("[downloader] ws closed")

        setTimeout(() => connect(), 1000);
    }

    ws.onopen = () => {
        console.log("[downloader] ws connected")
    }

    ws.onmessage = msg => {
        const data = JSON.parse(msg.data) as IStatus;
        console.log("[downloader] received", data.songId, data);

        if (data.action) {
            return;
        };

        if (data.status == "finished")
        {
            states.value[data.songId] = {
                ...states.value[data.songId],
                ...data
            }
            return;
        }

        states.value[data.songId] = data;
    }
};

connect();

const download = (songId: number) => {
    console.log("[downloader] download");
    downloadSong(songId);
    states.value[songId].status = "downloaded";
};

const songToDownload = ref("");
const requestDownload = (songId: number | string) => {
    console.log("[downloader] requestDownload", songToDownload.value);

    if (!ws) {
        Notifications.addError("Failed to connect to server", "Please try again later", 3000);
        return;
    }

    ws.send(JSON.stringify({
        action: "download",
        source: "db",
        songId: Number(songId)
    }))
};

const reDownload = (songId: number) => {
    Notifications.addYesNo("Are you sure you want to redownload this song?", null, null, () => {
        console.log("[downloader] reDownload", songId);
        requestDownload(songId);
    });
};
</script>
<template>
    <div class="downloader py-2 pr-2 grid gap-2 grid-cols-2">
        <div class="downloads">
            <Card
                v-for="state in states"
                :key="state.songId"
                :class="['song', { 'downloading': states[state.songId]?.status == 'downloading' }]"
                class="p-4 card items-center"
            >
                <main class="main">
                    <h2 class="m-0 mb-4">
                        <template v-if="state.song">
                            {{state.song.title}}
                        </template>
                        <template v-else>
                            {{state.filename}}
                        </template>
                    </h2>
                    <div class="status">
                        <template v-if="state.song">
                            <Card class="info p-4">
                                <Cover :src="state.song.cover" class="cover" />

                                <div class="flex flex-col">
                                    <span>
                                        {{ state.song.album }}
                                    </span>
                                    <span>
                                        {{state.song.artist}}
                                    </span>
                                </div>
                            </Card>
                        </template>
                        <template v-if="state.status !== 'error'">
                            <div class="info" v-if="state.downloaded || state.total">
                                <span class="material-symbols-rounded">cloud</span>
                                {{bytesToDisplay(state.downloaded)}} / {{bytesToDisplay(state.total)}}
                            </div>
                            <div class="info" v-if="state.chunk">
                                <!-- chunk -->
                                <span class="material-symbols-rounded">file_download</span>
                                {{state.chunk}}
                            </div>
                            <div class="info">
                                <span class="material-symbols-rounded">percent</span>
                                {{ state.status == "finished" ? 100 : state.percent }}%
                            </div>
                            <div class="info" v-if="state.speed !== '0'">
                                <span class="material-symbols-rounded">speed</span>
                                {{state.speed}}
                            </div>
                            <div class="info" v-if="state.elapsed !== '0' || state.eta !== 0">
                                <span class="material-symbols-rounded">timer</span>
                                {{state.elapsed}} / {{state.eta}}s
                            </div>
                        </template>
                        <template v-else>
                            <div class="error">
                                <span>This song could not be downloaded:</span>
                                <ul class="block list-disc ml-8">
                                    <li>
                                        verify that the source link is working
                                    </li>
                                    <li>
                                        try again later
                                    </li>
                                </ul>
                            </div>
                            <div class="info" v-if="state.song">
                                <!-- link -->
                                <span class="material-symbols-rounded">link</span>
                                <a :href="state.song.source" target="_blank" rel="noopener noreferrer">
                                    {{state.song.source}}
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
                            :aria-valuenow="state.percent" aria-valuemin="0" aria-valuemax="100"
                            :style="{ '--progress': state.percent + '%' }"
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
                            @click="download(state.songId)"
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
            </Card>
        </div>
        <div class="new-download">
            <TextInputWithIcon
                icon="search"
                placeholder="Search for a song"
                class="w-full"
                type="number"
                v-model="songToDownload"
            />
            <IconButton
                icon="download_for_offline"
                label="Download"
                class="w-full"
                @click="requestDownload(songToDownload)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 5em;
}

.downloads {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;

    > * {
        flex: 1;
        min-width: max-content;
    }
}

.status {
    display: flex;
    flex-direction: column;
    gap: .5em;
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
            font-variation-settings: 'wght' 400;
        }

        .cover {
            width: 48px;
            aspect-ratio: 1/1;
            border-radius: .5em;
        }

        &:has(.cover) {
            font-size: .8rem;

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

        background: 
            radial-gradient(closest-side, var(--bg-base-lt) 90%, transparent 90% 100%),
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
        font-variation-settings: 'wght' 400;

        &.finished {
            font-size: 3rem;
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '../../containers/Card.vue';

interface IStatus {
    songId: number;
    filename: string;
    status: "downloading" | "finished";
    downloaded: number;
    total: number;
    percent: number;
    speed: string;
    elapsed: string;
    eta: string;
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

const connect = () => {
    console.log("[downloader] attempting reconnect")
    const host = window.location.hostname;
    const port = window.location.port === "5173" ? 1234 : window.location.port
    const ws = new WebSocket(`ws://${host}:${port}/download/ws`);

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

const download = () => {
    console.log("[downloader] download");
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
                    <h2 class="m-0 mb-4">{{state.filename}}</h2>
                    <div class="status">
                        <div class="info">
                            <span class="material-symbols-rounded">cloud</span>
                            {{bytesToDisplay(state.downloaded)}} / {{bytesToDisplay(state.total)}}
                        </div>
                        <div class="info">
                            <span class="material-symbols-rounded">percent</span>
                            {{state.percent}}%
                        </div>
                        <div class="info">
                            <span class="material-symbols-rounded">speed</span>
                            {{state.speed}}
                        </div>
                        <div class="info">
                            <span class="material-symbols-rounded">timer</span>
                            {{state.elapsed}} / {{state.eta}}s
                        </div>
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
                            class="material-symbols-rounded"
                            :class="{ 'cursor-pointer': state.status === 'finished', [state.status]: true }"
                            @click="state.status == 'downloading' ? null : download"
                        >
                            {{state.status == 'downloading' ? 'south' : 'download_for_offline'}}
                        </span>
                    </div>
                </aside>
            </Card>
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
    gap: 1em;
}

.status {
    display: flex;
    flex-direction: column;
    gap: .5em;
    color: var(--fg-base-dk);

    .info {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        align-items: center;

        .material-symbols-rounded {
            font-size: 1.5rem;
            font-variation-settings: 'wght' 400;
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

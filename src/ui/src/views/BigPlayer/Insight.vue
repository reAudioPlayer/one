<script setup lang="ts">
import { onMounted, ref } from "vue";
import Card from "../../containers/Card.vue";
import { useInsightStore } from "../../store/insight";
import { usePlayerStore } from "../../store/player";
import {
    Chart as ChartJS,
    LineController,
    BarController,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    PointElement,
    LineElement,
    ScatterController,
} from "chart.js";
import AmbientBackground from "../../components/image/AmbientBackground.vue";

ChartJS.register(
    LineController,
    BarController,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    ScatterController
);

const chart = ref<HTMLCanvasElement>();
const stereoFieldChart = ref<HTMLCanvasElement>();
const tonalBalanceChart = ref<HTMLCanvasElement>();

const player = usePlayerStore();
const insights = useInsightStore();
const shortTermData = ref<number[]>([]);
const integratedData = ref<number[]>([]);

// array of 60 empty values
const emptyData = Array.from({ length: 60 }, () => -Infinity);

const resizeCanvas = (canvas: HTMLCanvasElement) => {
    canvas.width = canvas.parentElement?.clientWidth as number;
    canvas.height = canvas.parentElement?.clientHeight as number;

    window.addEventListener("resize", () => {
        canvas.width = canvas.parentElement?.clientWidth as number;
        canvas.height = canvas.parentElement?.clientHeight as number;
    });
};

onMounted(() => {
    resizeCanvas(stereoFieldChart.value);
    resizeCanvas(chart.value);
    resizeCanvas(tonalBalanceChart.value);

    shortTermData.value = emptyData;
    integratedData.value = emptyData;
    const chartjs = new ChartJS(chart.value, {
        data: {
            labels: Array.from({ length: 60 }, (_, i) => i),
            datasets: chartData() as any,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: -30,
                    max: 0,
                    ticks: {
                        font: {
                            family: "Poppins",
                            size: 10,
                        },
                    },
                    title: {
                        display: true,
                        text: "Loudness (LUFS)",
                        font: {
                            family: "Poppins",
                        },
                    },
                },
                x: {
                    ticks: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Time (s)",
                        font: {
                            family: "Poppins",
                        },
                    },
                },
            },
            animation: {
                duration: 0,
            },
        },
    });

    const field = new ChartJS(stereoFieldChart.value, {
        type: "scatter",
        data: {
            datasets: [
                {
                    data: [],
                    backgroundColor: "#00c48b",
                    borderColor: "#00c48b",
                    pointRadius: 0.5,
                },
                {
                    data: [],
                    backgroundColor: "#00c48b99",
                    borderColor: "#00c48bcc",
                    pointRadius: 0.3,
                },
                {
                    data: [],
                    backgroundColor: "#00c48b33",
                    borderColor: "#00c48b99",
                    pointRadius: 0.1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: {
                    min: -1.5,
                    max: 1.5,
                    ticks: {
                        callback: (value) => value,
                        font: {
                            family: "Poppins",
                        },
                    },
                    title: {
                        display: true,
                        text: "Left",
                        font: {
                            family: "Poppins",
                        },
                    },
                },
                x: {
                    min: -1.5,
                    max: 1.5,
                    ticks: {
                        callback: (value) => value,
                        font: {
                            family: "Poppins",
                        },
                    },
                    title: {
                        display: true,
                        text: "Right",
                        font: {
                            family: "Poppins",
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    const tonalBalance = new ChartJS(tonalBalanceChart.value, {
        data: {
            datasets: [
                {
                    type: "line",
                    tension: 1,
                    cubicInterpolationMode: "monotone",
                    data: [
                        { x: 0, y: 0 },
                        { x: 255, y: 50 },
                    ],
                    borderColor: "#00c48b",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 255,
                    ticks: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Gain",
                        font: {
                            family: "Poppins",
                        },
                    },
                },
                x: {
                    min: 0,
                    max: 18000,
                    type: "logarithmic",
                    ticks: {
                        callback: (value: any) => {
                            if (value >= 1000) {
                                return value / 1000 + "k";
                            }
                            return value;
                        },
                        font: {
                            family: "Poppins",
                        },
                    },
                    title: {
                        display: true,

                        text: "Frequency (Hz)",
                        font: {
                            family: "Poppins",
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    let i = 0;

    setInterval(() => {
        if (!player.playing) return;

        field.data.datasets[2].data = field.data.datasets[1].data;
        field.data.datasets[1].data = field.data.datasets[0].data;
        field.data.datasets[0].data = insights.stereo.field;
        field.update();

        if (i++ % 10 !== 0) return;

        const points: { x: number; y: number }[] =
            insights.tonalBalance.data.reduce((acc, curr, i) => {
                acc.push({ x: i * 188, y: curr });
                return acc;
            }, [] as { x: number; y: number }[]);
        tonalBalance.data.datasets[0].data = points;
        tonalBalance.update();

        chartjs.data.datasets[0].data.shift();
        chartjs.data.datasets[0].data.push(insights.loudness.shortterm);

        chartjs.data.datasets[1].data.shift();
        chartjs.data.datasets[1].data.push(insights.loudness.integrated);

        chartjs.data.datasets[2].data.shift();
        chartjs.data.datasets[2].data.push([
            -60,
            insights.loudness.momentary,
        ] as any);

        chartjs.update();
    }, 100);
});

const chartData = () => [
    {
        label: "short term",
        type: "line",
        data: emptyData.map((v) => v),
        borderColor: "#c7aa19",
    },
    {
        label: "integrated",
        type: "line",
        data: emptyData.map((v) => v),
        borderColor: "#189de4",
    },
    {
        label: "momentary",
        type: "bar",
        data: emptyData.map((v) => [v, -Infinity]),
        backgroundColor: "#e8545426",
    },
];

const formatLoudness = (loudness: number) => {
    return Math.round(loudness * 100) / 100 + " LUFS";
};
</script>
<template>
    <AmbientBackground :src="player.song.cover" direction="to top right" />
    <div class="insights">
        <h1>
            <span class="material-symbols-rounded">insights</span>
            <span>Insights</span>
        </h1>
        <div class="left">
            <Card class="relative loudness-chart p-2">
                <canvas ref="chart"></canvas>
            </Card>
            <Card class="relative tonal-balance-chart p-2">
                <canvas ref="tonalBalanceChart"></canvas>
            </Card>
        </div>
        <div class="right">
            <Card class="mode">
                <span class="label uppercase"> short term </span>
                <span>
                    {{ formatLoudness(insights.loudness.shortterm) }}
                </span>
            </Card>
            <Card class="mode">
                <span class="label uppercase"> integrated </span>
                <span>
                    {{ formatLoudness(insights.loudness.integrated) }}
                </span>
            </Card>
            <Card class="mode">
                <span class="label uppercase"> max momentary </span>
                <span>
                    {{ formatLoudness(insights.loudness.maxMomentary) }}
                </span>
            </Card>
            <Card class="meters">
                <div class="meter">
                    <span class="label uppercase"> L </span>
                    <meter
                        optimum="0.25"
                        low="0.5"
                        high="0.75"
                        min="0"
                        max="1"
                        :value="insights.stereo.left"
                    />
                </div>
                <div class="meter">
                    <span class="label uppercase"> R </span>
                    <meter
                        optimum="0.25"
                        low="0.5"
                        high="0.75"
                        min="0"
                        max="1"
                        :value="insights.stereo.right"
                    />
                </div>
                <h4>Correlation</h4>
                <div class="meter">
                    <span class="label uppercase"> L/R </span>
                    <meter
                        optimum="1"
                        low="-0.5"
                        high="0"
                        min="-1"
                        max="1"
                        :value="insights.stereo.correlation"
                    />
                </div>
                <h4>Stereo Field</h4>
                <div class="container stereo-field">
                    <canvas ref="stereoFieldChart"></canvas>
                </div>
            </Card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.meters {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    padding: 0.5em;
    grid-column: 1 / -1;

    .stereo-field {
        max-width: 400px;
        align-self: center;
        aspect-ratio: 1;

        canvas {
            width: 100%;
            height: 100%;
        }
    }

    h4 {
        margin-bottom: 0;
    }

    .meter {
        display: grid;
        grid-template-columns: 1ch 1fr;
        align-items: center;
        gap: 1em;

        .label {
            font-size: 0.8em;
            color: var(--fg-base-dk);
        }

        meter {
            width: 100%;
        }
    }
}

.insights {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1em;
    padding: 1em;

    > h1 {
        grid-column: 1 / -1;

        span {
            margin-right: 0.5em;
        }
    }
}

.left {
    display: grid;
    grid-template-rows: 1fr max-content;
    gap: 1em;

    .loudness-chart {
        width: 100%;
        height: calc(
            2 * (100vh - var(--h-header) - var(--h-player) - 2.25rem - 5em) / 3
        );
    }

    .tonal-balance-chart {
        width: 100%;
        height: calc(
            1 * (100vh - var(--h-header) - var(--h-player) - 2.25rem - 5em) / 3
        );
    }
}

.right {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
    align-content: start;

    .mode {
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .label {
            font-size: 0.8em;
            color: var(--fg-base-dk);
        }
    }
}

meter {
    --background: var(--bg-base);
    --optimum: var(--success);
    --sub-optimum: var(--warning);
    --sub-sub-optimum: var(--fail);

    display: block;
    width: 100%;
}

/* The gray background in Chrome, etc. */
meter::-webkit-meter-bar {
    background: var(--background);
    border: 2px solid var(--border-base);
}

/* The green (optimum) bar in Firefox */
meter:-moz-meter-optimum::-moz-meter-bar {
    background: var(--optimum);
}

/* The green (optimum) bar in Chrome etc. */
meter::-webkit-meter-optimum-value {
    background: var(--optimum);
}

/* The yellow (sub-optimum) bar in Firefox */
meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: var(--sub-optimum);
}

/* The yellow (sub-optimum) bar in Chrome etc. */
meter::-webkit-meter-suboptimum-value {
    background: var(--sub-optimum);
}

/* The red (even less good) bar in Firefox */
meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: var(--sub-sub-optimum);
}

/* The red (even less good) bar in Chrome etc. */
meter::-webkit-meter-even-less-good-value {
    background: var(--sub-sub-optimum);
}
</style>

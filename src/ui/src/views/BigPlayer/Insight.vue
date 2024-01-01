<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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
    PointElement,
    LineElement,
} from "chart.js";

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
    LinearScale
);

const chart = ref<HTMLCanvasElement>();

const player = usePlayerStore();
const insights = useInsightStore();
const shortTermData = ref<number[]>([]);
const integratedData = ref<number[]>([]);

// array of 60 empty values
const emptyData = Array.from({ length: 60 }, () => -Infinity);

onMounted(() => {
    shortTermData.value = emptyData;
    integratedData.value = emptyData;
    const chartjs = new ChartJS(chart.value, {
        data: {
            labels: Array.from({ length: 60 }, (_, i) => i),
            datasets: chartData(),
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: -60,
                    max: 0,
                    ticks: {
                        callback: (value) => value + " LUFS",
                        min: -60,
                    },
                },
                x: {
                    display: false,
                },
            },
        },
    });

    setInterval(() => {
        if (!player.playing) return;

        chartjs.data.datasets[0].data.shift();
        chartjs.data.datasets[0].data.push(insights.loudness.shortterm);

        chartjs.data.datasets[1].data.shift();
        chartjs.data.datasets[1].data.push(insights.loudness.integrated);

        chartjs.data.datasets[2].data.shift();
        chartjs.data.datasets[2].data.push([-60, insights.loudness.momentary]);

        chartjs.update();
    }, 1000);
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
    <div class="insights">
        <h1>
            <span class="material-symbols-rounded">insights</span>
            <span>Insights</span>
        </h1>
        <div class="container">
            <canvas ref="chart"></canvas>
        </div>
        <div class="loudness">
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
                    {{ formatLoudness(insights.loudness.momentary) }}
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
    width: 100%;
    height: 100%;
    padding: 0.5em;
    grid-column: 1 / -1;

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
    align-items: start;

    > h1 {
        grid-column: 1 / -1;

        span {
            margin-right: 0.5em;
        }
    }
}

.loudness {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;

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
</style>

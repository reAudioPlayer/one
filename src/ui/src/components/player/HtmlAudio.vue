<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { Playable, usePlayerStore } from "../../store/player";
import { onMounted, ref, watch } from "vue";
import { LoudnessMeter } from "@domchristie/needles";

const player = usePlayerStore();
const audio = ref<HTMLAudioElement>(null);
let forcePlay = false;

onMounted(() => {
    audio.value.src = null;
    audio.value.src = player.stream;

    audio.value.load();

    audio.value.onloadedmetadata = () => {
        if (!audio.value) return;
        player.setDuration(audio.value.duration);

        if (forcePlay || player.playing) {
            play();
            forcePlay = false;
        }
    };
});

watch(
    () => player.song.id,
    () => {
        if (!audio.value.paused) {
            forcePlay = true;
        }

        audio.value.src = null;
        audio.value.src = player.stream;
        audio.value.load();
        meter?.reset();
        player.setPlaying(!audio.value.paused);
    }
);

const onSongEnded = () => {
    forcePlay = true;
    player.onSongEnded();
};

const play = () => {
    try {
        audio.value.play();
    } catch (_) {}
    meter?.resume();
};

const pause = () => {
    audio.value.pause();
    meter?.pause();
};

const seek = (time: number) => {
    audio.value.currentTime = time;
};

const setVolume = (volume: number) => {
    let asPercent = volume / 100;
    asPercent = Math.min(Math.max(asPercent, 0), 1);
    audio.value.volume = asPercent;
};

const setMute = (muted: boolean) => {
    audio.value.muted = muted;
};

let meter: LoudnessMeter | null = null;

onMounted(() => {
    setVolume(player.volume);

    var AudioContext = window.AudioContext;
    var context = new AudioContext();
    var source = context.createMediaElementSource(audio.value);
    source.connect(context.destination);

    meter = new LoudnessMeter({
        source: source,
        workerUri: "/assets/needles/needles-worker.js",
    });
    meter.on("dataavailable", player.setLoudness);
    meter.start();
});

const playable: Playable = {
    play,
    pause,
    seek,
    setVolume,
    setMute,
};

defineExpose(playable);
</script>
<template>
    <div class="html-audio">
        <audio
            ref="audio"
            :src="player.stream"
            @ended="onSongEnded"
            @pause="player.setPlaying(false)"
            @play="player.setPlaying(true)"
            @timeupdate="player.setProgress(audio?.currentTime)"
        />
    </div>
</template>
<style lang="scss" scoped></style>

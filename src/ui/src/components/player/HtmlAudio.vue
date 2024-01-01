<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { useInsightStore } from "../../store/insight";
import { Playable, usePlayerStore } from "../../store/player";
import { onMounted, ref, watch } from "vue";

const player = usePlayerStore();
const insights = useInsightStore();
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
};

const pause = () => {
    audio.value.pause();
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

onMounted(() => {
    setVolume(player.volume);

    var AudioContext = window.AudioContext;
    var context = new AudioContext();
    var source = context.createMediaElementSource(audio.value);
    source.connect(context.destination);
    insights.setSource(source, context);
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

<script lang="ts" setup>
import {usePlayerStore} from "../store/player";
import {onMounted, ref, watch} from "vue";
import ProgressBar from "../components/ProgressBar.vue";

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
    }
});

watch(() => player.song.id, () => {
    forcePlay = player.playing;
    audio.value.src = null;
    audio.value.src = player.stream;
    audio.value.load();
    player.setPlaying(!audio.value.paused);
});

const play = () => {
    try {
        audio.value.play();
    } catch (_) {}
}

const pause = () => {
    audio.value.pause();
}

const seek = (time: number) => {
    audio.value.currentTime = time;
}

const setVolume = (volume: number) => {
    audio.value.volume = volume / 100;
}

defineExpose({
    play,
    pause,
    seek,
    setVolume,
})
</script>
<template>
    <div class="html-audio">
        <audio
            ref="audio"
            :src="player.stream"
            @pause="player.setPlaying(false)"
            @play="player.setPlaying(true)"
            @timeupdate="player.setProgress(audio?.currentTime)"
            @ended="player.onSongEnded"
        />
    </div>
</template>
<style lang="scss" scoped>
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="wrap">
        <div
            class="covers"
        >
            <h2>Local covers</h2>
            <div
                class="items grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                <div
                    class="cover-wrapper"
                    v-for="(cover, index) in covers"
                    :key="index"
                >
                    <Cover
                        :src="cover.name"
                        class="rounded-xl mb-4"
                    />
                    <div class="flex justify-between w-full mb-4">
                        <p class="overflow-hidden">
                            <Marquee :text="cover.name" />
                        </p>
                        <span class="ml-2 material-symbols-rounded cursor-pointer" @click="deleteCover(cover.name)">delete</span>
                    </div>
                    <TrackCompact
                        v-for="(song, index) in cover.songs"
                        :key="index"
                        :artist="song.artist"
                        :title="song.title"
                        :cover="song.cover"
                        :id="song.id"
                        @play="play(song.id)"
                    />
                </div>
            </div>
        </div>
        <div class="tracks">
            <h2>Local tracks</h2>
            <div class="items grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    class="track"
                    v-for="(track, index) in tracks"
                    :key="index"
                >
                    <div class="flex justify-between w-full mb-4">
                        <p class="overflow-hidden">
                            <Marquee :text="track.name" />
                        </p>
                        <span class="material-symbols-rounded cursor-pointer" @click="deleteTrack(track.name)">delete</span>
                    </div>
                    <div class="flex justify-center w-full mb-4">
                        <audio
                            controls
                            :src="'/api/' + track.name.replace('local:', '/src/tracks/')"
                        />
                    </div>
                    <TrackCompact
                        v-for="(song, index) in track.songs"
                        :key="index"
                        :artist="song.artist"
                        :title="song.title"
                        :cover="song.cover"
                        :id="song.id"
                        @play="play(song.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import TrackCompact from "@/components/Catalogue/Items/home/TrackCompact";
import Cover from "@/components/image/Cover.vue";
import Marquee from "@/components/Marquee.vue";
import {usePlayerStore} from "@/store/player";

const covers = ref([]);
const tracks = ref([]);
const player = usePlayerStore();

const update = () => {
    fetch('/api/config/images').then(x => x.json()).then(x => covers.value = x);
    fetch('/api/config/tracks').then(x => x.json()).then(x => tracks.value = x);
};

const deleteCover = async name => {
    await fetch('/api/config/images', {
        method: 'DELETE',
        body: JSON.stringify({name})
    });
    update();
}

const deleteTrack = async name => {
    fetch('/api/config/tracks', {
        method: 'DELETE',
        body: JSON.stringify({name})
    });
    update();
}

const play = id => {
    player.loadPlaylist("track", id);
}
update();
</script>

<style lang="scss" scoped>
.muted {
    color: var(--font-darker);
}

.wrap {
    margin-right: 10px;
    margin-bottom: 10px;
}

.cover-wrapper, .track {
    background: var(--background-light);
    border-radius: 20px;
    padding: 20px;
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="wrap">
        <h3>Browser Data</h3>
        <IconButton
            class="mb-4"
            icon="delete"
            label="Clean browser settings"
            @click="clearBrowser"
        />
        <h3>Import / Export</h3>
        <div class="flex gap-4 mb-4">
            <IconButton
                icon="backup"
                label="Back up / Export"
                @click="$router.push('/export')"
            />
            <IconButton
                icon="cloud_download"
                label="Import"
                @click="$router.push('/import')"
            />
        </div>
        <div class="covers mb-2">
            <h3>Local covers</h3>
            <div class="items gap-4" v-if="covers.length">
                <Card
                    v-for="(cover, index) in covers"
                    :key="index"
                    class="cover-wrapper p-4"
                >
                    <Cover :src="cover.name" class="rounded-xl mb-4" />
                    <div class="flex justify-between w-full mb-4">
                        <p class="overflow-hidden">
                            <Marquee :text="cover.name" />
                        </p>
                        <span
                            class="ml-2 material-symbols-rounded cursor-pointer"
                            @click="deleteCover(cover.name)"
                            >delete</span
                        >
                    </div>
                    <TrackCompact
                        v-for="(song, index) in cover.songs"
                        :id="song.id"
                        :key="index"
                        :artist="song.artist"
                        :cover="song.cover"
                        :title="song.title"
                        @play="play(song.id)"
                    />
                </Card>
            </div>
            <span class="text-muted italic" v-else>No local covers</span>
        </div>
        <div class="tracks">
            <h3>Local tracks</h3>
            <div class="items gap-4" v-if="tracks.length">
                <Card
                    v-for="(track, index) in tracks"
                    :key="index"
                    class="track p-4"
                >
                    <div class="flex justify-between w-full mb-4">
                        <p class="overflow-hidden">
                            <Marquee :text="track.name" />
                        </p>
                        <span
                            class="material-symbols-rounded cursor-pointer"
                            @click="deleteTrack(track.name)"
                            >delete</span
                        >
                    </div>
                    <div class="flex justify-center w-full mb-4">
                        <audio
                            :src="
                                '/api/' +
                                track.name.replace('local:', '/src/tracks/')
                            "
                            controls
                        />
                    </div>
                    <TrackCompact
                        v-for="(song, index) in track.songs"
                        :id="song.id"
                        :key="index"
                        :artist="song.artist"
                        :cover="song.cover"
                        :title="song.title"
                        @play="play(song.id)"
                    />
                </Card>
            </div>
            <span class="text-muted italic" v-else>No local tracks</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TrackCompact from "@/components/catalogue/Items/home/TrackCompact";
import Cover from "@/components/image/Cover.vue";
import Marquee from "@/components/Marquee.vue";
import { usePlayerStore } from "@/store/player";
import Card from "@/containers/Card.vue";
import IconButton from "@/components/inputs/IconButton.vue";

const covers = ref([]);
const tracks = ref([]);
const player = usePlayerStore();

const update = () => {
    fetch("/api/config/images")
        .then((x) => x.json())
        .then((x) => (covers.value = x));
    fetch("/api/config/tracks")
        .then((x) => x.json())
        .then((x) => (tracks.value = x));
};

const deleteCover = async (name) => {
    await fetch("/api/config/images", {
        method: "DELETE",
        body: JSON.stringify({ name }),
    });
    update();
};

const deleteTrack = async (name) => {
    fetch("/api/config/tracks", {
        method: "DELETE",
        body: JSON.stringify({ name }),
    });
    update();
};

const play = (id) => {
    player.loadPlaylist("track", id);
};
update();

const clearBrowser = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
};
</script>

<style lang="scss" scoped>
.items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30ch, 1fr));
}
</style>

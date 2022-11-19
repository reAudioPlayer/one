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
                    class="cover"
                    v-for="(cover, index) in covers"
                    :key="index"
                >
                    <img
                        :src="'/api/' + parseCover(cover.src)"
                        class="rounded-xl"
                    />
                    <p>{{ cover.name }}</p>
                </div>
            </div>
        </div>
        <div class="tracks">
            <h2>Local tracks</h2>
            <div
                class="track"
                v-for="(track, index) in tracks"
                :key="index"
            >
                <audio
                    controls
                    :src="track.src.replace('local:', '/api/src/tracks/')"
                />
                <p>{{ track.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {parseCover} from "@/common";
import {ref} from "vue";

const covers = ref([]);
const tracks = ref([]);

fetch('/api/src/covers/').then(x => x.json()).then(x => {
    for (const cover of x) {
        covers.value.push({
            name: cover.name,
            src: "local:" + cover.name
        });
    }
})

fetch('/api/src/tracks/').then(x => x.json()).then(x => {
    for (const track of x) {
        tracks.value.push({
            name: track.name,
            src: "local:" + track.name
        });
    }
})
</script>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <router-link :to="playlist.href" class="no-underline">
        <ImportSpotifyPlaylist
            v-if="isSpotify"
            ref="importSpotify"
            :playlist="playlist"
        />
        <Card class="home-playlist drop-shadow-md" with-hover @click="onClick">
            <div class="relative">
                <Cover :src="playlist.cover" type="playlist" :name="playlist.name" />
                <span
                    class="material-symbols-rounded ms-fill play"
                    @click.stop.prevent="playPause"
                >
                    {{ playOrPauseIcon }}
                </span>
            </div>
            <div class="title">
                <span v-if="playlist.type != 'classic'" class="material-symbols-rounded">
                    {{ playlist.type == "smart" ? "neurology" : "bolt" }}
                </span>
                <h4>{{ playlist.name }}</h4>
            </div>
        </Card>
    </router-link>
</template>
<script setup lang="ts">
import Cover from "@/components/image/Cover.vue";
import Card from "@/containers/Card.vue";
import { usePlayerStore } from "@/store/player";
import ImportSpotifyPlaylist from "@/components/popups/ImportSpotifyPlaylist.vue";
import { PropType, computed, ref } from "vue";
import type { IPlaylist } from "@/common";
import { playInPicture } from "@/api/playerInPicture";

const props = defineProps({
    playlist: {
        type: Object as PropType<IPlaylist>,
        required: true,
    },
    isSpotify: {
        type: Boolean,
        default: false,
    },
});

const player = usePlayerStore();
const importSpotify = ref<typeof ImportSpotifyPlaylist>();

const playOrPauseIcon = computed(() => {
    return player.playlistPlayOrPauseIcon(props.playlist.id);
});

const playPause = () => {
    if (props.isSpotify) {
        playInPicture(props.playlist.name, "Spotify", props.playlist.href);
        return;
    }

    if (player.playlistId == props.playlist.id) {
        player.playPause();
    } else {
        player.loadPlaylist(props.playlist.id);
    }
};

const onClick = (e: MouseEvent) => {
    console.log(props.isSpotify);

    if (props.isSpotify) {
        e.preventDefault();
        e.stopPropagation();
        importSpotify.value?.show();
        console.log("showing", importSpotify.value);
    }
}
</script>

<style lang="scss" scoped>
.home-playlist {
    background: var(--bg-base-lt);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex: 1;
    max-width: 200px;
    height: calc(100% - 20px);

    .play {
        position: absolute;
        bottom: -1rem;
        right: -1rem;
        font-size: 2.5rem;
        color: var(--fg-base);
        background: var(--bg-base-lt);
        border-radius: 1000vmax;
        padding: 0.5rem;

        &:hover {
            color: var(--fg-secondary) !important;
        }
    }

    &:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);

        .play {
            background: var(--bg-hover-dk);
        }
    }

    margin: 10px;

    .cover {
        border-radius: 12px;
        width: 100%;
        background-clip: padding-box;
    }

    h2 {
        font-size: 1em;
        margin-bottom: 0;
        color: var(--fg-base);
    }
}

div.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    gap: 0.5em;

    h4 {
        margin: 0;
    }

    span {
        color: var(--fg-secondary);
    }
}
</style>

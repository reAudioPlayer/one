<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <router-link :to="href" class="no-underline">
        <Card class="home-playlist drop-shadow-md" with-hover>
            <div class="relative">
                <Cover :src="cover" type="playlist" :name="name" />
                <span
                    class="material-symbols-rounded ms-fill play"
                    @click.stop.prevent="player.loadPlaylist(id)"
                >
                    play_circle
                </span>
            </div>
            <div class="title">
                <span v-if="type != 'classic'" class="material-symbols-rounded">
                    {{ type == "smart" ? "neurology" : "bolt" }}
                </span>
                <h4>{{ name }}</h4>
            </div>
        </Card>
    </router-link>
</template>
<script setup lang="ts">
import Cover from "@/components/image/Cover.vue";
import Card from "@/containers/Card.vue";
import { usePlayerStore } from "@/store/player";

defineProps({
    name: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "classic",
    },
});

const player = usePlayerStore();
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
        bottom: -0.75rem;
        right: -0.75rem;
        font-size: 2.5rem;
        color: var(--fg-base);
        background: var(--bg-base-lt);
        border-radius: 1000vmax 0 0 0;
        padding: 0.75rem 0 0 0.75rem;

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

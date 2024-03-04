<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import Card from "../../containers/Card.vue";
import { IFullPlaylist, ISmartPlaylist, ISong } from "../../common";
import { computed, PropType } from "vue";
import { IDiff, IPlaylistDiff } from "./diff";
import Cover from "../../components/image/Cover.vue";
import SongDiff from "./SongDiff.vue";

const props = defineProps({
    playlist: {
        type: Object as PropType<IFullPlaylist | ISmartPlaylist>,
        required: true,
    },
    diff: {
        type: Object as PropType<IDiff>,
        required: true,
    },
    isBase: {
        type: Boolean,
        required: false,
    },
    expanded: {
        type: Boolean,
        required: false,
    },
    expandedSong: {
        type: Object as PropType<ISong | null>,
        required: false,
    },
});

const state = computed(() => {
    if (
        props.diff.removed.some((x) => x.playlist.name === props.playlist.name)
    ) {
        return "removed";
    }

    if (props.diff.modified.some((x) => x.name === props.playlist.name)) {
        return "modified";
    }

    if (props.isBase) return "base";

    if (props.diff.added.some((x) => x.playlist.name === props.playlist.name)) {
        return "added";
    }

    return "base";
});

const emit = defineEmits([
    "exclude",
    "toggle-expanded",
    "toggle-expanded-song",
]);

const toggleExpanded = () => {
    emit("toggle-expanded", props.playlist);
};
const toggleExpandedSong = (song: ISong) => {
    emit("toggle-expanded-song", song);
};

const getPlaylistDiff = (playlist: IFullPlaylist): IPlaylistDiff => {
    const diff = props.diff.modified.find((x) => x.name === playlist.name);
    if (diff) {
        return diff;
    }
    return {
        name: playlist.name,
        added: [],
        removed: [],
        modified: [],
    };
};
</script>

<template>
    <Card :class="state" class="playlist p-4 rounded-xl relative">
        <Cover :src="playlist.cover" class="rounded-xl self-start" />
        <div class="info">
            <div class="title">
                <span
                    v-if="playlist.type != 'classic'"
                    class="material-symbols-rounded"
                >
                    {{ playlist.type == "smart" ? "neurology" : "bolt" }}
                </span>
                <h2>{{ playlist.name }}</h2>
            </div>
            <p v-if="playlist.description" class="text-muted">
                {{ playlist.description }}
            </p>
            <div class="flex flex-row justify-between items-center">
                <p class="text-very-muted" v-if="playlist.type === 'classic'">
                    <strong>{{ playlist.songs?.length }}</strong> tracks
                </p>
                <span
                    class="material-symbols-rounded cursor-pointer"
                    title="Expand"
                    @click="toggleExpanded"
                >
                    {{ expanded ? "expand_less" : "expand_more" }}
                </span>
            </div>
        </div>
        <Card v-if="expanded" class="col-span-2 flex flex-col gap-2 z-10 p-4">
            <SongDiff
                v-if="playlist.type === 'classic'"
                v-for="song in playlist.songs"
                :key="song.source"
                :diff="getPlaylistDiff(playlist)"
                :expanded="expandedSong"
                :is-base="isBase"
                :song="song"
                @toggle-expanded="toggleExpandedSong"
            />
            <pre>
                <code v-if="playlist.type === 'smart'">
{{ JSON.stringify((playlist as ISmartPlaylist).definition, null, 4) }}
                </code>
            </pre>
        </Card>
        <span
            v-if="state != 'base'"
            class="material-symbols-rounded exclude"
            title="Exclude"
            @click="$emit('exclude', playlist)"
        >
            block
        </span>
    </Card>
</template>

<style lang="scss" scoped>
.playlist {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 1em;
    overflow: hidden;

    &.added {
        --color: var(--success);
    }

    &.removed {
        --color: var(--fail);
    }

    &.modified {
        --color: var(--warning);
    }

    &:not(.base)::after,
    &:not(.base)::before {
        position: absolute;
        inset: 0 auto 0 0;
        padding: 0.25em;
        content: "";
        z-index: 1;
        background-color: var(--color);
        pointer-events: none;
    }

    &:not(.base)::before {
        inset: 0;
        opacity: 0.1;
        z-index: 1;
    }

    .exclude {
        position: absolute;
        top: 0.25em;
        right: 0.25em;
        padding: 0.25em;
        color: var(--fg-base);
        opacity: 0.5;
        z-index: 2;
        border-radius: 100vmax;
        cursor: pointer;
    }
}

div.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;

    h2 {
        margin: 0;
    }

    span {
        color: var(--fg-secondary);
    }
}

pre,
pre > code {
    margin: 0;
    padding: 0;
}
</style>

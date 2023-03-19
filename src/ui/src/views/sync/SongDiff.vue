<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { ISong } from "../../common";
import { computed, PropType } from "vue";
import { IPlaylistDiff } from "./diff";
import Cover from "../../components/image/Cover.vue";
import ArtistMarquee from "../../components/ArtistMarquee.vue";
import Marquee from "../../components/Marquee.vue";

const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true
    },
    diff: {
        type: Object as PropType<IPlaylistDiff>,
        required: true
    },
    isBase: {
        type: Boolean,
        required: false
    },
    expanded: {
        type: Object as PropType<ISong | null>,
        required: false
    }
});

const state = computed(() => {
    if (props.diff.removed.some(x => x.id === props.song.id)) {
        return "removed";
    }

    if (props.diff.modified.some(x => x.id === props.song.id)) {
        return "modified";
    }

    if (props.isBase) return "base";

    if (props.diff.added.some(x => x.id === props.song.id)) {
        return "added";
    }

    return "base";
});

const emit = defineEmits(["exclude", "toggle-expanded"]);

const toggleExpanded = () => {
    emit("toggle-expanded", props.song);
};

const infoToShow = [
    "title",
    "artist",
    "album",
    "source",
    "cover",
    "favourite",
    "metadata"
];

const displayKey = (key: string) => {
    const modified = props.diff.modified.find(x => x.id === props.song.id)?.changed?.[key];

    const toOrFrom = props.isBase ? "from" : "to";
    const value = modified?.[toOrFrom] ?? props.song[key];

    if (key == "metadata") {
        return value?.spotify?.id;
    }
    return value;
}
</script>

<template>
    <div
        v-if="!(!isBase && state == 'removed')"
        :class="state"
        class="song px-4 py-2"
    >
        <Cover
            :src="song.cover"
            class="rounded-md"
        />
        <div class="overflow-hidden">
            <p class="title my-0">
                <Marquee
                    :text="song.title"
                />
            </p>
            <ArtistMarquee
                :artist="song.artist"
                class="artist text-muted"
            />

        </div>
        <span
            class="material-symbols-rounded cursor-pointer"
            @click="toggleExpanded"
        >
            {{ expanded?.id == song.id ? "expand_less" : "expand_more" }}
        </span>
        <div
            v-if="expanded?.id == song.id"
            class="info"
        >
            <div
                v-for="key in infoToShow"
                :key="key"
                :class="{
                    'modified': diff.modified.find(x => x.id === song.id)?.changed?.[key]
                }"
                class="info__table"
            >
                <span class="key">
                    {{ key }}
                </span>
                <span
                    class="value"
                >{{ displayKey(key) }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.song {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    gap: 1em;
    position: relative;
    border-radius: 1em;
    overflow: hidden;
    border: var(--border-container);

    &:hover {
        background-color: var(--bg-hover-dk);
    }

    &.base {
        --color: none;
    }

    &.added {
        --color: var(--success);
    }

    &.removed {
        --color: var(--fail);
    }

    &.modified {
        --color: var(--warning);
    }

    &::before {
        position: absolute;
        inset: 0 auto 0 0;
        padding: .25em;
        content: "";
        z-index: 1;
        background-color: var(--color);
        pointer-events: none;
    }

    .title {
        overflow: hidden;
    }

    .artist {
        font-size: .8em;
    }

    .info {
        grid-column: 1 / -1;
    }

    .info__table {
        display: grid;
        grid-template-columns: 100px 2fr;
        gap: 1em;
        padding: .5em 0;

        &:not(:last-child) {
            border-bottom: 1px solid var(--border-base);
        }

        :first-child {
            text-transform: uppercase;
            color: var(--fg-base-dk);
        }

        &.modified .value {
            color: var(--color);
        }
    }
}
</style>

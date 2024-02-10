<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import type { ISearchResultItem } from "./search";
import Cover from "../../components/image/Cover.vue";
import { useRouter } from "vue-router";
import ImportSpotifySong from "../../components/popups/ImportSpotifySong.vue";
import ImportSpotifyAlbum from "../../components/popups/ImportSpotifyAlbum.vue";

const router = useRouter();

const props = defineProps({
    item: {
        type: Object as PropType<ISearchResultItem>,
        required: true,
    },
    large: {
        type: Boolean,
        default: false,
    },
    noHover: {
        type: Boolean,
        default: false,
    },
});

const image = computed(() => {
    return props.item?.item?.cover ?? props.item?.item?.image;
});

const name = computed(() => {
    return props.item?.item?.name ?? props.item?.item?.title;
});

const caption = computed(() => {
    return props.item?.item?.artist ?? props.item?.item?.artists.join(", ");
});

const type = computed(() => {
    return props.item?.type;
});

const fallbackIcon = computed(() => {
    return {
        song: "music_note",
        album: "album",
        artist: "person",
        playlist: "queue_music",
        command: "code",
    }[type.value ?? "song"];
});

const confidence = computed(() => {
    return Math.round(props.item?.confidence * 1000) / 10;
});

const isLocal = computed(() => {
    return props.item?.scope === "local";
});

const isSpotify = computed(() => {
    return props.item?.scope === "spotify";
});

const isAudius = computed(() => {
    return props.item?.scope === "audius";
});

const importSpotifySong = ref<typeof ImportSpotifySong>();
const importSpotifyAlbum = ref<typeof ImportSpotifyAlbum>();

const onClick = () => {
    if (type.value === "artist") {
        router.push(`/artist/${props.item.item.name}`);
    } else if (type.value === "playlist") {
        router.push(props.item.item.href);
    } else if (isLocal.value) {
        if (type.value === "song") {
            router.push(props.item.item.href);
        }
    } else if (isSpotify.value) {
        if (type.value === "song") {
            importSpotifySong.value.show();
        } else if (type.value === "album") {
            importSpotifyAlbum.value.show();
        }
    } else if (isAudius.value) {
        if (type.value === "song") {
            importSpotifySong.value.show();
        }
    }
};
</script>
<template>
    <ImportSpotifySong
        v-if="type === 'song' && (isSpotify || isAudius)"
        ref="importSpotifySong"
        :song="props.item.item"
    />
    <ImportSpotifyAlbum
        v-if="type === 'album' && isSpotify"
        ref="importSpotifyAlbum"
        :album="props.item.item"
    />
    <div class="item" :class="{ large, noHover }" @click="onClick">
        <Cover :src="image" :placeholder="fallbackIcon" with-ambient />
        <div class="info">
            <div class="flex flex-col flex-1">
                <span class="name">{{ name }}</span>
                <span v-if="caption" class="text-muted text-sm">{{
                    caption
                }}</span>
            </div>
            <div class="aux flex items-center text-muted text-sm gap-2">
                <span class="tag"> {{ confidence }}% </span>
                <span class="material-symbols-rounded tag">
                    {{ fallbackIcon }}
                </span>
                <span
                    :name="item.scope"
                    v-if="!isLocal"
                    class="uppercase tag"
                    >{{ item.scope }}</span
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    padding: 10px;
    border-radius: 20px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 0.5em;
        object-fit: cover;
    }

    .tag {
        padding: 0.2rem 0.5rem;
        border-radius: 0.5rem;
        background: var(--bg-base-lt);
        border: var(--border-container);
    }

    .info {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.5em;
    }

    .name {
        font-weight: 900;
        font-size: 1rem;
    }

    &.large {
        min-width: 40ch;
        background: var(--bg-base-lt);
        border: var(--border-container);
        border-radius: 1em;
        padding: 1em;

        .info {
            flex-direction: column;
            align-items: flex-start;
        }

        .name {
            font-size: 1.2rem;
        }

        img {
            width: 150px;
            height: 150px;
        }
    }

    &:not(.nohover):hover {
        background: var(--bg-hover-dk);
        cursor: pointer;
    }
}
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { IFullPlaylist, ISong } from "../../common";
import PlaylistEntry from "../songContainers/PlaylistEntry.vue";
import PlaylistHeader from "../songContainers/PlaylistHeader.vue";
// @ts-ignore
import draggable from "vuedraggable";

const playlistScroll = ref(null);

const props = defineProps({
    playlist: {
        type: Object as () => IFullPlaylist,
        required: false,
    },
    useQueue: {
        type: Boolean,
        required: false,
        default: false,
    },
    draggable: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const selectedSongId = ref(-1);
const items = ref<ISong[]>([]);

onMounted(() => {
    items.value = props.useQueue ? props.playlist.queue : props.playlist.songs;
});

watch(
    () => props.playlist,
    (newVal) => {
        items.value = props.useQueue ? newVal.queue : newVal.songs;
    }
);
watch(
    () => props.useQueue,
    () => {
        items.value = props.useQueue
            ? props.playlist.queue
            : props.playlist.songs;
    }
);

defineExpose({
    scrollToSong: (id: number) => {
        const scroll = document.getElementById(
            `bplayer-entry-${id}`
        )?.offsetTop;
        if (scroll >= 150) {
            playlistScroll.value.scrollTop = scroll - 150;
        }
    },
});

const emit = defineEmits(["rearrange"]);

const onPlaylistRearrange = (type) => {
    const moved = type.moved;

    if (!moved) {
        return;
    }

    emit("rearrange", moved.oldIndex, moved.newIndex);
};
</script>
<template>
    <div ref="playlistScroll" class="playlist" v-if="playlist">
        <PlaylistHeader />
        <draggable
            v-model="items"
            :disabled="!draggable"
            item-key="id"
            @change="onPlaylistRearrange"
            @dragover.stop
        >
            <template #item="{ element, index }">
                <PlaylistEntry
                    :id="'bplayer-entry-' + element.id"
                    :key="element.source"
                    :index="index"
                    :selected="selectedSongId == element.id"
                    :song="element"
                    with-cover
                    @click="
                        selectedSongId == element.id
                            ? (selectedSongId = -1)
                            : (selectedSongId = element.id)
                    "
                />
            </template>
        </draggable>
    </div>
</template>

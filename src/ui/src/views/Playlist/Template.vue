<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0

    This component renders ALL playlists
  -->

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import PlaylistEntry from "../../components/songContainers/PlaylistEntry.vue";
// @ts-ignore
import draggable from "vuedraggable";
import {
    applyFilters,
    filterApplied,
    IFilteredSong,
    IPlaylistFilters,
} from "@/components/playlist/applyFilters";
import PlaylistHeader from "../../components/songContainers/PlaylistHeader.vue";
import AmbientBackground from "../../components/image/AmbientBackground.vue";
import { useDataStore } from "../../store/data";
import PlaylistMeta from "@/components/playlist/PlaylistMeta.vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    coverIcon: {
        type: String,
        required: false,
    },
});

const data = useDataStore();
const playlist = computed(() => data.getPlaylistById(props.id));
const playlistMeta = ref<typeof PlaylistMeta>();

const songs = ref(playlist.value?.songs ?? ([] as IFilteredSong[]));
const selectedSongId = ref(null as number | null);
const filters = computed(
    () => (playlistMeta.value?.songFilters ?? {}) as IPlaylistFilters
);

watch(
    [filters, playlist],
    () => {
        if (!playlist.value) {
            return;
        }
        applyFiltersToSongs();
    },
    { deep: true }
);

const applyFiltersToSongs = () => {
    songs.value = applyFilters(playlist.value?.songs ?? [], filters.value);
};
onMounted(() => {
    applyFiltersToSongs();
});

watch(playlist, () => {
    applyFiltersToSongs();
});

const canRearrange = computed(() => {
    return playlist.value.type === "classic" && document.body.clientWidth > 950;
});

const canAdd = computed(() => {
    return playlist.value.type === "classic";
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
    <AmbientBackground
        v-if="playlist?.cover"
        :placeholder="coverIcon"
        :src="playlist.cover"
    />
    <div class="playlist relative p-4">
        <div v-if="!playlist" class="fill-page">
            <h2 class="text-2xl text-center error">Playlist not found</h2>
        </div>
        <div v-else class="wrap">
            <div class="track__data">
                <PlaylistMeta
                    ref="playlistMeta"
                    :playlist="playlist"
                    :coverIcon="coverIcon"
                />
                <template v-if="songs.length">
                    <PlaylistHeader
                        class="hideIfMobile mt-8"
                        with-album
                        with-more
                    />
                    <hr class="mb-4" />
                </template>
                <div class="items" v-if="songs.length">
                    <draggable
                        v-if="songs.length"
                        :key="id"
                        v-model="songs"
                        :class="
                            filters.order == 'asc'
                                ? 'flex-col'
                                : 'flex-col-reverse'
                        "
                        :disabled="filterApplied(filters) || !canRearrange"
                        item-key="id"
                        class="flex"
                        @change="onPlaylistRearrange"
                        @dragover.stop
                    >
                        <template #item="{ element }">
                            <PlaylistEntry
                                v-show="element.show"
                                :index="
                                    playlist.songs.findIndex(
                                        (x) => x.source == element.source
                                    )
                                "
                                :playlist-id="id"
                                :selected="selectedSongId == element.id"
                                :song="element"
                                with-album
                                with-cover
                                with-more
                                @click="
                                    selectedSongId == element.id
                                        ? (selectedSongId = -1)
                                        : (selectedSongId = element.id)
                                "
                                @update="data.fetchPlaylists()"
                            />
                        </template>
                    </draggable>
                </div>
                <p
                    class="text-muted italic text-sm text-center mt-10"
                    v-else-if="canAdd"
                >
                    No songs. Add some!
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.playlist {
    height: 100%;

    h2.error {
        color: var(--fail);
    }
}
</style>
../../components/playlist/applyFilters
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import {
    type ISong,
    type ISpotifySong,
    openInNewTab,
    parseSpotifyId,
} from "../common";
import Cover from "../components/image/Cover.vue";
import AmbientBackground from "../components/image/AmbientBackground.vue";
import PlaylistHeader from "../components/songContainers/PlaylistHeader.vue";
import PlaylistEntry from "../components/songContainers/PlaylistEntry.vue";
import Loader from "../components/Loader.vue";
import ArtistMarquee from "../components/ArtistMarquee.vue";
import ExternalEntry from "../components/songContainers/ExternalEntry.vue";
import { Notifications } from "../components/notifications/createNotification";

const route = useRoute();
const router = useRouter();
const albumHash = computed(() => route.params.hash as string);

interface IAlbum {
    name: string;
    id: string;
    href: string;
    image: string;
    songs: ISong[];
    spotify: null | {
        title: string;
        cover: string;
        releaseDate: Date | null;
        artists: {
            name: string;
            id: string;
        }[];
        url: string;
        id: string;
    };
    artists: string[];
}

const album = ref<IAlbum>(null);
const spotifySongs = ref<ISpotifySong[]>([]);
const selectedSongId = ref(null as number | null);
const spotifyUrl = ref(null as string | null);
const spotifyUrlIcon = ref("url");
const spotifyEnabled = ref(false);

const load = async () => {
    const res = await fetch(`/api/albums/${albumHash.value}`);
    const data = await res.json();
    data.spotify = data.spotify ? JSON.parse(data.spotify) : null;
    if (data.spotify) {
        try {
            data.spotify.releaseDate = new Date(data.spotify.releaseDate);
        } catch {
            data.spotify.releaseDate = null;
        }
    }
    album.value = data;
    selectedSongId.value = null;
    spotifyUrl.value = "";
    spotifyEnabled.value = false;
    if (album.value.spotify.url.length) {
        spotifyUrl.value = album.value.spotify.url;
        fetchFromSpotify(album.value.spotify.id);
        spotifyEnabled.value = true;
    }
    spotifyUrlIcon.value = "link";
};

const fetchFromSpotify = async (id: string) => {
    let fetchedId = null;

    const res = await fetch(`/api/spotify/albums/${id}`);

    if (!res) {
        Notifications.addError(
            "Failed to fetch album from Spotify",
            res.text,
            3000
        );
        return;
    }

    spotifySongs.value = await res.json();
};

const setSpotify = async (value: boolean | string) => {
    await fetch(`/api/albums/${albumHash.value}`, {
        method: "PUT",
        body: JSON.stringify({
            spotifyId: value,
        }),
    });
    album.value = null;
    await load();
};

watch(spotifyUrl, () => {
    if (album.value?.spotify?.id == parseSpotifyId(spotifyUrl.value, "album")) {
        spotifyUrlIcon.value = "link";
        return;
    }

    spotifyUrlIcon.value = "save";
});

const releaseDate = computed(() => {
    return album.value?.spotify?.releaseDate?.toLocaleDateString() ?? "";
});

onMounted(load);
watch(
    () => route.params.name,
    () => {
        album.value = null;
        load();
    }
);
</script>
<template>
    <AmbientBackground v-if="album" :src="album.image" class="-z-10" />
    <div v-if="!album" class="fill-page">
        <Loader />
    </div>
    <div v-else class="artist p-4">
        <div class="wrap">
            <div class="artist__data">
                <div class="upper">
                    <Cover
                        :src="album.image"
                        class="max-w-sm rounded-xl"
                        placeholder="library_music"
                        :name="album.name"
                    />
                    <div class="track__info__details flex flex-col justify-end">
                        <h3 class="text-secondary my-0 text-2xl font-bold">
                            <ArtistMarquee
                                :artist="album.artists.join(', ')"
                                class="inline"
                            />
                            <span
                                class="text-muted text-base ml-4 font-light"
                                v-if="releaseDate"
                            >
                                {{ releaseDate }}
                            </span>
                        </h3>
                        <div class="trac__info__details__normal">
                            <div class="flex flew-row items-center">
                                <h1 class="font-black text-5xl">
                                    {{ album.name }}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <PlaylistHeader class="hideIfMobile mt-8" with-more />
                <hr class="mb-4" />
                <div class="items">
                    <PlaylistEntry
                        v-for="element in album.songs"
                        v-show="true"
                        :index="
                            album.songs.findIndex(
                                (x) => x.source == element.source
                            )
                        "
                        :selected="selectedSongId == element.id"
                        :song="element"
                        playlist-id="album"
                        with-cover
                        with-more
                        :album="album.id"
                        @click="
                            selectedSongId == element.id
                                ? (selectedSongId = -1)
                                : (selectedSongId = element.id)
                        "
                        @update="$emit('update')"
                    />
                </div>
                <Card v-if="spotifySongs?.length" class="p-4">
                    <h2>All songs from this album</h2>
                    <div class="items">
                        <ExternalEntry
                            v-for="(element, index) in spotifySongs"
                            :index="index"
                            :song="element"
                            can-import
                            cannot-add
                            with-cover
                            with-more
                            @update="$emit('update')"
                        />
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.artist .spotify-enable {
    width: 24px;
    height: 24px;
    cursor: pointer;

    path {
        fill: var(--fg-base) !important;
    }

    &.enabled {
        path {
            fill: var(--fg-secondary) !important;
        }
    }
}
</style>

<style lang="scss" scoped>
.related {
    max-height: calc(768px + 1rem);
}

.spotify-infos {
    display: grid;
    grid-template-columns: fit-content(100%) 24px 1fr 24px;
    gap: 1rem;
    align-items: center;
    height: calc(46px + 1.5rem);

    .meta {
        display: grid;
        grid-template-columns: repeat(3, fit-content(100%));

        > *:not(:last-child) {
            margin-right: 1rem;
        }
    }
}

.spotify-suggestions {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: start;
    gap: 2rem;
}

.artist__data .upper {
    display: grid;
    grid-template-columns: fit-content(100%) minmax(500px, 1fr);
    gap: 2rem;
}

.wrap {
    grid-template-columns: 1fr;
    display: grid;
    align-items: start;
}
</style>

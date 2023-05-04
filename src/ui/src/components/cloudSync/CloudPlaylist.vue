<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Card class="cloudPlaylist">
        <span class="close material-symbols-rounded" @click="() => $emit('remove')">close</span>
        <Cover :src="cover" />
        <div class="data">
            <h2>{{playlist.name}}</h2>
            <div class="lead">
                {{playlist.songs.length}} {{playlist.songs.length == 1 ? "song" : "songs"}}<template v-if="playlist.description"> • <i>{{playlist.description}}</i></template>
            </div>
            <div class="status">
                <span class="material-symbols-rounded">{{statusIcon}}</span>
                <div v-if="statusText" class="lead"><i>{{statusText}}</i></div>
            </div>
        </div>
    </Card>
</template>

<script lang="ts">
import { IFullPlaylist, ISong, parseCover } from "../../common";
import Cover from "@/components/image/Cover.vue";
import { addSong } from "../../api/song";
import Card from "../../containers/Card.vue";

export default {
    name: "cloudPlaylist",
    components: { Cover, Card },
    props: {
        playlist: Object,
        localPlaylists: Array,
        cloudPlaylists: Array
    },
    data() {
        return {
            statusText: "",
            toAdd: [] as ISong[],
        }
    },
    methods: {
        parseCover,
        async import() {
            if (this.statusIcon == "cloud_done")
            {
                return;
            }

            if (this.statusIcon == "cloud_sync")
            {
                for (let i = 0; i < this.toAdd.length; i++)
                {
                    const song = this.toAdd[i];
                    this.statusText = `adding song ${i} / ${this.toAdd.length - 1}...`

                    await addSong(this.localPlaylist.id, song);
                }

                this.statusText = "";
                return;
            }

            if (this.statusIcon == "cloud")
            {
                this.statusText = "creating playlist...";

                const create = await fetch("/api/playlists/new");
                this.statusText = "updating playlist...";

                const id = Number(await create.text());

                await fetch(`/api/playlists/${id}`, {
                    method: "POST",
                    body: JSON.stringify({
                        name: this.playlist.name,
                        description: this.playlist.description
                    })
                });

                for (let i = 0; i < this.playlist.songs.length; i++)
                {
                    const song = this.playlist.songs[i];
                    this.statusText = `adding song ${i} / ${this.playlist.songs.length - 1}...`

                    await fetch(`/api/playlists/${id}/tracks`, {
                        method: "POST",
                        body: JSON.stringify({
                            source: song.source,
                            title: song.title,
                            artist: song.artist,
                            album: song.album,
                            cover: song.cover,
                            favourite: song.favourite,
                            duration: song.duration
                        })
                    })
                }

                this.statusText = "";
            }
        },
        songEquals(a: ISong, b: ISong) {
            if (!a || !b)
            {
                return false;
            }

            return a.source == b.source &&
                a.title == b.title &&
                a.artist == b.artist &&
                a.album == b.album &&
                a.cover == b.cover;
        }
    },
    computed: {
        cover() {
            return this.playlist.cover || this.playlist.songs?.[0]?.cover || "/assets/img/music_placeholder.png"
        },
        localPlaylist() {
            for (let i = 0; i < this.localPlaylists.length; i++)
            {
                const playlist = this.localPlaylists[i];
                if (playlist.name == this.playlist.name)
                {
                    return {
                        ...playlist,
                        id: i
                    };
                }
            }
        },
        statusIcon() {
            if (this.statusText)
            {
                return "cloud_sync"
            }

            const others: IFullPlaylist[] = this.localPlaylists || this.cloudPlaylists
            const other = others.filter(x => x.name == this.playlist.name)?.[0];

            if (!other)
            {
                return this.localPlaylists ? "cloud" : "cloud_off"
            }

            if (this.playlist.description != other.description)
            {
                return "cloud_sync"
            }

            this.toAdd = [];
            for (let i = 0; i < this.playlist.songs.length; i++)
            {
                const song = this.playlist.songs[i];
                const otherSong = other.songs?.[i];

                if (!this.songEquals(song, otherSong))
                {
                    this.toAdd.push(song);
                }
            }

            if (this.toAdd.length)
            {
                return "cloud_sync";
            }

            return "cloud_done";
        }
    }
}
</script>

<style lang="scss" scoped>
.cloudPlaylist {
    display: flex;
    flex-direction: row;
    position: relative;

    background: var(--bg-base-lt);
    padding: 20px;
    border-radius: 20px;

    .close {
        position: absolute;
        right: 10px;
        top: 10px;

        &:hover {
            cursor: pointer;
        }
    }

    .data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    img {
        width: 150px;
        max-height: 150px;
        margin-right: 20px;
        border-radius: 12px;
    }

    .lead {
        color: var(--font-darker);
    }

    .status {
        display: flex;
        flex-direction: row;

        .lead {
            margin-left: 20px;
        }
    }
}
</style>
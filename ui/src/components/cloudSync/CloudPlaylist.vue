<template>
    <div class="cloudPlaylist">
        <span @click="() => $emit('remove')" class="close material-symbols-rounded">close</span>
        <img :src="cover">
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
    </div>
</template>

<script>
export default {
    name: "cloudPlaylist",
    props: {
        playlist: Object,
        localPlaylists: Array,
        cloudPlaylists: Array
    },
    data() {
        return {
            statusText: ""
        }
    },
    methods: {
        import() {
            if (this.statusIcon == "cloud_done")
            {
                return;
            }

            if (this.statusIcon == "cloud")
            {
                this.statusText = "creating playlist...";

                fetch("/api/playlists/new").then(async create => {
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
                });
            }
        }
    },
    computed: {
        cover() {
            return this.playlist.songs?.[0]?.cover || "/assets/img/music_placeholder.png"
        },
        statusIcon() {
            if (this.statusText)
            {
                return "cloud_sync"
            }

            const other = this.localPlaylists || this.cloudPlaylists
            if (other.filter(x => JSON.stringify(x) == JSON.stringify(this.playlist) ).length)
            {
                return "cloud_done"
            }

            if (other.filter(x => x.name == this.playlist.name).length)
            {
                return "cloud_sync"
            }

            return this.localPlaylists ? "cloud" : "cloud_off"
        }
    }
}
</script>

<style lang="scss" scoped>
.cloudPlaylist {
    display: flex;
    flex-direction: row;
    position: relative;

    background: var(--background-light);
    padding: 20px;
    border-radius: 5px;

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
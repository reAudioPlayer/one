<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="export">
        <div class="action">
            <h1>Save to File</h1>
            <a id="downloadAnchorElem" style="display:none"></a>
            <IconButton icon="file_download" label="Save" @click="downloadFile" />
        </div>
        <div class="action">
            <h1>Save to Github Gists</h1>
            <IconButton icon="cloud_upload" label="Synchronise" @click="upload" />
        </div>
        <div class="data">
            <CloudPlaylist
                v-for="(playlist, index) in playlists"
                :key="index"
                :cloudPlaylists="cloudPlaylists"
                :playlist="playlist"
                @remove="() => playlists.splice(index, 1)"
            />
        </div>
    </div>
</template>

<script>
import { Buffer } from "buffer";
import CloudPlaylist from "../components/cloudSync/CloudPlaylist.vue";
import Hashids from "hashids";
import GistClient from "@/api/gistClient";
import IconButton from "@/components/inputs/IconButton.vue";
import { useDataStore } from "@/store/data";

window.Buffer = Buffer;
const hashids = new Hashids("reapApollo")

export default {
    name: "import",
    methods: {
        downloadFile() {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.playlists));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "lib.one.json");
            dlAnchorElem.click();
        },
        async upload() {
            console.log(await GistClient.save(this.playlists));
            this.fetchGists();
        },
        async fetchGists() {
            this.cloudPlaylists = await GistClient.getContent();
        },
        async fetchLocalPlaylists() {
            console.log("fetching local playlists", this.dataStore?.playlists);
            this.playlists = [ ];
            for (let id = 0; id < this.dataStore?.playlists?.length; id++) {
                const res = await fetch(`/api/playlists/${id}`)
                const playlist = await res.json();
                this.playlists.push(playlist);
            }
        }
    },
    watch: {
        dataStore: {
            handler() {
                this.fetchLocalPlaylists();
            },
            deep: true
        }
    },
    data() {
        this.fetchGists();

        return {
            playlists: [],
            userData: { },
            cloudPlaylists: [],
            dataStore: useDataStore()
        };
    },
    components: { IconButton, CloudPlaylist }
}
</script>

<style lang="scss" scoped>
.export {
    padding: 20px;

    .action {
        margin-bottom: 20px;
    }

    .data {
        border-top: 1px solid var(--border);

        .cloudPlaylist
        {
            margin-top: 20px;
        }
    }
}

button.iconWithText {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;

    position: relative;

    color: var(--font-contrast);
    background-color: var(--font-colour);

    font-family: var(--font-family);

    border-radius: 22px;
    padding: 10px 25px 10px 25px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 22px;

    span {
        color: var(--font-contrast);
        margin-right: 10px;
    }

    &:hover {
        cursor: pointer;
        padding: 11px 26px 11px 26px;
        border-radius: 23px;
        margin-bottom: 0;
    }
}
</style>

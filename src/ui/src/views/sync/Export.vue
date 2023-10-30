<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="export">
        <div class="action">
            <h1>Save to File</h1>
            <IconButton
                icon="file_download"
                label="Save"
                @click="downloadFile"
            />
        </div>
        <div class="action">
            <h1>Save to Github Gists</h1>
            <div class="flex flex-row gap-2">
                <IconButton
                    icon="cloud_upload"
                    label="Synchronise"
                    @click="upload"
                />
                <IconButton icon="link" label="Browse" @click="openGist" />
            </div>
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

<script lang="ts">
import { Buffer } from "buffer";
import CloudPlaylist from "../../components/cloudSync/CloudPlaylist.vue";
import Hashids from "hashids";
import GistClient from "@/api/gistClient";
import IconButton from "@/components/inputs/IconButton.vue";
import { useDataStore } from "@/store/data";
import { asSyncableCollection, downloadSyncable } from "./collection";

window.Buffer = Buffer;

export default {
    name: "import",
    methods: {
        async downloadFile() {
            const collection = await asSyncableCollection(this.playlists);
            downloadSyncable(collection);
        },
        async openGist() {
            window.open(await GistClient.gistUrl(), "_blank");
        },
        async upload() {
            const syncable = await asSyncableCollection(this.playlists);
            console.log(await GistClient.saveOrUpdate({"my.one.collection": syncable}));
            this.fetchGists();
        },
        async fetchGists() {
            this.cloudPlaylists = await GistClient.getContent();
        },
        async fetchLocalPlaylists() {
            if (this.loadingPlaylists) {
                return;
            }
            this.loadingPlaylists = true;
            this.playlists = [];
            for (const availablePlaylist of this.dataStore?.playlists?.filter(
                (x) => x.type != "special"
            )) {
                const playlist = Object.assign({}, availablePlaylist);
                this.playlists.push(playlist);
            }
            this.loadingPlaylists = false;
        },
    },
    watch: {
        dataStore: {
            handler(newStore, oldStore) {
                this.fetchLocalPlaylists();
            },
            deep: true,
        },
    },
    mounted() {
        this.fetchLocalPlaylists();
    },
    data() {
        this.fetchGists();

        return {
            playlists: [],
            loadingPlaylists: false,
            userData: {},
            cloudPlaylists: [],
            dataStore: useDataStore(),
        };
    },
    components: { IconButton, CloudPlaylist },
};
</script>

<style lang="scss" scoped>
.export {
    padding: 20px;

    .action {
        margin-bottom: 20px;
    }

    .data {
        border-top: 1px solid var(--border);

        .cloudPlaylist {
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

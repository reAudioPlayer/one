<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="import">
        <div class="action">
            <h1>Restore From File</h1>
            <input ref="upFile" accept="application/json" style="display: none" type="file" />
            <IconButton icon="file_upload" label="Upload" @click="() => $refs.upFile.click()" />
            <IconButton icon="done" label="Apply" @click="$refs.playlistsElements.forEach(x => x.import())" />
        </div>
        <div class="action">
            <h2>Synchronise From Github Gists</h2>
            <IconButton icon="cloud_download" label="Synchronise" @click="$refs.playlistsElements.forEach(x => x.import())" />
        </div>
        <div class="data">
            <CloudPlaylist v-for="(playlist, index) in cloudPlaylists" :key="index" ref="playlistsElements" :localPlaylists="localPlaylists" :playlist="playlist" @remove="() => cloudPlaylists.splice(index, 1)" />
        </div>
    </div>
</template>

<script>
import CloudPlaylist from "../components/cloudSync/CloudPlaylist.vue";
import { useDataStore } from "@/store/data";
import IconButton from "@/components/inputs/IconButton.vue";
import GistClient from "@/api/gistClient";


export default {
    name: "import",
    async mounted() {
        this.$refs.upFile.addEventListener("change", () => {
            const file = this.$refs.upFile.files?.[0]
            if (!file)
            {
                return;
            }

            this.uploadedCoverName = this.$refs.upFile?.files?.[0]?.name

            var reader = new FileReader();
            reader.onloadend = () => {
                this.cloudPlaylists = JSON.parse(reader.result);
            }
            reader.readAsText(file);

        });

        this.cloudPlaylists = await GistClient.getContent();
        console.log(this.cloudPlaylists);
    },
    data() {
        const dataStore = useDataStore();

        for (let id = 0; id < dataStore.playlists.length; id++) {
            fetch(`/api/playlists/${id}`).then(x => x.json()).then(playlist => this.localPlaylists.push(playlist));
        }

        return {
            localPlaylists: [ ],
            cloudPlaylists: [ ],
            userData: { },
            dataStore
        };
    },
    components: { IconButton, CloudPlaylist }
}
</script>

<style lang="scss" scoped>
.import {
    padding: 20px;

    .action {
        margin-bottom: 20px;
        position: relative;
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
        margin-bottom: 20px;
    }
}
</style>

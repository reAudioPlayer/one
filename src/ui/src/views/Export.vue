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
            <CloudPlaylist v-for="(playlist, index) in playlists" :key="index" :cloudPlaylists="userData.data?.playlists || []" :playlist="playlist" @remove="() => playlists.splice(index, 1)" />
        </div>
    </div>
</template>

<script>
import { Buffer } from "buffer";
import CloudPlaylist from "../components/cloudSync/CloudPlaylist.vue";
import Hashids from "hashids";
import GistClient from "@/api/gistClient";
import IconButton from "@/components/inputs/IconButton.vue";

window.Buffer = Buffer;
const hashids = new Hashids("reapApollo")

export default {
    name: "import",
    methods: {
        login() {
            window.location = `https://eu-apollo.herokuapp.com/user/accessToken?redirect=${encodeURIComponent(window.location.origin + "/#/export/<token>")}`;
        },
        downloadFile() {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.playlists));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "lib.one.json");
            dlAnchorElem.click();
        },
        async upload() {
            console.log(await GistClient.save(this.playlists));
        }
    },
    data() {
        if (this.$route.params.data) {
            const accessToken = this.$route.params.data;

            fetch(`https://eu-apollo.herokuapp.com/user/${accessToken}`).then(async userData => this.userData = await userData.json())
        }

        fetch("/api/playlists").then(async (inRes) => {
            const playlists = await inRes.json();
            for (let id = 0; id < playlists.length; id++) {
                const res = await fetch(`/api/playlists/${id}`);
                this.playlists.push(await res.json());
            }
        });

        return {
            playlists: [],
            userData: { }
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

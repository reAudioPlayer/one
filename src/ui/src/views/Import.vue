<template>
    <div class="import">
        <div class="action">
            <h1>Restore From File</h1>
            <input type="file" ref="upFile" style="display: none" accept="application/json" />
            <button @click="() => $refs.upFile.click()" class="iconWithText"><span class="material-symbols-rounded">file_upload</span> Upload</button>
            <button @click="$refs.playlistsElements.forEach(x => x.import())" class="iconWithText"><span class="material-symbols-rounded">done</span> Apply</button>
        </div>
        <div class="action" v-if="false">
            <h1>Restore From Cloud</h1>
            <template v-if="userData.user">
                <h2 v-if="userData.user">Hello {{userData.user.userinfo.name}} ({{userData.user.userinfo.email}})</h2>
                <button @click="$refs.playlistsElements.forEach(x => x.import())" class="iconWithText"><span class="material-symbols-rounded">cloud_download</span> Synchronise</button>
            </template>
            <template v-else>
                <button @click="login" class="iconWithText"><span class="material-symbols-rounded">login</span> Log In</button>
            </template>
        </div>
        <div class="data">
            <CloudPlaylist @remove="() => cloudPlaylists.splice(index, 1)" ref="playlistsElements" v-for="(playlist, index) in cloudPlaylists" :key="index" :playlist="playlist" :localPlaylists="localPlaylists" />
        </div>
    </div>
</template>

<script>
import { Buffer } from 'buffer';
window.Buffer = Buffer;
import Hashids from 'hashids'
import CloudPlaylist from '../components/cloudSync/CloudPlaylist.vue';
const hashids = new Hashids("reapApollo")

export default {
    name: "import",
    methods: {
        login() {
            window.location = `https://eu-apollo.herokuapp.com/user/accessToken?redirect=${encodeURIComponent(window.location.origin + "/#/import/<token>")}`;
        }
    },
    mounted() {
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
            return;
        })
    },
    data() {
        if (this.$route.params.data) {
            const accessToken = this.$route.params.data;

            fetch(`https://eu-apollo.herokuapp.com/user/${accessToken}`).then(async userData => {
                this.userData = await userData.json()
                this.cloudPlaylists = this.userData.data.playlists
            })
        }

        for (let id = 0; id < this.$store.state.playlists.length; id++) {
            fetch(`/api/playlists/${id}`).then(x => x.json()).then(playlist => this.localPlaylists.push(playlist));
        }

        return {
            localPlaylists: [ ],
            cloudPlaylists: [ ],
            userData: { }
        };
    },
    components: { CloudPlaylist }
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

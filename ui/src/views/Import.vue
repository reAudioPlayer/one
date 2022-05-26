<template>
    <div class="import">
        <div class="action">
            <h1>Cloud Restore</h1>
            <h2 v-if="userData.user">Hello {{userData.user.name}} ({{userData.user.email}})</h2>
            <button @click="$refs.playlistsElements.forEach(x => x.import())" class="iconWithText"><span class="material-symbols-rounded">cloud_download</span> Synchronise</button>
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
    data() {
        if (this.$route.params.data) {
            const accessToken = this.$route.params.data;

            fetch(`https://eu-apollo.herokuapp.com/user/get/${accessToken}`).then(async userData => {
                this.userData = await userData.json()
                this.cloudPlaylists = this.userData.data.playlists
            })

            fetch("/api/playlists").then(async (inRes) => {
                const playlists = await inRes.json();
                for (let id = 0; id < playlists.length; id++) {
                    const res = await fetch("/api/playlist", {
                        method: "POST",
                        body: JSON.stringify({
                            id
                        })
                    });
                    this.localPlaylists.push(await res.json());
                }
            });
        }
        else {
            window.location = `https://eu-apollo.herokuapp.com/user/get/redirect?redirect=${encodeURIComponent(window.location.origin + "/#/import/")}`;
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
        .cloudPlaylist:not(:first-child)
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

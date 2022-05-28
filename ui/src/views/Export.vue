<template>
    <div class="export">
        <div class="action">
            <h1>Cloud Save</h1>
            <h2 v-if="userData.user">Hello {{userData.user.userinfo.name}} ({{userData.user.userinfo.email}})</h2>
            <button @click="upload" class="iconWithText"><span class="material-symbols-rounded">cloud_upload</span> Synchronise</button>
        </div>
        <div class="data">
            <CloudPlaylist @remove="() => playlists.splice(index, 1)" v-for="(playlist, index) in playlists" :key="index" :playlist="playlist" :cloudPlaylists="userData.data?.playlists || []" />
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
        upload() {
            this.userData.data.playlists = this.playlists;
            console.error(this.userData.data);
            const accessToken = this.$route.params.data;
            fetch(`https://eu-apollo.herokuapp.com/user/${accessToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.userData.data)
            });
        }
    },
    data() {
        if (this.$route.params.data) {
            const accessToken = this.$route.params.data;

            fetch(`https://eu-apollo.herokuapp.com/user/${accessToken}`).then(async userData => this.userData = await userData.json())

            fetch("/api/playlists").then(async (inRes) => {
                const playlists = await inRes.json();
                for (let id = 0; id < playlists.length; id++) {
                    const res = await fetch("/api/playlist", {
                        method: "POST",
                        body: JSON.stringify({
                            id
                        })
                    });
                    this.playlists.push(await res.json());
                }
            });
        }
        else {
            window.location = `https://eu-apollo.herokuapp.com/user/accessToken?redirect=${encodeURIComponent(window.location.origin + "/#/export/<token>")}`;
        }
        return {
            playlists: [],
            userData: { }
        };
    },
    components: { CloudPlaylist }
}
</script>

<style lang="scss" scoped>
.export {
    padding: 20px;

    .action {
        margin-bottom: 20px;
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

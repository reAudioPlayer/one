<template>
    <div class="wrapper">
        <add-artist-to-playlist :cover="cover" :name="name" :description="description" :id="id" :href="`https://open.spotify.com/artist/${id}`" ref="import" />
        <div class="item" @click="redirect">
            <img :src="cover" />
            <h4>{{name}}</h4>
            <p v-html="description" />
            <button @click="follow" v-if="showFollowButton" class="followButton">{{following ? "Following" : "Follow"}}</button>
        </div>
    </div>
</template>

<script>
    import AddArtistToPlaylist from '../../../Popups/AddArtistToPlaylist.vue'
    export default {
        components: { AddArtistToPlaylist },
        name: 'ArtistItem',
        methods: {
            redirect() {
                this.$refs.import.showModal = true
            },
            follow(e)
            {
                e.stopPropagation();
                const method = this.following ? "DELETE" : "POST"
                fetch("/api/spotify/following", {
                        method,
                        body: JSON.stringify({
                            "artistId": this.id
                        })
                    }).then(x => {
                        if (x.status == 200)
                        {
                            this.following = !this.following
                        }
                    })
            }
        },
        data() {
            return {
                following: false
            }
        },
        props: {
            cover: String,
            name: String,
            description: String,
            id: String,
            showFollowButton: Boolean
        }
    }
</script>

<style scoped>
    .followButton {
        color: var(--font-colour);
        background: none;
        border: 1px solid var(--hover-2);
        border-radius: 2px;
        font-family: var(--font-family);
        text-transform: uppercase;
        margin-top: 5px;
        padding: 5px 10px;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .followButton:hover {
        cursor: pointer;
        border-color: var(--font-colour);
    }

    p.note {
        font-size: .7em;
    }

    .wrapper {
        background: var(--background-light);
        border-radius: 5px;
        min-height: 10vh;
        margin: 10px;
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    .item {
        padding: 20px;
        height: calc(100% - 40px);
    }

    img {
        width: 100%;
        border-radius: 2px;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: 0;
        color: var(--font-darker);
        font-size: .8em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

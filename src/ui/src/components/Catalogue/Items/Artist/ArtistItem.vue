<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <router-link :to="'/artist/' + name" class="noLink">
        <Card class="wrapper" with-hover>
            <add-artist-to-playlist
                ref="import"
                :artist="{
                    id,
                    name,
                    href: `https://open.spotify.com/artist/${id}`,
                    image: cover
                }"
            />
            <div class="item">
                <img :src="cover" />
                <h4>{{name}}</h4>
                <p v-html="description" />
                <button v-if="showFollowButton" class="followButton" @click="follow">{{following ? "Following" : "Follow"}}</button>
            </div>
        </Card>
    </router-link>
</template>

<script>
import Card from "@/containers/Card.vue";

export default {
        components: { Card },
        name: 'ArtistItem',
        methods: {
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
        color: var(--fg-base);
        background: none;
        border: 1px solid var(--border-base);
        border-radius: 2px;
        font-family: var(--ff-base);
        text-transform: uppercase;
        margin-top: 5px;
        padding: 5px 10px;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .followButton:hover {
        cursor: pointer;
    }

    p.note {
        font-size: .7em;
    }

    .wrapper {
        background: var(--bg-base-lt);
        border-radius: 20px;
        min-height: 10vh;
        margin: 10px;
        padding: 20px;
        position: relative;
        text-decoration: none !important;
        height: calc(100% - 20px);
    }

    .wrapper:hover {
        cursor: pointer;
        background: var(--bg-hover-dk);
    }

    .item {
        height: calc(100% - 40px);
    }

    img {
        width: 100%;
        border-radius: 12px;
        margin-bottom: 1em;
    }

    h4 {
        margin: 0;
    }

    p {
        margin: 0;
        color: var(--fg-base-dk);
        font-size: .8em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<script setup>
import Logo from '/src/assets/images/logo/logo.svg'
</script>
<template>
    <div class="sidebar">
        <div class="static">
            <div class="collapseSidebar hideIfMobile" :class=" { 'minimised': minimised } ">
                <Logo class="logo" v-if="!minimised" @click="onLogoClick" />
                <span @click="minimised = !minimised"
                    class="hideIfMobile clickSymbol material-symbols-rounded">{{ minimised ? "chevron_right" : "chevron_left" }}</span>
            </div>
            <nav-entry :minimised="minimised" href="/collection/playlists" icon="library_music" name="Your Library"
                :hasChildSites="true" parentHref="/collection" />
            <nav-entry class="hideIfMobile" :minimised="minimised" href="/search" icon="search" name="Search" />
            <nav-entry :minimised="minimised" href="/discover" icon="explore" name="Discover" />
            <nav-entry :minimised="minimised" href="/preferences" icon="settings" name="Preferences" />
            <br v-if="showNewsTab || showSportsTab">
            <nav-entry :minimised="minimised" v-if="showNewsTab" href="/news" icon="newspaper" name="News"
                :hasChildSites="true" />
            <nav-entry :minimised="minimised" v-if="showSportsTab" href="/sports" icon="sports_soccer" name="Sports"
                :hasChildSites="true" />
            <br class="hideIfMobile">
            <nav-entry class="hideIfMobile" :minimised="minimised" href="/playlist/create" icon="add_circle" name="Create Playlist" />
            <nav-entry :minimised="minimised" href="/collection/tracks" icon="favorite" name="Liked Songs" />
        </div>
        <template v-if="!minimised">
            <hr class="hideIfMobile">
            <div class="playlistList expanded hideIfMobile">
                <router-link v-for="(element, index) in playlists" :key="index" :to="element.href">{{element.name}}
                </router-link>
            </div>
        </template>
        <template v-else>
            <hr class="hideIfMobile">
            <div class="playlistList hideIfMobile">
                <nav-entry v-for="(element, index) in playlists" :key="index" :minimised="minimised"
                    :href="element.href" :img="element.cover" :name="element.name" />
            </div>
        </template>
        <img v-if="expandCover" @click="hideCover" :src="cover" class="cover hideIfMobile" />
    </div>
</template>

<script>
    import NavEntry from '@/components/Sidebar/NavEntry.vue'

    import Hashids from 'hashids'
    const hashids = new Hashids("reapOne.playlist", 22)

    export default {
        name: 'Sidebar',
        components: {
            NavEntry
        },
        props: {
            expandCover: Boolean
        },
        mounted() {
            fetch("/api/playlists")
                .then(x => x.json())
                .then(async jdata => {
                    for (let i = 0; i < jdata.length; i++) {
                        console.log(jdata[i])
                        const resp = await fetch(`/api/playlists/${i}`)
                        const pdata = await resp.json()
                        this.playlists.push({
                            name: pdata.name,
                            description: pdata.description,
                            cover: pdata.cover,
                            href: `/playlist/${hashids.encode(i)}`
                        })
                    }
                })
        },
        watch: {
            minimised() {
                document.documentElement.style.setProperty("--sidebar-width", this.minimised ? "24px" : "200px");
                window.localStorage.setItem("player.collapsedSidebar", this.minimised)
            }
        },
        data() {
            const connect = () => {
                console.log("attempting reconnect")
                let ws = new WebSocket('ws://localhost:1234/ws');

                ws.onclose = () => {
                    console.log("ws closed")

                    setTimeout(connect, 1000);
                }

                ws.onopen = () => {
                    console.log("ws connected")
                }

                ws.onmessage = msg => {
                    const jdata = JSON.parse(msg.data);
                    this.updateData(jdata)
                }
            }
            connect()

            const minimised = window.localStorage.getItem("player.collapsedSidebar") == "true";

            document.documentElement.style.setProperty("--sidebar-width", minimised ? "24px" : "200px");

            return {
                playlists: [],
                cover: "/assets/img/music_placeholder.png",
                showSportsTab: window.localStorage.getItem("sidebar.showSportsTab") == "true",
                showNewsTab: window.localStorage.getItem("sidebar.showNewsTab") == "true",
                minimised
            }
        },
        methods: {
            hideCover() {
                this.$emit("expandCover", false)
            },
            onLogoClick() {
                this.$router.push("/")
            },
            updateData(jdata) {
                if (jdata.path == "player.song") {
                    this.cover = jdata?.data?.cover || "/assets/img/music_placeholder.png"
                    return;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $horizontalWidth: 1200px;
    $mobileWidth: 950px;

    .logo {
        fill: var(--font-colour);
        padding: 10px;
        width: 60%;

        &:hover {
            cursor: pointer;
        }
    }

    .collapseSidebar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 90px;

        &.minimised {
            justify-content: center;
        }

        .clickSymbol {
            border-radius: 5px;

            &:hover {
                cursor: pointer;
                background: var(--hover-2);
            }
        }
    }

    .static {
        flex-shrink: 0;
        flex-grow: 0;

        @media screen and (max-width: $mobileWidth) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
        }
    }

    h2 {
        margin-bottom: 0;
    }

    .cover {
        height: calc(var(--sidebar-width) + 40px);
        width: calc(var(--sidebar-width) + 40px);
        transform: translate(-10px, 10px);
    }

    .playlistList {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        &.expanded {
            padding: 0px 10px;
        }
    }

    .playlistList>a {
        font-size: 0.92em;
        text-decoration: none;
        color: var(--font-darker);
        margin-bottom: 4px;
        margin-top: 4px;
    }

    .playlistList>a:hover {
        color: var(--font-colour)
    }

    hr {
        width: 100%;
    }

    div.sidebar {
        background: var(--sidebar-background);
        width: calc(var(--sidebar-width) + 20px);
        min-width: calc(var(--sidebar-width) + 20px);
        display: flex;
        flex-direction: column;
        padding: 10px;
        max-height: calc(100vh - var(--player-height) - 20px);
        z-index: 1;

        @media screen and (max-width: $mobileWidth) {
            flex-direction: row;
            width: calc(100vw - 20px);
            position: absolute;
            bottom: 0;
        }
    }

    h2:hover {
        cursor: pointer;
    }

    h2 {
        margin: 0;
        padding: 10px;
    }
</style>
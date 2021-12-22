<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-submenu title="Search on">
                <v-contextmenu-item @click="openSoundcloud">Soundcloud</v-contextmenu-item>
                <v-contextmenu-item @click="openAudius">Audius</v-contextmenu-item>
                <v-contextmenu-item @click="openYoutubeMusic">Youtube Music</v-contextmenu-item>
                <v-contextmenu-item @click="openSpotify">Spotify</v-contextmenu-item>
            </v-contextmenu-submenu>
        </v-contextmenu>
    </div>
</template>

<script>
    export default {
        name: "FindSources",
        props: {
            artist: String,
            title: String
        },
        methods: {
            hide() {
                this.$refs.contextmenu.hide()
            },
            show(evt) {
                const targetDimensions = this.$refs.box.getBoundingClientRect();

                const position = {
                    top: targetDimensions.height +
                        targetDimensions.top +
                        window.scrollY,
                    left: targetDimensions.width +
                        targetDimensions.left +
                        window.scrollX,
                };

                this.$refs.contextmenu.show(position)
                evt?.stopPropagation();
            },
            openSoundcloud() {
                window.open(`https://soundcloud.com/search?q=${this.artist} ${this.title}`)
            },
            openAudius() {
                window.open(`https://audius.co/search/${this.artist} ${this.title}`)
            },
            openYoutubeMusic() {
                window.open(`https://music.youtube.com/search?q=${this.artist} ${this.title}`)
            },
            openSpotify() {
                window.open(`https://open.spotify.com/search/${this.artist} ${this.title}`)
            }
        }
    }
</script>
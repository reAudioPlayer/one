<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="play">Play</v-contextmenu-item>
            <v-contextmenu-item @click="openTab">Open in new tab</v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="deletePlaylist">Delete playlist</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>

<script>
    export default {
        name: "PlaylistCtx",
        props: {
            name: String,
            id: String,
            href: String
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
            openTab() {
                window.open(`/#${this.href}`)
            },
            play() {
                fetch("/api/loadPlaylist", {
                    method: "POST",
                    body: JSON.stringify({
                        id: this.id,
                        type: "playlist"
                    })
                })
            },
            deletePlaylist() {
                fetch(`/api/playlist/${Number(this.id)}`, {
                    method: "DELETE"
                })
            }
        }
    }
</script>
<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="preview">Preview</v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="like">{{(liked ? 'Remove from' : 'Save to') + ' your Liked Songs'}}</v-contextmenu-item>
            <v-contextmenu-item v-if="!isAutoPlaylist" @click="remove">Remove from this playlist</v-contextmenu-item>
            <v-contextmenu-submenu title="Add to playlist">
                <v-contextmenu-item @click="() => addto('new')">Add to new playlist</v-contextmenu-item>
                <v-contextmenu-divider />
                <v-contextmenu-item v-for="(element, index) in playlists" :key="index" @click="() => addto(index)">{{element}}</v-contextmenu-item>
            </v-contextmenu-submenu>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="update">Update Metadata</v-contextmenu-item>
            <v-contextmenu-divider />
            <v-contextmenu-item @click="download">Download</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>

<script>
    export default {
        name: "SongCtx",
        props: {
            liked: Boolean,
            isAutoPlaylist: Boolean,
            src: String,
            artist: String,
            title: String
        },
        data() {
            fetch("/api/playlists")
                    .then(x => x.json())
                    .then(jdata => {
                        this.playlists.length = 0;
                        this.playlists.push(...jdata)
                    })

            return {
                playlists: [ ]
            }
        },
        methods: {
            preview() {
                const event = new CustomEvent('player.play', { detail: {
                    title: this.title,
                    artist: this.artist,
                    source: this.src
                } });
                window.dispatchEvent(event);
                this.$refs.contextmenu.hide()
            },
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
            like() {
                this.$emit("like")
            },
            remove() {
                this.$emit("remove")
            },
            addto(index) {
                if (index === 'new')
                {
                    fetch("/api/playlists/new")
                        .then(x => x.text()).then(y => {
                            this.$emit("addto", Number(y.replace('/playlist/', '')))
                        })
                    return
                }

                this.$emit("addto", index)
            },
            download() {
                this.$emit("download")
            },
            update() {
                this.$emit("update")
            }
        }
    }
</script>
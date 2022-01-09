<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
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
            <v-contextmenu-item @click="share">Share</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>

<script>
    export default {
        name: "SongCtx",
        props: {
            liked: Boolean,
            isAutoPlaylist: Boolean
        },
        data() {
            fetch("http://localhost:1234/api/playlists")
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
                    fetch("http://localhost:1234/api/playlist/create")
                        .then(x => x.text()).then(y => {
                            this.$emit("addto", Number(y.replace('/playlist/', '')))
                        })
                    return
                }

                this.$emit("addto", index)
            },
            share() {
                this.$emit("share")
            },
            update() {
                this.$emit("update")
            }
        }
    }
</script>
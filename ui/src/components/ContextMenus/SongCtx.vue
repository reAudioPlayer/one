<template>
    <div ref="box" v-contextmenu:contextmenu>
        <slot />
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="like">{{(liked ? 'Remove from' : 'Save to') + ' your Liked Songs'}}</v-contextmenu-item>
            <v-contextmenu-item @click="remove">Remove from this playlist</v-contextmenu-item>
            <v-contextmenu-item @click="addto">Add to playlist</v-contextmenu-item>
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
            liked: Boolean
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
            addto() {
                this.$emit("addto")
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
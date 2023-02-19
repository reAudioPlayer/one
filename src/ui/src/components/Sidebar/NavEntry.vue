<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <router-link :to="href" class="link">
        <div :class="{ active, img: showImg }" class="navEntry">
            <span v-if="icon" class="material-icons-round icon">{{icon}}</span>
            <Cover v-if="showImg" :src="img" class="icon" type="playlist" />
            <span v-if="!minimised" class="name hideIfMobile">{{name}}</span>
        </div>
    </router-link>
</template>

<script>
import Cover from "@/components/image/Cover.vue";

export default {
        name: 'NavEntry',
        components: {
            Cover
        },
        props: {
            icon: String,
            img: String,
            name: String,
            href: String,
            hasChildSites: Boolean,
            parentHref: String,
            minimised: Boolean
        },
        computed: {
            showImg() {
                if (this.img) {
                    return true;
                }
                return /^\/playlist\/\w{22}$/.exec(this.href);
            },
            active() {
                if (!this.hasChildSites) {
                    return false;
                }
                if (this.$route.path.includes(this.href))
                {
                    return true;
                }
                console.log(this.parentHref)
                return this.parentHref && this.$route.path.includes(this.parentHref);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $horizontalWidth: 1200px;
    $mobileWidth: 950px;

    .link {
        text-decoration: none;
    }

    div.navEntry {
        display: flex;
        flex-direction: row;
        padding: 10px;
        border-radius: 5px;
        color: var(--fg-base-dk);

        &.img {
            padding: 5px;
        }
    }

    div.navEntry:hover,
    .router-link-active div.navEntry,
    div.navEntry.active {
        background-color: var(--bg-hover-dk);
        cursor: pointer;
        color: var(--fg-base);
    }

    .router-link-active div.navEntry,
    div.navEntry.active {
        background-color: var(--bg-hover);
    }

    .name {
        font-weight: bold;
    }

    .icon {
        width: 34px;

        :has:not(.material-symbols-rounded) {
            height: 34px;
        }
    }

    .icon {
        width: 100%;
        border-radius: 3px;
    }
</style>
<template>
    <router-link class="link" :to="href">
        <div class="navEntry" :class="{ active, img }">
            <span v-if="icon" class="material-icons-round icon">{{icon}}</span>
            <img v-if="img" class="icon" :src="img">
            <span v-if="!minimised" class="name">{{name}}</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'NavEntry',
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

<style scoped lang="scss">
    .link {
        text-decoration: none;
    }

    div.navEntry {
        display: flex;
        flex-direction: row;
        padding: 10px 0 10px 10px;
        border-radius: 5px;
        color: var(--font-darker);

        &.img {
            padding: 5px;
        }
    }

    div.navEntry:hover,
    .router-link-active div.navEntry,
    div.navEntry.active {
        background-color: var(--hover-1);
        cursor: pointer;
        color: var(--font-colour);
    }

    .router-link-active div.navEntry,
    div.navEntry.active {
        background-color: var(--hover-2);
    }

    .name {
        font-weight: bold;
    }

    .icon {
        width: 40px;
    }

    img.icon {
        width: 100%;
        border-radius: 3px;
    }
</style>
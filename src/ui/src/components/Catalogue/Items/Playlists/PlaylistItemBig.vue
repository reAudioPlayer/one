<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="itemBig drop-shadow-md">
        <div class="item h-full flex justify-between" @click="redirect">
            <div v-if="icon" class="icon">
                <span class="material-symbols-rounded">{{icon}}</span>
            </div>
            <div class="wrapper">
                <h4>{{title}}</h4>
            <p>{{description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ReleaseItemBig',
        methods: {
            redirect() {
                this.$router.push(this.href)
            }
        },
        props: {
            title: String,
            description: String,
            href: String,
            icon: String
        }
    }
</script>

<style lang="scss" scoped>
    $mobileWidth: 750px;

    p.note {
        font-size: .8em;
    }

    .icon {
        text-align: center;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .material-symbols-rounded {
        font-variation-settings: 'FILL' 1;
        font-size: 5em;
    }

    .itemBig {
        grid-column: span 2;
        background: var(--bg-gradient);
        border-radius: 5px;
        min-height: 10vh;
        margin: 10px;
        color: var(--bg-contrast);

        @media screen and (max-width: $mobileWidth) {
            grid-column: span 1;
        }
    }

    .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 20px;

        @media screen and (max-width: $mobileWidth) {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: .5em;
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .itemBig:hover {
        cursor: pointer;
    }

    img {
        width: 50%;
        border-radius: 2px;
    }

    @media screen and (min-width: $mobileWidth) {
        h4 {
            font-size: 2em;
        }
    }

    h4, p {
        margin: 0;
    }
</style>

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

<style scoped lang="scss">
    $horizontalWidth: 1200px;
    $mobileWidth: 950px;

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

    h4 {
        margin: 0;
        font-size: 2em;
    }

    p {
        margin: 0;
    }
</style>

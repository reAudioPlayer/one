<template>
    <div class="marqueeWrapper" :class="{marquee: isMarquee}">
        <span ref="marquee" :class="{marquee: isMarquee}">
            {{text}}

            <span class="replacer" v-if="isMarquee">
                {{text}}
            </span>
        </span>
        <div class="overlay" v-if="isMarquee"/>
    </div>
</template>

<script>
export default {
    name: "Marquee",
    mounted() {
        this.update();
        window.addEventListener('resize', this.update);
    },
    data() {
        return {
            isMarquee: false
        }
    },
    methods: {
        isTruncated(el) {
            return el.scrollWidth > el.clientWidth
        },
        update() {
            this.isMarquee = false;
            setTimeout(() => {
                this.isMarquee = this.isTruncated(this.$refs.marquee);
            }, 10);
        }
    },
    props: {
        text: String
    },
    watch: {
        text() {
            this.update();
        }
    }
}
</script>

<style scoped>
    .hidden {
        display: none;
    }

    @keyframes marquee {
        0% {
            transform: translate(0%, 0);
        }
        20% {
            transform: translate(0%, 0);
        }
        100% {
            transform: translate(calc(-100% - 30px), 0);
        }
    }

    div {
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
    }

    .marqueeWrapper, .marqueeWrapper * {
        text-decoration: inherit;
    }

    .marqueeWrapper {
        position: relative;
        margin: 0;
    }

    .replacer {
        position: absolute;
        top: 0;
        left: calc(100% + 30px);
    }

    span {
        width: auto;
        margin: 0;
        white-space: nowrap;
        display: inherit;
        overflow: hidden;
        /*text-overflow: ellipsis;*/
    }

    span.marquee {
        position: relative;
        /*padding-right: 20%;*/
        /*margin-right: 20px;*/
        animation: marquee 15s linear infinite;
        overflow: unset;
        text-overflow: unset;
        display: table-cell;
    }

    .overlay { 
        position: absolute; 
        bottom: 0; 
        left: 0;
        width: 100%;
        text-align: center; 
        padding: 30px;
        /*background-image: linear-gradient(90deg, var(--player-background) 0%, transparent 2%, transparent 90%, var(--player-background) 100%);*/
    }
</style>

<template>
    <div class="play" :class="{ 'home': home }">
        <span v-if="type == 'block'" class="material-icons-round">
            block
        </span>
        <span v-else-if="type == 'serve'" class="material-icons-round">
            start
        </span>
        <span v-else-if="type == 'firstServe'" class="material-icons-round">
            flag
        </span>
        <span v-else-if="type == 'spike'" class="material-icons-round">
            arrow_downward
        </span>
        <div>
            <p>{{name}}</p>
            <p class="small">{{toTitleCase(type)}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        name: String,
        home: Boolean
    },
    methods: {
        toTitleCase(text)
        {
            const result = text.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
    }
}
</script>

<style scoped>
    .play {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: center;
        align-items: center;
    }

    .play span {
        margin-right: 10px;
    }

    .play.home span {
        margin-right: 0;
        margin-left: 10px;
    }

    .play.home {
        flex-direction: row-reverse;
    }

    p {
        margin: 0;
        text-align: left;
    }

    p.small {
        color: var(--font-darker);
        font-size: .6em;
    }

    .play.home p {
        text-align: right;
    }
</style>
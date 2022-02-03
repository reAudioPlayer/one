<template>
    <div class="statWrapper">
        <div class="title">
            <h4>{{title}}</h4>
        </div>
        <div class="values">
            <h5>{{home}}</h5>
            <h5>{{away}}</h5>
        </div>
        <div class="bars">
            <progress class="home" max="100" :value="homePerc"></progress>
            <progress class="away" max="100" :value="awayPerc"></progress>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        home: Number,
        away: Number,
        homePerc: Number,
        awayPerc: Number,
        title: String
    }
}
</script>

<style scoped>

    h4, h5 {
        text-transform: uppercase;
        font-size: .8em;
        margin: 0;
    }

    .values, .bars, .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .bars {
        margin: 10px 0px;
    }

    .title {
        justify-content: center;
    }

    progress {
        width: 100%;
        margin-left: 5px;
    }

    progress.home {
        margin-left: 0;
        margin-right: 5px;
    }

    progress, progress::-webkit-progress-bar {
        background: var(--font-colour);
        border: none;
        appearance: none;
        height: 0.5em;
        border-top-right-radius: 9px;
        border-bottom-right-radius: 9px;
    }

    progress, progress::-webkit-progress-value {
        background-color: var(--accent);
        border-top-right-radius: 9px;
        border-bottom-right-radius: 9px;
    }

    progress.home {
        transform: scaleX(-1);
    }

</style>

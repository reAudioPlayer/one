<template>
    <div class="itemBig">
        <div class="item" @click="redirect">
            <div class="wrapper topalign">
                <p>{{competition}}</p>
                <p class="right progress" :class="{'accent': progress.includes(`'`)}">{{progress}}</p>
            </div>
            <div class="wrapper">
                <p v-html="team1" class="team" />
                <h4 class="result" v-html="result" />
                <p v-html="team2" class="team" />
            </div>
            <div class="wrapper bottomalign">
                <p class="small">{{date}}, {{href}}</p>
                <span @click="remove" class="deleteIcon small material-icons-round">clear</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FootballItem',
        methods: {
            redirect() {
                window.open(this.href)
            },
            remove(e) {
                e.stopPropagation()
                this.$emit("remove")
            }
        },
        props: {
            result: String,
            date: String,
            competition: String,
            href: String,
            team1: String,
            team2: String,
            progress: String
        }
    }
</script>

<style scoped>
    p.note {
        font-size: .8em;
    }

    .itemBig {
        grid-column: span 2;
        background: var(--background-light);
        border-radius: 5px;
        min-height: 15vh;
        margin: 10px;
    }

    .item {
        display: flex;
        flex-direction: column;
        padding: 20px;
        min-height: calc(100% - 40px);
    }

    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
        margin-bottom: 20px;
    }

    .topalign {
        align-items: flex-start;
        flex-grow: 0;
    }

    .bottomalign {
        align-items: flex-end;
        flex-grow: 0;
        margin-bottom: 0;
    }

    .team {
        display: flex;
        flex-direction: row;
        /*margin-left: 10px;
        margin-right: 10px;*/
        flex: 1;
    }

    .itemBig:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    img {
        border-radius: 2px;
        margin-bottom: 20px;
    }

    h4 {
        margin: 0;
        font-size: 1em;
        min-width: 110px;
        text-align: center;
    }

    p {
        margin: 0;
        color: var(--font-darker);
        font-size: .9em;
    }

    .small {
        font-size: .6em;
        margin: auto;
        margin-left: 0;
        margin-bottom: 0;

        display: inline-block;
        max-width: calc(100% - 40px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: top
    }

    p.right {
        text-align: right;
    }

    p.progress {
        min-width: 60px;
    }

    .deleteIcon {
        font-size: 1em;
        margin: 0;
        margin-left: 10px;
    }

</style>

<style>

    a.match-score-team {
        display: flex;
        flex-direction: row;
        text-decoration: none;
        justify-content: space-between;
        align-items: center;
    }

    span.match-score-team__name {
        text-decoration: none;
        font-size: 1em;
    }

    a.match-score-team.match-score-team--home {
        flex-direction: row-reverse;
    }

    of-match-score-team {
        width: 100%;
    }

    span.match-score-team__name--away {
        text-align: right;
    }

    img.teamlogo {
        width: 29px;
        height: auto;
    }

    p.accent {
        color: var(--accent);
    }

    p.muted {
        color: var(--font-darker);
    }

    p.additional-result {
        margin: 0;
        font-size: .8em;
        max-width: 105px;
    }

    p.smaller {
        font-size: .6em;
    }

</style>

<style>
    p.team a {
        color: var(--font-darker);
    }

    p.team a:hover {
        color: var(--font-colour);
    }
</style>

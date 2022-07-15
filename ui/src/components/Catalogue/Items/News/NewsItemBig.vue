<template>
    <div class="itemBig">
        <div class="item" @click="redirect">
            <img v-if="image" :src="image" />
            <div class="wrapper">
                <h4>{{title}}</h4>
                <p v-html="summary" class="newsSummary" />
                <p class="small">{{`${updatedTimestamp}, ${source}`}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NewsItemBig',
        methods: {
            redirect() {
                //window.open(this.href)
                this.$router.push(this.href)
            }
        },
        computed: {
            updatedTimestamp() {
                const d = new Date(this.updated)

                const DAYS = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
                const MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

                return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()} ${d.getUTCHours()}.${d.getUTCMinutes()} GMT`
            }
        },
        props: {
            image: String,
            title: String,
            summary: String,
            href: String,
            updated: String,
            source: String
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
        border-radius: 20px;
        min-height: 15vh;
        margin: 10px;
    }

    .item {
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: calc(100% - 40px);
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }

    .itemBig:hover {
        cursor: pointer;
        background: var(--hover-1);
    }

    img {
        border-radius: 12px;
        margin-bottom: 20px;
    }

    h4 {
        margin: 0;
        font-size: 1em;
    }

    p {
        margin: 0;
        color: var(--font-darker);
        font-size: .9em;
        
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .small {
        font-size: .6em;
        margin: auto;
        margin-left: 0;
        margin-bottom: 0;
    }
</style>

<style>
    p.newsSummary a {
        color: var(--font-darker);
    }

    p.newsSummary a:hover {
        color: var(--font-colour);
    }
</style>

<template>
    <Card class="p-4 col-span-2 cursor-pointer" @click="redirect">
        <img v-if="image" :src="image" />
        <h4>{{title}}</h4>
        <p class="newsSummary" v-html="summary" />
        <p class="small">{{`${updatedTimestamp}, ${source}`}}</p>
    </Card>
</template>

<script>
import Card from "@/containers/Card.vue";

export default {
        name: 'NewsItemBig',
        components: {Card},
        methods: {
            redirect() {
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

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
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
        color: var(--fg-base-dk);
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
        color: var(--fg-base-dk);
    }

    p.newsSummary a:hover {
        color: var(--fg-base-dk);
    }

    font {
        display: none;
    }
</style>

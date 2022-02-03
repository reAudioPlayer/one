<template>
    <div class="statWrapper">
        <stat v-for="(stat, index) in homeStats" :key="index" :title="toTitleCase(stat.type)" :home="stat.value" :homePerc="stat.percent" :away="awayStats[index].value" :awayPerc="awayStats[index].percent" />
    </div>
</template>

<script>
import Stat from './Stat.vue'
export default {
    name: "Stats",
    components: {
        Stat
    },
    props: {
        homeStats: Array,
        awayStats: Array
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
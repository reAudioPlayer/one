<template>
    <div class="news">
        <div class="padding-20">
            <h1>Sports</h1>
        </div>
        <hr>
        <div class="padding-20">
            <p class="small">Supported urls: {{supportedSources.join("*, ")}} </p>
            <div class="addWrapper">
                <input @keyup="enterText" v-model="sourceToAdd" type="text">
                <span id="addToPlaylist" @click="tryAddSource" class="material-icons-outlined">add_circle</span>
            </div>
            <hr>
            <full-shelf v-for="sport in sports" :key="sport.sport" :heading="sport.sport">
                <football-item v-for="element in sport.items" :key="element.href" @remove="() => removeSource(element.href)" :competition="element.competition"
                    :team1="element.team1" :team2="element.team2" :result="element.result" :date="element.date"
                    :href="element.href" :progress="element.progress" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
    import FullShelf from '../Catalogue/FullShelf.vue'
    import FootballItem from '../Catalogue/Items/Sports/FootballItem.vue'
    export default {
        components: {
            FullShelf,
            FootballItem
        },
        name: 'Sports',
        data() {
            return {
                sports: [],
                watchMatches: [ ],
                sourceToAdd: "",
                supportedSources: [
                    "https://onefootball.com/en/team/",
                    "https://onefootball.com/en/match/",
                    "https://onefootball.com/en/competition/",
                    "https://www.cev.eu/match-centres/",
                    "https://championsleague.cev.eu/en/match-centres/"
                ]
            }
        },
        mounted() {
            this.watchMatches = JSON.parse(window.localStorage.getItem("sports.watchMatches")) || [ ]
            /*this.watchMatches = ["https://onefootball.com/en/team/benfica-147",
                "https://onefootball.com/en/team/sporting-cp-140",
                "https://onefootball.com/en/team/fc-porto-13",
                "https://onefootball.com/en/team/borussia-dortmund-155",
                "https://onefootball.com/en/team/atletico-madrid-3",
                "https://www.cev.eu/match-centres/2022-european-cups/cev-volleyball-cup-2022-women/ccw-51-uralochka-ntmk-ekaterinburg-v-eczacibasi-dynavit-istanbul/",
                "https://www.cev.eu/match-centres/2022-european-cups/cev-volleyball-challenge-cup-2022-men/chcm-60-narbonne-volley-v-sporting-cp-lisboa/",
                "https://championsleague.cev.eu/en/match-centres/cev-champions-league-volley-2022/men/clm-84-trentino-itas-v-as-cannes-dragons/"
            ]*/
            this.updateMatches()
        },
        methods: {
            removeSource(source) {
                console.log(source)
                this.watchMatches.splice(this.watchMatches.indexOf(source), 1)
                window.localStorage.setItem("sports.watchMatches", JSON.stringify(this.watchMatches))
            },
            tryAddSource() {
                for (const supportedSource of this.supportedSources)
                {
                    console.log(this.sourceToAdd, supportedSource)
                    if (this.sourceToAdd.startsWith(supportedSource))
                    {
                        this.addSource()
                        return
                    }
                }

                alert("unsupported source")
            },
            addSource() {
                this.watchMatches.push(this.sourceToAdd)
                window.localStorage.setItem("sports.watchMatches", JSON.stringify(this.watchMatches))
                this.sourceToAdd = ""
            },
            updateMatches() {
                fetch("http://localhost:1234/api/match", {
                        method: "POST",
                        body: JSON.stringify({
                            urls: this.watchMatches
                        })
                    }).then(x => x.json())
                    .then(entries => {
                        this.sports = [ ]
                        for (const entry of entries)
                        {
                            const i = this.sports.findIndex(x => x.sport == entry.sport)
                            if (i >= 0) {
                                this.sports[i].items.push(entry)
                            } else {
                                this.sports.push({
                                    sport: entry.sport,
                                    items: [ entry ]
                                })
                            }
                        }
                        for (const sport of this.sports)
                        {
                            console.log(sport)
                            sport.items.sort((a, b) => {
                                a.progress = a.progress.replace("Half time", "45'")
                                b.progress = b.progress.replace("Half time", "45'")
                                console.log(a.progress, b.progress)
                                if (a.progress.includes("'") && !b.progress.includes("'"))
                                {
                                    return -1
                                }
                                if (!a.progress.includes("'") && b.progress.includes("'"))
                                {
                                    return 1
                                }
                                if (a.progress.includes("'") && b.progress.includes("'"))
                                {
                                    const progA = Number(a.progress.replace("'", "").replace("+", ""))
                                    const progB = Number(b.progress.replace("'", "").replace("+", ""))
                                    return progA < progB ? -1 : progA == progB ? 0 : 1
                                }
                                if (a.progress.includes(":") && !b.progress.includes(":"))
                                {
                                    return -1
                                }
                                if (!a.progress.includes(":") && b.progress.includes(":"))
                                {
                                    return 1
                                }
                                if (a.progress.includes(":") && b.progress.includes(":"))
                                {
                                    const progA = Number(a.progress.replace(":", ""))
                                    const progB = Number(b.progress.replace(":", ""))
                                    return progA < progB ? -1 : progA == progB ? 0 : 1
                                }
                                if (a.progress.includes("/") && !b.progress.includes("/"))
                                {
                                    return -1
                                }
                                if (!a.progress.includes("/") && b.progress.includes("/"))
                                {
                                    return 1
                                }
                                if (a.progress.includes("/") && b.progress.includes("/"))
                                {
                                    const dateNA = Number(a.progress.split("/").reverse().join("").replace(" ", ""))
                                    const dateNB = Number(b.progress.split("/").reverse().join("").replace(" ", ""))
                                    return dateNA < dateNB ? -1 : dateNA == dateNB ? 0 : 1
                                }
                                if (a.progress.includes("Full time") && b.progress.includes("Full time"))
                                {
                                    const dateA = a.date
                                    const dateB = b.date
                                    console.log(dateA, dateB)
                                    if (dateA.includes("Today") && !dateB.includes("Today"))
                                    {
                                        return -1;
                                    }
                                    if (!dateA.includes("Today") && dateB.includes("Today"))
                                    {
                                        return 1;
                                    }
                                    if (dateA.includes("Yesterday") && !dateB.includes("Yesterday"))
                                    {
                                        return -1;
                                    }
                                    if (!dateA.includes("Yesterday") && dateB.includes("Yesterday"))
                                    {
                                        return 1;
                                    }
                                    const dateNA = Number(dateA.split(" ")[0].split("/").reverse().join("").replace(" ", ""))
                                    const dateNB = Number(dateB.split(" ")[0].split("/").reverse().join("").replace(" ", ""))
                                    console.log(dateA, dateB, dateNA, dateNB)
                                    return dateNA > dateNB ? -1 : dateNA == dateNB ? 0 : 1
                                }
                            })
                        }
                    })
                setTimeout(this.updateMatches, 1000 * 30)
            }
        }
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }

    h1 {
        margin-left: 10px;
    }

    #addToPlaylist {
        cursor: pointer;
        font-size: 60px;
        margin-bottom: 20px;
        width: 70px;
        line-height: 70px;
        text-align: center;
        align-items: center;
        vertical-align: middle;
    }

    #addToPlaylist:hover {
        cursor: pointer;
        font-size: 62px;
    }

    input {
        margin-left: 10px;
        margin-bottom: 20px;
        border-radius: 40px;
        border: none;
        padding: 10px;
        font-family: var(--font-family);
        width: 20vw;
        color: var(--font-contrast);
        background-color: var(--font-colour);
    }

    input:focus {
        outline: none;
    }

    .addWrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    p.small {
        color: var(--font-darker);
        font-size: .8em;
        margin: 0 10px;
    }
</style>
<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="news">
        <div class="padding-20">
            <h1>Sports</h1>
        </div>
        <hr />
        <div class="padding-20">
            <p class="small">
                Supported urls: {{ supportedSources.join("*, ") }}
            </p>
            <div class="addWrapper">
                <TextInputWithIcon
                    v-model="sourceToAdd"
                    icon="link"
                    @keyup="enterText"
                />
                <span
                    id="addToPlaylist"
                    class="material-icons-outlined"
                    @click="tryAddSource"
                    >add_circle</span
                >
            </div>
            <hr />
            <full-shelf
                v-for="(sport, sportIndex) in sports"
                :key="sport.sport"
                :heading="sport.sport"
                :icon="sport.icon"
            >
                <football-item
                    v-for="(element, matchIndex) in sport.items"
                    :key="element.href"
                    :competition="element.competition"
                    :date="element.date"
                    :href="element.href"
                    :oref="element.oref"
                    :progress="element.progress"
                    :result="element.result"
                    :team1="element.team1"
                    :team2="element.team2"
                    @remove="
                        () => removeSource(element.sref, sportIndex, matchIndex)
                    "
                />
            </full-shelf>
            <full-shelf
                v-if="volleyMatches.length"
                heading="Volleyball"
                icon="sports_volleyball"
            >
                <div
                    v-for="(match, index) in volleyMatches"
                    :key="index"
                    class="wrapIframe"
                >
                    <iframe
                        :src="`https://cev-nex.tk/#/embed?match=${match.src}`"
                    />
                    <span
                        class="deleteIcon small material-symbols-rounded"
                        @click="() => removeSourceD(match.ref)"
                        >clear</span
                    >
                </div>
            </full-shelf>
        </div>
    </div>
</template>

<script>
import FullShelf from "../components/catalogue/FullShelf.vue";
import FootballItem from "../components/catalogue/Items/Sports/FootballItem.vue";
import TextInputWithIcon from "@/components/inputs/TextInputWithIcon.vue";
import { Notifications } from "@/components/notifications/createNotification";

export default {
    components: {
        TextInputWithIcon,
        FullShelf,
        FootballItem,
    },
    name: "Sports",
    data() {
        return {
            sports: [],
            watchMatches: [],
            sourceToAdd: "",
            supportedSources: [
                "https://onefootball.com/en/team/",
                "https://onefootball.com/en/match/",
                "https://onefootball.com/en/competition/",
                "https://www.cev.eu/match-centres/",
                "https://championsleague.cev.eu/en/match-centres/",
                "https://www.cev.eu/calendar/",
                "https://cev-nex.tk/#/match/",
                "https://cevnex.tk/#/match/",
            ],
        };
    },
    mounted() {
        this.watchMatches =
            JSON.parse(window.localStorage.getItem("sports.watchMatches")) ||
            [];
        this.updateMatches();
    },
    computed: {
        volleyMatches() {
            return this.watchMatches
                .filter((match) => match.includes("cev"))
                .map((match) => {
                    let trueValue = match;
                    if (match.includes("nex.tk")) {
                        trueValue = match.split("/match/")[1];
                    }
                    return {
                        src: trueValue,
                        ref: match,
                    };
                });
        },
        notVolleyMatches() {
            return this.watchMatches.filter((match) => !match.includes("cev"));
        },
    },
    methods: {
        removeSource(source, sportIndex, matchIndex) {
            this.watchMatches.splice(this.watchMatches.indexOf(source), 1);
            this.sports[sportIndex].items.splice(matchIndex, 1);
            window.localStorage.setItem(
                "sports.watchMatches",
                JSON.stringify(this.watchMatches)
            );
        },
        removeSourceD(source) {
            this.watchMatches.splice(this.watchMatches.indexOf(source), 1);
            window.localStorage.setItem(
                "sports.watchMatches",
                JSON.stringify(this.watchMatches)
            );
        },
        tryAddSource() {
            for (const supportedSource of this.supportedSources) {
                if (this.sourceToAdd.startsWith(supportedSource)) {
                    this.addSource();
                    return;
                }
            }

            Notifications.addError("unsupported source");
        },
        addSource() {
            this.watchMatches.push(this.sourceToAdd);
            window.localStorage.setItem(
                "sports.watchMatches",
                JSON.stringify(this.watchMatches)
            );
            this.sourceToAdd = "";
        },
        updateMatches() {
            if (
                !(
                    this.$route.path == "/sports" ||
                    this.$route.path == "/sports/"
                )
            ) {
                return;
            }

            fetch("/api/sports", {
                method: "POST",
                body: JSON.stringify({
                    urls: this.notVolleyMatches,
                }),
            })
                .then((x) => x.json())
                .then((entries) => {
                    this.sports = [];
                    for (const entry of entries) {
                        const i = this.sports.findIndex(
                            (x) => x.sport == entry.sport
                        );
                        if (i >= 0) {
                            this.sports[i].items.push(entry);
                        } else {
                            this.sports.push({
                                sport: entry.sport,
                                icon: entry.sportIcon,
                                items: [entry],
                            });
                        }
                    }
                    for (const sport of this.sports) {
                        sport.items.sort((a, b) => {
                            a.progress = a.progress.replace("Half time", "45'");
                            b.progress = b.progress.replace("Half time", "45'");

                            if (
                                a.progress.includes("Pens") ||
                                a.progress.includes("N/A")
                            ) {
                                a.progress = "Full time";
                            }

                            if (
                                b.progress.includes("Pens") ||
                                b.progress.includes("N/A")
                            ) {
                                b.progress = "Full time";
                            }

                            if (
                                a.progress.includes("'") &&
                                !b.progress.includes("'")
                            ) {
                                return -1;
                            }
                            if (
                                !a.progress.includes("'") &&
                                b.progress.includes("'")
                            ) {
                                return 1;
                            }
                            if (
                                a.progress.includes("'") &&
                                b.progress.includes("'")
                            ) {
                                const progA = Number(
                                    a.progress.replace("'", "").replace("+", "")
                                );
                                const progB = Number(
                                    b.progress.replace("'", "").replace("+", "")
                                );
                                return progA < progB
                                    ? -1
                                    : progA == progB
                                    ? 0
                                    : 1;
                            }

                            let datesA = a.date.split(" ")[0];
                            let datesB = b.date.split(" ")[0];

                            let timeA = a.progress
                                .replace("'", "")
                                .replace("Full time", "24:00")
                                .replace(" ", "");
                            let timeB = b.progress
                                .replace("'", "")
                                .replace("Full time", "24:00")
                                .replace(" ", "");

                            let todayDate = new Date();
                            let tomorrowDate = new Date();
                            tomorrowDate.setUTCDate(todayDate.getUTCDate() + 1);
                            let yesterdayDate = new Date();
                            yesterdayDate.setUTCDate(
                                todayDate.getUTCDate() - 1
                            );

                            const getDate = (date) =>
                                date.toISOString().split("T")[0];

                            datesA = datesA
                                .replace("Today", getDate(todayDate))
                                .split("/")
                                .reverse()
                                .join("-");
                            datesA = datesA
                                .replace("Tomorrow", getDate(tomorrowDate))
                                .split("/")
                                .reverse()
                                .join("-");
                            datesA = datesA
                                .replace("Yesterday", getDate(yesterdayDate))
                                .split("/")
                                .reverse()
                                .join("-");

                            datesB = datesB
                                .replace("Today", getDate(todayDate))
                                .split("/")
                                .reverse()
                                .join("-");
                            datesB = datesB
                                .replace("Tomorrow", getDate(tomorrowDate))
                                .split("/")
                                .reverse()
                                .join("-");
                            datesB = datesB
                                .replace("Yesterday", getDate(yesterdayDate))
                                .split("/")
                                .reverse()
                                .join("-");

                            let dateA = new Date(
                                `${datesA}T${timeA}`.replace(" ", "")
                            );
                            let dateB = new Date(
                                `${datesB}T${timeB}`.replace(" ", "")
                            );
                            return dateA > dateB ? -1 : dateA == dateB ? 0 : 1;
                        });
                    }
                });

            setTimeout(this.updateMatches, 1000 * 45);
        },
    },
};
</script>

<style lang="scss" scoped>
.padding-20 {
    padding: 20px;
}

h1 {
    margin-left: 10px;
}

#addToPlaylist {
    cursor: pointer;
    font-size: 60px;
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
    margin-bottom: 1em;
}

p.small {
    color: var(--font-darker);
    font-size: 0.8em;
    margin: 0 10px;

    a {
        color: var(--font-darker);

        &:hover {
            color: var(--font-colour);
        }
    }
}

iframe {
    border: none;
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: 20px;
}

.wrapIframe {
    grid-column: span 2;
    position: relative;

    .deleteIcon {
        position: absolute;
        bottom: calc(10px + 20px);
        right: calc(10px + 20px);

        &:hover {
            cursor: pointer;
        }
    }

    iframe {
        border: var(--border-container);
    }
}
</style>

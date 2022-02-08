<template>
    <div v-if="match.competition" class="volleyMatch">
        <div class="competitionWrapper">
            <div class="competitionDetailsWrapper">
                <h1>{{match.competition?.name}}</h1>
                <h4 v-html="getDuration(match?.duration)"/>
            </div>
            <div class="competitionDetailsWrapper">
                <h4>{{match.competition?.gender}} ({{match.competition?.matchNumber || "N/A"}})</h4>
                <h4 v-if="match.competition?.phase && match.competition?.groupPool && match.competition?.leg">{{match.competition?.phase}} - {{match.competition?.groupPool}} - {{match.competition?.leg}}</h4>
            </div>
        </div>
        <div class="resultWrapper">
            <div class="team homeTeam">
                <p class="teamName">{{match.homeTeam?.name}}</p>
                <img :src="match.homeTeam?.logo" />
            </div>
            <div class="result">
                <h1>{{match.currentScore?.homeScore}}</h1>
                <div class="setWrapper">
                    <p class="set" v-for="set in match.currentScore?.regularSets" :key="set.setNumber">({{set.homeScore}} - {{set.awayScore}})</p>
                    <p class="set golden" v-if="match.currentScore?.hasGoldenSet">({{match.currentScore.goldenSet.homeScore}} - {{match.currentScore.goldenSet.awayScore}})</p>
                </div>
                <h1>{{match.currentScore?.awayScore}}</h1>
            </div>
            <div class="team awayTeam">
                <img :src="match.awayTeam?.logo" />
                <p class="teamName">{{match.awayTeam?.name}}</p>
            </div>
        </div>
        <hr v-if="match.playByPlay">
        <div class="partialButtonsWrapper sideMargin20">
            <button @click="showPlayByPlaySet = index" v-for="(set, index) in match.playByPlay?.sets" :key="index" class="partial" :class="{ 'active': showPlayByPlaySet == index }">Set {{set.setNumber}}</button>
        </div>
        <div v-if="match.playByPlay" class="playByPlayWrapper">
            <div v-if="!showMore">
                <ul>
                    <li v-for="(play, index) in match.playByPlay?.sets[showPlayByPlaySet].plays.slice(0, 5)" :key="index" class="playWrapper">
                        <div class="play">
                            <div class="homePlay" v-if="play.isHome">
                                <play :name="play.playerName" :type="play.type" :home="true" />
                            </div>
                        </div>
                        <div class="playScore">{{play.currentScore.homeScore}}-{{play.currentScore.awayScore}}</div>
                        <div class="play">
                            <div class="awayPlay" v-if="!play.isHome">
                                <play :name="play.playerName" :type="play.type" :home="false" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div> 
            <div v-else>
                <ul>
                    <li v-for="(play, index) in match.playByPlay?.sets[showPlayByPlaySet].plays" :key="index" class="playWrapper">
                        <div class="play">
                            <div class="homePlay" v-if="play.isHome">
                                <play :name="play.playerName" :type="play.type" :home="true" />
                            </div>
                        </div>
                        <div class="playScore">{{play.currentScore.homeScore}}-{{play.currentScore.awayScore}}</div>
                        <div class="play">
                            <div class="awayPlay" v-if="!play.isHome">
                                <play :name="play.playerName" :type="play.type" :home="false" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="match.playByPlay" class="playByPlayButtonWrapper">
            <button @click="showMore = !showMore" class="negative">{{showMore ? "Show fewer events" : "Show all match events"}}</button>
        </div>
        <hr>
        <div class="teamAndMore">
            <div v-if="match.homeTeam?.players?.length || match.awayTeam?.players?.length" class="lineup">
                <h3>Lineups</h3>
                <div class="partialButtonsWrapper">
                    <button @click="showAwayLineup = false" class="partial" :class="{ 'active': !showAwayLineup }">{{match.homeTeam.name}}</button>
                    <button @click="showAwayLineup = true" class="partial" :class="{ 'active': showAwayLineup }">{{match.awayTeam.name}}</button>
                </div>
                <team :players="showAwayLineup ? match.awayTeam.players : match.homeTeam.players" />
            </div>
            <div class="more">
                <div v-if="match.homeTeam?.poll?.percent" class="moreContainer statistics">
                    <h3>Who will win?</h3>
                    <br>
                    <stat :homePerc="match.homeTeam?.poll?.percent" :home="match.homeTeam?.poll?.percent + '%'" :awayPerc="match.awayTeam?.poll?.percent" :away="match.awayTeam?.poll?.percent + '%'" />
                    <br>
                    <div class="centreAlign">Based on {{match.homeTeam?.poll?.count + match.awayTeam?.poll?.count}} predictions</div>
                </div>
                <div class="moreContainer matchInfo">
                    <h3>Match info</h3>
                    <div class="info">
                        <div class="infoImg">
                            <img :src="match.competition?.logo"/>
                        </div>
                        <div class="infoText">
                            <p><b>Competition</b></p>
                            <p>{{match.competition?.name}}</p>
                        </div>
                    </div>
                    <div class="info">
                        <div class="infoImg">
                            <span class="material-icons-round">schedule</span>
                        </div>
                        <div class="infoText">
                            <p><b>Start time</b></p>
                            <p>{{match.startTime}}</p>
                        </div>
                    </div>
                    <div class="info">
                        <div class="infoImg">
                            <span class="material-icons-round">stadium</span>
                        </div>
                        <div class="infoText">
                            <p><b>Venue</b></p>
                            <p>{{match.venue}}</p>
                        </div>
                    </div>
                </div>
                <div v-if="match.homeTeam?.stats?.setStats?.length" class="moreContainer statistics">
                    <h3>Live Statistics</h3>
                    <stats :homeStats="match.homeTeam?.stats?.setStats.find(x => x.name == 'Match')?.stats" :awayStats="match.awayTeam.stats.setStats.find(x => x.name == 'Match')?.stats" />
                </div>
            </div>
        </div>
        <hr v-if="match.gallery.length">
        <div v-if="match.gallery.length" class="gallery">
            <h3>Gallery</h3>
            <full-shelf v-if="showFullGallery">
                <div class="imgWrapper" v-for="img in match.gallery.filter(x => x.includes('NormalSize'))" :key="img">
                    <img :src="'https://' + img"/>
                </div>
            </full-shelf>
            <full-shelf v-else>
                <div class="imgWrapper" v-for="img in match.gallery.filter(x => x.includes('NormalSize')).slice(0, 4)" :key="img">
                    <img :src="'https://' + img"/>
                </div>
            </full-shelf>
            <div class="playByPlayButtonWrapper">
                <button @click="showFullGallery = !showFullGallery" class="negative">{{showFullGallery ? "Show fewer images" : "Show all images"}}</button>
            </div>
            <p class="small">
            <b>Disclaimer</b><br>
            Photos featured on the CEV Photo Galleries are downloadable copyright free for media purposes only and only if CEV is credited as the source material. They are protected by copyright for all other commercial purposes. Those wishing to use CEV Photo Gallery photos for other commercial purposes should contact press@cev.eu
            </p>
        </div>
        <hr v-if="match.report">
        <h3 v-if="match.report">Report</h3>
        <div v-if="match.report" class="teamAndMore">
            <div v-if="match.report.headline || match.report.body || match.report.quotes.length" class="lineup">
                <h4 class="accent">{{match.report.headline}}</h4>
                <p>{{match.report.body}}</p>
                <div class="moreContainer quote" v-for="(quote, index) in match.report.quotes" :key="index">
                    <p>{{quote.quote}}</p>
                    <p class="small">{{quote.cite}} ({{quote.citeDescription}})</p>
                </div>
            </div>
            <div class="more">
                <div v-for="(item, index) in match.report.inNumbers" :key="index" class="moreContainer statistics">
                    <h3>{{item.value}}</h3>
                    <h5 class="accent">{{item.title}}</h5>
                    <p class="small">{{item.description}}</p>
                </div>
            </div>
        </div>
        <hr v-if="match.topPlayers.topPlayers.length">
        <h3 v-if="match.topPlayers.topPlayers.length">Top players</h3>
        <full-shelf-small-grid v-if="match.topPlayers.topPlayers.length">
            <div v-for="(players, index) in match.topPlayers.topPlayers" :key="index" class="topPlayersWrapper">
                <p><b>{{toTitleCase(players.type)}}</b></p>
                <p v-for="player in players?.players" :key="player?.number"><span class="accent">{{player.score}}</span> {{player.name}} <span class="small muted">({{player.nationality}})</span></p>
            </div>
        </full-shelf-small-grid>
        <a class="small" :href="match.matchCentreLink">{{match.matchCentreLink}}</a>
    </div>
</template>

<script>
import FullShelf from '../Catalogue/FullShelf.vue'
import FullShelfSmallGrid from '../Catalogue/FullShelfSmallGrid.vue'
import Play from '../VolleyMatch/Play.vue'
import Stat from '../VolleyMatch/Stat.vue'
import Stats from '../VolleyMatch/Stats.vue'
import Team from '../VolleyMatch/Team.vue'

export default {
    components: { Play, Stats, Stat, Team, FullShelf, FullShelfSmallGrid },
    name: "VolleyMatch",
    mounted() {
        this.updateData()
    },
    data() {
        return {
            match: { },
            showMore: false,
            showAwayLineup: false,
            showPlayByPlaySet: 0,
            showFullGallery: false
        }
    },
    methods: {
        updateData() {
            if (!this.$route.path.includes("/sports/volley") || this.match?.state == "finished")
            {
                console.log("not update", this.$route.path)
                return
            }

            const ctx = this

            fetch(`http://localhost:1234/api/match/volley/${this.$route.params.id}`)
                .then(async x => {
                    if (x.status == 400)
                    {
                        window.open(await x.text())
                        this.$router.push("/sports")
                        return
                    }
                    ctx.match = await x.json()
                })

            setTimeout(this.updateData, 1000 * 45)
        },
        getDuration()
        {
            if (this.match.state == "live")
            {
                const dur = this.match.duration
                return "<span style='color: var(--accent)'>" + Number(Number(dur.split(":")[0]) * 60 + Number(dur.split(":")[1])) + "'</span>"
            }
            if (this.match.state == "upcoming")
            {
                const start = this.match.startTime
                return start.split(" ")[0].split("-").reverse().join("/")
            }
            return "Full time"
        },
        toTitleCase(text)
        {
            const result = text.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
    }
}
</script>

<style scoped>

    .teamName {
        font-size: 1.3em;
    }

    .accent {
        color: var(--accent);
    }

    h5.accent {
        margin: 0;
    }

    p.small, a.small {
        font-size: .7em;
        margin: 0;
    }

    a {
        color: var(--font-colour);
    }

    a:hover {
        cursor: pointer;
    }

    span.small.muted {
        font-size: .7em;
        color: var(--font-darker);
    }

    .topPlayersWrapper {
        grid-column: span 2;
        padding: 20px;
        margin: 10px;
        background: var(--background-light);
        border-radius: 10px;
    }

    .imgWrapper {
        grid-column: span 2;
        padding: 10px;
    }

    .imgWrapper img {
        width: 100%;
        border-radius: 10px;
    }

    .partialButtonsWrapper {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }

    .partialButtonsWrapper button {
        flex: 1;
    }

    hr {
        margin: 20px 0px;
    }

    .centreAlign {
        text-align: center;
    }

    .info {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .infoText p {
        margin: 0;
        margin-left: 20px;
    }

    .info .infoImg img {
        width: 60px;
    }

    .info .infoImg {
        width: 60px;
        text-align: center;
    }

    .teamAndMore {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
    }

    .lineup {
        flex: 2;
        justify-content: flex-start;
        margin-right: 20px;
    }

    .more {
        flex: 1;
    }

    .moreContainer {
        background: var(--background-light);
        border-radius: 10px;
        padding: 20px;
    }

    .moreContainer:not(:last-child) {
        margin-bottom: 20px;
    }

    .playByPlayButtonWrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    button {
        color: var(--font-contrast);
        background-color: var(--font-colour);
        border: none;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 10px 20px;
        font-family: var(--font-family);
        font-weight: bold;
    }

    button.partial {
        border-radius: 0;
        color: var(--font-colour);
        background: none;
        border-bottom: 1px solid var(--font-colour);
    }

    button.partial.active {
        border-color: var(--accent);
        color: var(--accent);
    }

    button:hover {
        cursor: pointer;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .play {
        width: 300px;
    }

    .awayPlay, .homePlay {
        background: var(--background-light);
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: center;
        align-items: center;
    }

    .playByPlayWrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .playScore {
        width: 70px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    li:not(:last-child):after {
        content: "";
        position: relative;
        transform: translateX(-335px) translateY(40px);
        width: 2px;
        margin: 10px 0px;
        background-color: var(--font-darker);
    }

    .playWrapper {
        display: flex;
        flex-direction: row;
        margin: 20px 0;
    }

    .volleyMatch {
        padding: 20px;
    }

    .competitionDetailsWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .resultWrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .setWrapper {
        display: flex;
        flex-direction: column;
        width: 100px;
        justify-content: center;
    }

    .result {
        width: 200px;
        margin: 0px 40px;
        font-size: 2.5em;
        text-align: center;
        display: flex;
        flex-direction: row;
    }

    .result .set {
        font-size: .3em;
        margin: 0;
    }

    .set.golden {
        color: var(--accent);
        margin-top: 10px;
        font-size: .5em;
    }

    .result h1 {
        margin: auto;
    }

    .team {
        width: 400px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .awayTeam {
        justify-content: flex-start;
    }

    .team > img {
        width: auto;
        height: 50px;
        margin: 0px 10px;
    }

    h1 {
        margin-bottom: 0;
    }

    .sideMargin20 {
        margin-right: 20px;
        margin-left: 20px;
    }

</style>

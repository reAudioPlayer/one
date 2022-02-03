<template>
    <div class="teamWrapper">
        <div class="upperZones">
            <div class="zone">
                <p><b>{{players.find(x => x.zone == "4")?.number}}. {{players.find(x => x.zone == "4")?.name}}</b></p>
                <p>{{toTitleCase(players.find(x => x.zone == "4")?.position)}}</p>
            </div>
            <div class="zone">
                <p><b>{{players.find(x => x.zone == "3")?.number}}. {{players.find(x => x.zone == "3")?.name}}</b></p>
                <p>{{toTitleCase(players.find(x => x.zone == "3")?.position)}}</p>
            </div>
            <div class="zone">
                <p><b>{{players.find(x => x.zone == "2")?.number}}. {{players.find(x => x.zone == "2")?.name}}</b></p>
                <p>{{toTitleCase(players.find(x => x.zone == "2")?.position)}}</p>
            </div>
        </div>
        <div class="lowerZones">
            <div class="zone">
                <p><b>{{players.find(x => x.zone == "5")?.number}}. {{players.find(x => x.zone == "5")?.name}}</b></p>
                <p>{{toTitleCase(players.find(x => x.zone == "5")?.position)}}</p>
            </div>
            <div class="zone">
                <p><b>{{players.find(x => x.zone == "6")?.number}}. {{players.find(x => x.zone == "6")?.name}}</b></p>
                <p>{{toTitleCase(players.find(x => x.zone == "6")?.position)}}</p>
            </div>
            <div class="zone">
                <p><b>{{players.find(x => x.zone == "1")?.number}}. {{players.find(x => x.zone == "1")?.name}}</b></p>
                <p>{{toTitleCase(players.find(x => x.zone == "1")?.position)}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        players: Array
    },
    methods: {
        toTitleCase(text)
        {
            if (!text)
            {
                return text
            }

            const result = text.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
    }
}
</script>

<style scoped>
    .teamWrapper {
        background: var(--background-light);
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        height: 400px;
    }

    .upperZones, .lowerZones {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    p {
        margin: 0;
    }

    .zone {
        flex: 1;
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    
</style>

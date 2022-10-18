export const connect = ($store) => {
    console.log("attempting reconnect")
    let ws = new WebSocket('ws://localhost:1234/ws');

    ws.onclose = () => {
        console.log("ws closed")

        setTimeout(connect, 1000);
    }

    ws.onopen = () => {
        console.log("ws connected")
    }

    ws.onmessage = msg => {
        const jdata = JSON.parse(msg.data);

        if (jdata.path == "player.song") {
            $store.commit("player/setSong", jdata.data);
        }

        if (jdata.path == "player.playlist") {
            $store.commit("player/setPlaylist", jdata.data);
        }

        // TODO only if NOT play in browser
        return

        if (jdata.path == "player.playState") {
            $store.commit("player/setPlaying", jdata.data);
        }

        if (jdata.path == "player.posSync") {
            $store.commit("player/setProgress", jdata.data);
        }
    }
}

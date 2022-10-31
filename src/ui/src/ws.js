import {usePlayerStore} from "@/store/player";

export const connect = () => {
    console.log("attempting reconnect")
    let ws = new WebSocket('ws://localhost:1234/ws');

    ws.onclose = () => {
        console.log("ws closed")

        setTimeout(() => connect(), 1000);
    }

    ws.onopen = () => {
        console.log("ws connected")
    }

    ws.onmessage = msg => {
        const player = usePlayerStore();
        const jdata = JSON.parse(msg.data);

        if (jdata.path == "player.song") {
            player.setSong(jdata.data);
        }

        if (jdata.path == "player.playlist") {
            player.setPlaylist(jdata.data);
        }

        // TODO only if NOT play in browser
        return

        if (jdata.path == "player.playState") {
            player.setPlaying(jdata.data);
        }

        if (jdata.path == "player.posSync") {
            player.setProgress(jdata.data);
        }
    }
}

import {usePlayerStore} from "@/store/player";
import {useSettingsStore} from "@/store/settings";

export const connect = () => {
    console.log("attempting reconnect")
    let ws = new WebSocket('ws://localhost:1234/ws');

    ws.onclose = () => {
        console.log("ws closed")
        usePlayerStore().setReady(false);

        setTimeout(() => connect(), 1000);
    }

    ws.onopen = () => {
        console.log("ws connected")
        usePlayerStore().setReady(true);
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
    }
}

/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { usePlayerStore } from "@/store/player";
import { useSettingsStore } from "@/store/settings";

export const connect = () => {
    console.log("attempting reconnect")
    const host = window.location.hostname;
    const port = window.location.port == 5173 ? 1234 : window.location.port
    const ws = new WebSocket(`ws://${host}:${port}/ws`);

    ws.onclose = () => {
        console.log("[main] ws closed")
        usePlayerStore().setReady(false);

        setTimeout(() => connect(), 1000);
    }

    ws.onopen = () => {
        console.log("[main] ws connected")
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

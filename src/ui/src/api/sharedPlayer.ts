/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import {Playable, RepeatType, usePlayerStore} from "../store/player";
import {Ref, ref} from "vue";

export type IConnectionType = "player" | "client";
export interface IPlayer {
    type: IConnectionType;
    id: string;
    friendlyName: string;
}

export const SharedPlayer = class implements Playable {
    ws?: WebSocket = null;
    connections: Ref<IPlayer[]> = ref([]);
    player?: IPlayer = null;
    me?: IPlayer = null;
    sendInfoTask?: number = null;

    constructor() {
        this.connect();
    }

    connect() {
        console.log("attempting reconnect")
        const host = window.location.hostname;
        const port = window.location.port == "5173" ? 1234 : window.location.port
        this.ws = new WebSocket(`ws://${host}:${port}/player/ws`);
        const playerStore = usePlayerStore();
        if (this.sendInfoTask) {
            clearInterval(this.sendInfoTask);
        }
        this.sendInfoTask = setInterval(() => this.sendInfo(), 300);

        this.ws.onclose = () => {
            console.log("disconnected")
            setTimeout(() => this.connect(), 1000);
        }

        this.ws.onopen = () => {
            console.log("connected")
        }

        const handleCommand = (data: any) => {
            if (typeof data === "string") {
                switch (data) {
                    case "play":
                        playerStore.play();
                        break;
                    case "pause":
                        playerStore.pause();
                        break;
                }
            }
            if (typeof data === "object") {
                switch (data.command) {
                    case "seek":
                        playerStore.seek(data.time);
                        break;
                    case "set volume":
                        playerStore.setVolume(data.volume);
                        break;
                    case "set repeat":
                        playerStore.setRepeat(data.repeat);
                        break;
                    case "set mute":
                        playerStore.setMute(data.mute);
                        break;
                }
            }
        }

        this.ws.onmessage = msg => {
            msg = JSON.parse(msg.data);
            const type = msg.type;

            switch (type) {
                case "info":
                    if (typeof msg.data === "boolean") return;

                    playerStore.playing = msg.data.playing;
                    playerStore.progress = msg.data.progress;
                    playerStore.volume = msg.data.volume;
                    playerStore.repeat = msg.data.repeat;
                    break;
                case "new client":
                    console.log("new client", msg.data);
                    break;
                case "client disconnected":
                    break;
                case "player disconnected":
                    break;
                case "connections":
                    this.updateConnections(msg.data);
                    break;
                case "command":
                    handleCommand(msg.data);
                    break;
            }
        }
    }

    sendInfo() {
        if (this.me?.type?.toLowerCase() !== "player") return;

        const playerStore = usePlayerStore();
        const data = {
            playing: playerStore.playing,
            progress: playerStore.progress,
            volume: playerStore.volume,
            repeat: playerStore.repeat,
        }
        this.send("info", data);
    }

    updateConnections(connections: IPlayer[]) {
        this.connections.value = connections;
        this.me = connections.find(c => c.friendlyName.includes("(You)"));
    }

    send(type: string, data: any) {
        this.ws?.send(JSON.stringify({
            type,
            data
        }));
    }

    sendCommand(data: any) {
        this.send("command", data);
    }

    setPlayer(player: IPlayer) {
        this.send("set player", player.id);
    }

    makeMePlayer() {
        this.send("type", "Player");
    }

    /** Playable interface **/
    play() {
        this.sendCommand("play");
    }

    pause() {
        this.sendCommand("pause");
    }

    seek(time: number) {
        this.sendCommand({
            command: "seek",
            time,
        });
    }

    setVolume(volume: number) {
        this.sendCommand({
            command: "set volume",
            volume,
        });
    }

    setRepeat(repeat: RepeatType) {
        this.sendCommand({
            command: "set repeat",
            repeat,
        });
    }

    setMute(mute: boolean): void {
        this.sendCommand({
            command: "set mute",
            mute,
        });
    }
}

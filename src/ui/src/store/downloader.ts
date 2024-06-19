/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineStore } from "pinia";

import { ISong } from "../common";
import { useRouter } from "vue-router";
import { getWsOrigin } from "@/ws";

export interface IStatus {
    id: number;
    status: "downloading" | "finished" | "downloaded" | "error" | "pending";
    internal: boolean;
    song: ISong;
}

export type States = Record<number, IStatus>;

// Create a new store instance.
export const useDownloaderStore = defineStore({
    id: "downloader",
    state: () => ({
        ws: null as WebSocket | null,
        states: {} as States,
        onDownload: [] as ((songId: number) => void)[],
        prefill: null as ISong | null,
    }),
    getters: {
        empty() {
            return Object.keys(this.states).length === 0;
        },
    },
    actions: {
        _fireDownload(songId: number) {
            this.onDownload.forEach((cb) => cb(songId));
        },
        initialise() {
            const connect = () => {
                console.log("[downloader] attempting reconnect");
                this.ws = new WebSocket(getWsOrigin() + "/download/ws");

                this.ws.onclose = () => {
                    console.log("[downloader] ws closed");

                    setTimeout(() => connect(), 1000);
                };

                this.ws.onopen = () => {
                    console.log("[downloader] ws connected");
                };

                this.ws.onmessage = (msg) => {
                    const data = JSON.parse(msg.data) as IStatus;

                    if (data.status == "finished") {
                        this.states[data.song.id] = {
                            ...this.states[data.song.id],
                            ...data,
                        };
                        return;
                    }

                    this.states[data.song.id] = data;
                };
            };

            connect();
        },
        send(msg: any) {
            this.ws?.send(JSON.stringify(msg));
        },
        downloadFromDb(songId: number) {
            this.send({
                action: "download",
                source: "db",
                songId,
            });
            this.states[songId] = {
                songId,
                status: "pending",
            };
            this._fireDownload(songId);
        },
        downloadViaDownloader(song: ISong) {
            this.prefill = song;
            const router = useRouter();
            router.push("/download");
        },
        downloadOther(song: ISong) {
            this.send({
                action: "download",
                source: "other",
                ...song,
            });
            this.states[song.id] = {
                songId: song.id,
                status: "pending",
            };
            this._fireDownload(song.id);
        },
        download(songId) {
            window.open(
                `/api/tracks/${songId}/download`,
                "_blank",
                "noopener noreferrer"
            );
            this.states[songId].status = "downloaded";
        },
        isSongDownloading(songId: number) {
            const state = this.states[songId];
            if (!state?.internal) {
                return false;
            }
            return state.status === "downloading";
        },
    },
});

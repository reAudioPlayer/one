/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineStore } from "pinia";

import { ISong } from "../common";
import { downloadSong } from "../api/song";

export interface IStatus {
    songId: number;
    filename: string;
    status: "downloading" | "finished" | "downloaded" | "error" | "pending";
    downloaded: number;
    total: number;
    percent: number;
    speed: string;
    elapsed: string;
    eta: number;
    action?: string;
    song?: ISong;
    chunk?: string;
    internal: boolean;
}

export type States = Record<number, IStatus>;

// Create a new store instance.
export const useDownloaderStore = defineStore({
    id: "downloader",
    state: () => ({
        ws: null as WebSocket | null,
        states: {} as States,
        onDownload: [] as ((songId: number) => void)[],
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
                const host = window.location.hostname;
                const port =
                    window.location.port === "5173"
                        ? 1234
                        : window.location.port;
                this.ws = new WebSocket(`ws://${host}:${port}/download/ws`);

                this.ws.onclose = () => {
                    console.log("[downloader] ws closed");

                    setTimeout(() => connect(), 1000);
                };

                this.ws.onopen = () => {
                    console.log("[downloader] ws connected");
                };

                this.ws.onmessage = (msg) => {
                    const data = JSON.parse(msg.data) as IStatus;

                    if (data.action) {
                        return;
                    }

                    if (data.status == "finished") {
                        this.states[data.songId] = {
                            ...this.states[data.songId],
                            ...data,
                        };
                        return;
                    }

                    this.states[data.songId] = data;
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

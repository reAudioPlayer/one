/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { useDataStore } from "../store/data";
import { usePlayerStore } from "../store/player";

export const nextSong = () => {
    fetch("/api/player/next");
};

export const prevSong = () => {
    fetch("/api/player/previous");
};

export const setShuffle = (shuffle: boolean) => {
    fetch(`/api/player/shuffle`, {
        method: "POST",
        body: JSON.stringify(shuffle),
    });
};

export const getShuffle = () => {
    return fetch("/api/player/shuffle").then((res) => res.json());
};

export const insertNext = async (songId: number) => {
    const player = usePlayerStore();

    await fetch("/api/player/queue", {
        method: "PUT",
        body: JSON.stringify({
            id: songId,
            at: player.queue.findIndex((song) => song.id == player.song.id) + 1,
        }),
    });
};

export const insertLast = async (songId: number) => {
    const player = usePlayerStore();

    await fetch("/api/player/queue", {
        method: "PUT",
        body: JSON.stringify({
            id: songId,
            at: player.queue.length,
        }),
    });
};

/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { ISong } from "../../common";

export interface IPlaylistFilters {
    search: string;
    artist: string[];
    title: string[];
    album: string[];
    sort: "title" | "artist" | "album" | "duration" | "added";
    order: "asc" | "desc";
}

export const filterApplied = (filters: IPlaylistFilters) => {
    const { search, artist, title, album, order, sort } = filters;
    return search.length || artist.length || title.length || album.length || order != "asc" || sort != "added";
}

export const applyFilters = (songs: ISong[], filters: IPlaylistFilters): ISong[] => {
    const { search, artist, title, album } = filters;

    const filtered = songs.filter((song) => {
        const searchMatch = search.length ? song.title.toLowerCase().includes(search.toLowerCase()) || song.artist.toLowerCase().includes(search.toLowerCase()) : true;
        const artistMatch = artist.length ? artist.includes(song.artist) : true;
        const titleMatch = title.length ? title.includes(song.title) : true;
        const albumMatch = album.length ? album.includes(song.album) : true;

        return searchMatch && artistMatch && titleMatch && albumMatch;
    });

    const { sort } = filters;
    let sorted = filtered.sort((a, b) => {
        const aVal = a[sort];
        const bVal = b[sort];

        if (aVal < bVal) {
            return -1;
        } else if (aVal > bVal) {
            return 1;
        } else {
            return 0;
        }
    });

    const { order } = filters;

    if (order == "desc") {
        sorted = sorted.reverse();
    }

    return sorted;
}

export const titleOptions = (songs: ISong[]) => {
    return songs.map((song) => ({
        label: song.title,
        value: song.title,
    }));
}

export const albumOptions = (songs: ISong[]) => {
    return songs.map((song) => ({
        label: song.album,
        value: song.album,
    }));
}

export const artistOptions = (songs: ISong[]) => {
    const artists = new Set<object>();
    for (const song of songs) {
        for (const artist of song.artist.split(", ")) {
            artists.add({
                label: artist,
                value: artist,
            });
        }
    }
    return Array.from(artists);
}

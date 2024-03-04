/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { IDropdownOption, ISong } from "../../common";
import { IOption } from "../popups/components/Form.vue";

export interface IPlaylistFilters {
    search: string;
    artist: string[];
    title: string[];
    album: string[];
    sort: "title" | "artist" | "album" | "duration" | "index";
    order: "asc" | "desc";
}

export interface IFilteredSong extends ISong {
    show: boolean;
    index: number;
}

export const filterApplied = (filters: IPlaylistFilters) => {
    const { search, artist, title, album, order, sort } = filters;
    return (
        search?.length ||
        artist?.length ||
        title?.length ||
        album?.length ||
        order != "asc" ||
        sort != "index"
    );
};

export const applyFilters = (
    songs: ISong[],
    filters: IPlaylistFilters
): IFilteredSong[] => {
    const { search, artist, title, album, sort } = filters;

    return songs
        .map((song) => {
            const searchMatch = search?.length
                ? song.title.toLowerCase().includes(search.toLowerCase()) ||
                  song.artist.toLowerCase().includes(search.toLowerCase())
                : true;
            const artistMatch = artist?.length
                ? artist.includes(song.artist)
                : true;
            const titleMatch = title?.length
                ? title.includes(song.title)
                : true;
            const albumMatch = album?.length
                ? album.includes(song.album.name)
                : true;

            return {
                ...song,
                show: searchMatch && artistMatch && titleMatch && albumMatch,
                index: songs.indexOf(song),
            };
        })
        .sort((a, b) => {
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
};

export const titleOptions = (songs: ISong[]) => {
    return songs.map((song) => ({
        label: song.title,
        value: song.title,
    }));
};

export const albumOptions = (songs: ISong[]) => {
    return songs.map((song) => ({
        label: song.album.name,
        value: song.album.name,
    })) as IDropdownOption[];
};

export const artistOptions = (songs: ISong[]) => {
    const artists = new Set<String>();
    for (const song of songs) {
        for (const artist of song.artist.split(", ")) {
            artists.add(artist);
        }
    }
    return Array.from(artists)
        .sort()
        .map((artist) => ({
            label: artist,
            value: artist,
        }));
};

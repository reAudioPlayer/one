/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

// @ts-ignore
import Hashids from "hashids";
import { computed } from "vue";

const playlistHash = new Hashids("reapOne.playlist", 22);
const hashidsTrack = new Hashids("reapOne.track", 22);

export const hashPlaylist = (id: string | number): string => {
    return playlistHash.encode(String(id));
};

export const unhashPlaylist = (id: string): number => {
    const ids = playlistHash.decode(id);
    return Number(ids[0]);
};

export const hashTrack = (id: string | number): string => {
    return hashidsTrack.encode(String(id));
};

export const unhashTrack = (id: string): number => {
    const ids = hashidsTrack.decode(id);
    return Number(ids[0]);
};

export const zeroPad = (num: number, places: number): string => {
    return String(num).padStart(places, "0");
};

export const parseCover = (cover: string) => {
    if (!cover) return null;
    if (cover.startsWith("local:"))
        return cover.replace("local:", "/src/covers/");
    return cover;
};

export const parsePlaylistCover = (cover: string) => {
    if (!cover) return null;
    if (cover.startsWith("local:"))
        return cover.replace("local:", "/src/covers/");
    return cover;
};

export const parseAnyCover = (
    cover: string,
    type: "track" | "playlist" = "track"
) => {
    const isPlaylist = type == "playlist";
    const parse = isPlaylist ? parsePlaylistCover : parseCover;
    return parse(cover);
};

export interface IMetadata {
    id: number;
    spotify: {
        id: string;
        features: {
            acousticness: number;
            danceability: number;
            energy: number;
            instrumentalness: number;
            liveness: number;
            loudness: number;
            speechiness: number;
            tempo: number;
            valence: number;
            key: string;
            mode: string;
        };
        popularity: number;
        releaseDate: string;
        explicit: boolean;
    };
    plays: number;
}

export interface ISong {
    source: string;
    href: string;
    id?: number;
    title: string;
    artist: string;
    artists?: string[];
    album: string;
    cover: string;
    favourite?: boolean;
    duration?: number;
    metadata?: IMetadata;
}

export interface IBrowseSong extends ISong {
    track: ISong;
}

export interface IPlaylistMeta {
    id: string;
    name: string;
    cover: string;
    description: string;
    plays: number;
    type: "special" | "smart" | "classic";
}

export interface IPlaylist extends IPlaylistMeta {
    href: string;
}

export interface IFullPlaylist extends IPlaylist {
    songs: ISong[];
    queue: ISong[];
    cursor: number;
}

export interface ISpotifySong extends ISong {
    added?: boolean;
    artists: string[];
    source: string;
    url?: string;
}

export interface ISpotifyAlbum {
    id: string;
    cover: string;
    title: string;
    artist: string;
    href: string;
    releaseDate: string;
}

export interface ISpotifyArtist {
    id: string;
    name: string;
    href: string;
    image: string;
}

export interface ISpotifyPlaylist extends IPlaylist {
    href: string;
}

export interface IDropdownOption {
    value: string;
    label: string;
    icon?: string;
}

export interface IDuration {
    from?: number; // s
    to?: number; // s
}

export interface IFilter {
    title: string[];
    artist: string[];
    album: string[];
    duration: IDuration;
}

export interface ISmartPlaylistDefinition {
    direction: "asc" | "desc";
    sort: "duration" | "title" | "artist" | "album" | "id";
    limit: number;
    filter: IFilter;
}

export interface ISmartPlaylist {
    id: string;
    name: string;
    description: string;
    cover: string;
    type: "smart";
    definition: ISmartPlaylistDefinition;
    plays: number;
    href: string;
}

export const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
};

export const openInNewTab = (href) => window.open(href, "_blank");

export const isMobile = computed(() => {
    return window.innerWidth < 768;
});

export const isLink = (str: string) => {
    const urlRegex =
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return urlRegex.test(str);
};

export const getCamelotKey = (meta: IMetadata): string => {
    const { key, mode } = meta.spotify.features;
    const major = [
        "B",
        "F#",
        "C#",
        "G#",
        "D#",
        "A#",
        "F",
        "C",
        "G",
        "D",
        "A",
        "E",
    ];
    const minor = [
        "A",
        "D#",
        "A#",
        "F",
        "C",
        "G",
        "D",
        "A",
        "E",
        "B",
        "F#",
        "C#",
    ];
    const keys = mode == "Major" ? major : minor;
    const index = keys.indexOf(key);
    return `${index + 1}${mode == "Major" ? "B" : "A"}`;
};

export const parseSpotifyId = (
    url: string,
    type: "track" | "album" | "playlist" | "artist" = null
): string | null => {
    if (!type) {
        if (url.includes("track")) type = "track";
        if (url.includes("album")) type = "album";
        if (url.includes("playlist")) type = "playlist";
    }
    const regex = new RegExp(
        `https:\/\/open.spotify.com\/${type}\/([a-zA-Z0-9]+)`
    );
    const match = url.match(regex);
    if (!match) return null;
    return match[1];
};

export const localeDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const displayDuration = (duration: number): string => {
    if (duration <= 0) return "N/A";
    const min = Math.floor(duration / 60);
    const sec = zeroPad(Math.floor(duration % 60), 2);
    return `${min}:${sec}`;
};

export const bytesToDisplay = (bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    while (bytes > 1000 && i < sizes.length) {
        bytes /= 1000;
        i++;
    }

    return `${bytes.toFixed(0)} ${sizes[i]}`;
};

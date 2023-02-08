/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

// @ts-ignore
import Hashids from 'hashids';
import {computed} from "vue";

const playlistHash = new Hashids("reapOne.playlist", 22);
const hashidsTrack = new Hashids("reapOne.track", 22);

export const hashPlaylist = (id: string): string => {
    return playlistHash.encode(id);
}

export const unhashPlaylist = (id: string): string => {
    return playlistHash.decode(id);
}

export const hashTrack = (id: string | number): string => {
    return hashidsTrack.encode(String(id));
}

export const unhashTrack = (id: string): string => {
    return hashidsTrack.decode(id);
}

export const zeroPad = (num: number, places: number): string => {
    return String(num).padStart(places, '0')
}

export const parseCover = (cover: string) => {
    if (!cover) return "/assets/img/placeholders/song.svg";
    if (cover.startsWith("local:")) return cover.replace("local:", "/src/covers/");
    return cover;
}

export const parsePlaylistCover = (cover: string) => {
    if (!cover) return "/assets/img/placeholders/playlist.svg";
    if (cover.startsWith("local:")) return cover.replace("local:", "/src/covers/");
    return cover;
}

export const parseAnyCover = (cover: string, type: "track" | "playlist" = "track") => {
    const isPlaylist = type == "playlist";
    const parse = isPlaylist ? parsePlaylistCover : parseCover;
    return parse(cover);
}

export interface ISong {
    source: string;
    id?: number;
    title: string;
    artist: string;
    album: string;
    cover: string;
    favourite?: boolean;
    duration?: number;
}

export interface IPlaylistMeta {
    id: number;
    name: string;
    cover: string;
    description: string;
}

export interface IPlaylist extends IPlaylistMeta {
    href: string;
}

export interface IFullPlaylist extends IPlaylist {
    songs: ISong[];
}

export interface ISpotifySong extends ISong {
    added?: boolean;
    artists: string[];
    source: string;
    href?: string;
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

export const toTitleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
    );
}

export const openInNewTab = href => window.open(href, "_blank");

export const isMobile = computed(() => {
    return window.innerWidth < 768;
});

export const isLink = (str: string) => {
    const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return urlRegex.test(str);
}

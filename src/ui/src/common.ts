// @ts-ignore
import Hashids from 'hashids';

const playlistHash = new Hashids("reapOne.playlist", 22);
const hashidsTrack = new Hashids("reapOne.track", 22);

export const hashPlaylist = (id: string) => {
    return playlistHash.encode(id);
}

export const unhashPlaylist = (id: string) => {
    return playlistHash.decode(id);
}

export const hashTrack = (id: string) => {
    return hashidsTrack.encode(id);
}

export const unhashTrack = (id: string) => {
    return hashidsTrack.decode(id);
}

export const zeroPad = (num: number, places: number) => {
    return String(num).padStart(places, '0')
}

export const parseCover = (cover: string) => {
    if (cover == null) return "/assets/img/placeholders/song.svg";
    if (cover.startsWith("local:")) return cover.replace("local:", "/src/covers/");
    return cover;
}

export const parsePlaylistCover = (cover: string) => {
    if (cover == null) return "/assets/img/placeholders/playlist.svg";
    if (cover.startsWith("local:")) return cover.replace("local:", "/src/covers/");
    return cover;
}

export interface ISong {
    id: number;
    title: string;
    artist: string;
    album: string;
    cover: string;
    src: string;
    favourite: boolean;
    duration: number;
}

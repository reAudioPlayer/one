/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { IMetadata, ISong, ISpotifySong, unhashTrack } from "../common";
import { createPlaylist } from "./playlist";

/**
 * updates a song based on its id
 * @param song
 */
export const updateSong = async (song: ISong) => {
    await fetch(`/api/tracks/${song.id}`, {
        method: "PUT",
        body: JSON.stringify({
            source: song.source,
            title: song.title,
            artist: song.artist,
            album: song.album,
            cover: song.cover
        })
    })
}

/**
 * updates a song property
 * @param song
 */
export const updateSongProperty = async (songId: number, key: string, value: any) => {
    await fetch(`/api/tracks/${songId}`, {
        method: "PUT",
        body: JSON.stringify({
            [key]: value
        })
    })
}

export const fetchMetadata = async (src: string): Promise<ISong> => {
    const res = await fetch("/api/browse/track", {
        method: "POST",
        body: JSON.stringify({
            url: src
        })
    })
    return await res.json();
}

/**
 * adds a song to a playlist
 * @param playlistId the id of the playlist to add the song to
 * @param song the song to add
 */
export const addSong = async (playlistId: number | string, song: ISong) => {
    if (playlistId === "new") {
        playlistId = await createPlaylist();
    }

    if (typeof playlistId === "string") {
        console.error("playlistId cannot be a string", playlistId);
    }

    await fetch(`/api/playlists/${playlistId}/tracks`, {
        method: "POST",
        body: JSON.stringify({
            source: song.source,
            title: song.title,
            artist: song.artist,
            album: song.album,
            cover: song.cover
        })
    })
}

/**
 * adds an existing song to a playlist
 * @param playlistId the id of the playlist to add the song to
 * @param songId the id of the song to add, not the hash
 */
export const addExistingSong = async (playlistId: number, songId: number) => {
    await fetch(`/api/playlists/${playlistId}/tracks/${songId}`, {
        method: "POST"
    })
}

/**
 * favours or unfavours a song
 * @param songId the id of the song to favourite, not the hash
 * @param favourite whether to favourite or unfavourite the song
 */
export const favouriteSong = async (songId: number, favourite: boolean = true) => {
    await fetch(`/api/tracks/${songId}`, {
        method: "PUT",
        body: JSON.stringify({
            favourite
        })
    })
}

/**
 * sets the duration of a song
 * @param songId the id of the song to set the duration of, not the hash
 * @param duration the duration in seconds
 */
export const saveDuration = async(songId: number, duration: number) => {
    await fetch(`/api/tracks/${songId}`, {
        method: "PUT",
        body: JSON.stringify({
            duration
        })
    })
}

/**
 * downloads a song
 * @param songId the id of the song to download, not the hash
 */
export const downloadSong = async (songId: number) => {
    window.open(`/api/tracks/${songId}/download`)
}

/**
 * gets a song by its id, not the hash
 * @param songId the id of the song to get
 * @returns the song
 */
export const getSong = async (songId: number): Promise<ISong> => {
    const res = await fetch(`/api/tracks/${songId}`);
    return await res.json();
}

/**
 * gets a song by its hash
 * @param hash the hash of the song to get
 * @returns the song
 */
export const getSongByHash = async (hash: string): Promise<ISong> => {
    const songId = unhashTrack(hash);
    return await getSong(songId);
}

export const getSongMetadata = async (songId: number, forceFetch = false, spotifyId: string = null): Promise<IMetadata> => {
    const body = {
        id: songId
    } as any;

    if (forceFetch) {
        body.forceFetch = true;
    }

    if (spotifyId) {
        body.spotifyId = spotifyId;
    }

    const res = await fetch("/api/spotify/meta", {
        method: "POST",
        body: JSON.stringify(body)
    });
    return await res.json();
}

export const getRecommendations = async (songId: number): Promise<ISpotifySong[]> => {
    const res = await fetch(`/api/spotify/recommendations/${songId}`);
    return await res.json();
}

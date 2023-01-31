import {ISong} from "../common";
import {createPlaylist} from "./playlist";

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
 * @param songId the id of the song to add
 */
export const addExistingSong = async (playlistId: number, songId: number) => {
    await fetch(`/api/playlists/${playlistId}/tracks/${songId}`, {
        method: "POST"
    })
}

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
 * @param songId the id of the song to set the duration of
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

export const downloadSong = async (songId: number) => {
    window.open(`/api/tracks/${songId}/download`)
}

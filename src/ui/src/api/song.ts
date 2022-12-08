import {ISong} from "../common";

/**
 * updates a song based on its id
 * @param song
 */
export const updateSong = async (song: ISong) => {
    console.log("updateSong", song);
    await fetch(`/api/tracks/${song.id}`, {
        method: "PUT",
        body: JSON.stringify({
            source: song.src,
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

export const addSong = async (playlistId: number, song: ISong) => {
    console.log("addSong", song);
    await fetch(`/api/playlists/${playlistId}/tracks`, {
        method: "POST",
        body: JSON.stringify({
            source: song.src,
            title: song.title,
            artist: song.artist,
            album: song.album,
            cover: song.cover
        })
    })
}

export const addSongToPlayist = async (playlistId: number, songId: number) => {
    await fetch(`/api/playlists/${playlistId}/tracks/${songId}`, {
        method: "POST"
    })
}

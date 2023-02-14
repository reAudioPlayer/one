/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { hashTrack, IFullPlaylist, IPlaylistMeta, unhashPlaylist } from "../common";
import { useDataStore } from "../store/data";

const dataStore = useDataStore();

/**
 * updates a playlist's metadata based on its id
 * @param playlist
 */
export const updatePlaylistMetadata = async (playlist: IPlaylistMeta) => {
    await fetch(`/api/playlists/${playlist.id}`, {
        method: "POST",
        body: JSON.stringify({
            name: playlist.name,
            description: playlist.description,
            cover: playlist.cover,
        })
    })
    await dataStore.fetchPlaylists();
}

/**
 * fetches a playlist from the server
 * @param id the playlist's id
 */
export const getPlaylist = async (id: string | number): Promise<IFullPlaylist> => {
    const res = await fetch(`/api/playlists/${id}`);

    if (res.status === 404) {
        return null;
    }

    const playlist = await res.json();
    for (const song of playlist.songs) {
        song.href = `/track/${hashTrack(song.id)}`;
    }

    playlist.id = id;

    return playlist;
}

/**
 * fetches a playlist from the server based on its hash
 * @param hash the playlist's hash
 */
export const getPlaylistByHash = async (hash: string): Promise<IFullPlaylist> => {
    return await getPlaylist(unhashPlaylist(hash));
}

/**
 * deletes a playlist based on its id
 * @param id the id of the playlist to delete
 */
export const deletePlaylist = async (id: number): Promise<void> => {
    await fetch(`/api/playlists/${id}`, {
        method: "DELETE"
    });
    await dataStore.fetchPlaylists();
}

/**
 * creates a new playlist
 * @returns the id of the new playlist
 */
export const createPlaylist = async (): Promise<number> => {
    const res = await fetch("/api/playlists/new");
    const id = await res.json();
    await dataStore.fetchPlaylists();
    return id;
}

/**
 * creates a new playlist with metadata
 * @param name the name of the playlist
 * @param description the description of the playlist
 * @param cover the cover of the playlist
 * @returns the id of the new playlist
 */
export const createPlaylistWithMetadata = async (name: string,
                                                 description: string = "",
                                                 cover: string = ""): Promise<number> => {
    const id = await createPlaylist();
    await updatePlaylistMetadata({
        id,
        name,
        description,
        cover
    });
    return id;
}

export const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
    await fetch(`/api/playlists/${playlistId}/tracks`, {
        method: "DELETE",
        body: JSON.stringify({
            songId: songId
        })
    });
    await dataStore.fetchPlaylists();
}

/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { IFullPlaylist, IPlaylistMeta, unhashPlaylist } from "../common";
import { useDataStore } from "../store/data";

const updateDataStore = async () => {
    const dataStore = useDataStore();
    await dataStore.fetchPlaylists();
};

const getPlaylistById = (id: string): IFullPlaylist => {
    const dataStore = useDataStore();
    return dataStore.getPlaylistById(id);
};

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
        }),
    });
    await updateDataStore();
};

/**
 * fetches all playlists from the server
 */
export const getAllPlaylists = async (): Promise<IFullPlaylist[]> => {
    const res = await fetch("/api/playlists");
    return await res.json();
};

/**
 * fetches a playlist from the server
 * @param id the playlist's id
 */
export const getPlaylist = (id: string): IFullPlaylist => {
    return getPlaylistById(id);
};

/**
 * deletes a playlist based on its id
 * @param id the id of the playlist to delete
 */
export const deletePlaylist = async (id: number): Promise<boolean> => {
    const res = await fetch(`/api/playlists/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) return false;

    await updateDataStore();
    return true;
};

/**
 * creates a new playlist
 * @returns the id of the new playlist
 */
export const createPlaylist = async (): Promise<string> => {
    const res = await fetch("/api/playlists/new");
    const id = await res.json();
    await updateDataStore();
    return id;
};

/**
 * creates a new playlist with metadata
 * @param name the name of the playlist
 * @param description the description of the playlist
 * @param cover the cover of the playlist
 * @returns the id of the new playlist
 */
export const createPlaylistWithMetadata = async (
    name: string,
    description: string = "",
    cover: string = ""
): Promise<string> => {
    const id = await createPlaylist();
    await updatePlaylistMetadata({
        id,
        name,
        description,
        cover,
        plays: 0,
    });
    return id;
};

export const removeSongFromPlaylist = async (
    playlistId: number,
    songId: number
) => {
    await fetch(`/api/playlists/${playlistId}/tracks`, {
        method: "DELETE",
        body: JSON.stringify({
            songId: songId,
        }),
    });
    await updateDataStore();
};

/**
 * peeks into the songs in a smart playlist
 */
export const peekSmartPlaylist = async (
    definition: ISmartPlaylist
): Promise<IFullPlaylist> => {
    const res = await fetch("/api/playlists/smart/peek", {
        method: "POST",
        body: JSON.stringify(definition),
    });
    const jdata = await res.json();
    return jdata;
};

/**
 * gets the definition of a smart playlist
 */
export const getSmartPlaylistDefinition = async (
    id: string
): Promise<ISmartPlaylist> => {
    const res = await fetch(`/api/playlists/smart/${id}`);
    const jdata = await res.json();
    return jdata;
};

/**
 * updates the definition of a smart playlist
 */
export const updateSmartPlaylistDefinition = async (
    id: string,
    definition: ISmartPlaylist
): Promise<void> => {
    await fetch(`/api/playlists/smart/${id}`, {
        method: "PUT",
        body: JSON.stringify({ definition }),
    });
    await updateDataStore();
};

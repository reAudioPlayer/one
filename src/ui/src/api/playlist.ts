import {hashPlaylist, hashTrack, IFullPlaylist, IPlaylist, IPlaylistMeta} from "../common";
import {useDataStore} from "../store/data";

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
export const getPlaylist = async (id: string): Promise<IFullPlaylist> => {
    const res = await fetch(`/api/playlists/${id}`);

    if (res.status === 404) {
        return null;
    }

    const playlist = await res.json();
    for (const song of playlist.songs) {
        song.href = `/track/${hashTrack(song.id)}`;
    }
    return playlist;
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

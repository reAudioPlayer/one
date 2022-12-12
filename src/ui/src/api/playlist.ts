import {hashTrack, IFullPlaylist, IPlaylist} from "../common";

/**
 * updates a playlist's metadata based on its id
 * @param playlist
 */
export const updatePlaylistMetadata = async (playlist: IPlaylist) => {
    await fetch(`/api/playlists/${playlist.id}`, {
        method: "POST",
        body: JSON.stringify({
            name: playlist.name,
            description: playlist.description,
            cover: playlist.cover,
        })
    })
}

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

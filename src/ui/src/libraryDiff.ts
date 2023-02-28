/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { IFullPlaylist, ISong } from "./common";

// diff of two libraries

interface ILibrary {
    playlists: IFullPlaylist[];
}

interface ILibraryDiff {
    added: IFullPlaylist[];
    removed: IFullPlaylist[];
    modified: IFullPlaylistDiff[];
}

interface IFullPlaylistDiff {
    added: ISong[];
    removed: ISong[];
    modified: ISong[];
}

export const diff = (one: ILibrary, two: ILibrary): ILibraryDiff => {
    const added = two.playlists.filter((playlist) => {
        return !one.playlists.some((p) => p.name === playlist.name);
    });

    const removed = one.playlists.filter((playlist) => {
        return !two.playlists.some((p) => p.name === playlist.name);
    });

    const modified = two.playlists.filter((playlist) => {
        return one.playlists.some((p) => p.name === playlist.name);
    }).map((playlist) => {
        const onePlaylist = one.playlists.find((p) => p.name === playlist.name);
        if (onePlaylist) {
            return diffPlaylist(onePlaylist, playlist);
        }
        return null;
    }).filter((p) => p !== null) as IFullPlaylistDiff[];

    return {
        added,
        removed,
        modified,
    };
}

const diffPlaylist = (one: IFullPlaylist, two: IFullPlaylist): IFullPlaylistDiff => {
    // if same: return null

    const added = two.songs.filter((track) => {
        return !one.songs.some((t) => t.source === track.source);
    });

    const removed = one.songs.filter((track) => {
        return !two.songs.some((t) => t.source === track.source);
    });

    const modified = two.songs.filter((track) => {
        return one.songs.some((t) => t.source === track.source);
    }).map((track) => {
        const oneTrack = one.songs.find((t) => t.source === track.source);
        if (oneTrack) {
            return diffTrack(oneTrack, track);
        }
        return null;
    }).filter((p) => p !== null) as ISong[];

    return {
        added,
        removed,
        modified,
    };
}

const diffTrack = (one: ISong, two: ISong): ISong => {
    for (const key of Object.keys(one)) {
        if (one[key] !== two[key]) {
            return two;
        }
    }

    return null;
}

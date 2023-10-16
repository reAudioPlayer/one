/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { IFullPlaylist, IMetadata, ISmartPlaylist, ISong } from "../../common";
import { ISyncableCollection, ISyncablePlaylist, ISyncableSong } from "./collection";

export interface IChangedProperty<E> {
    from: E;
    to: E;
}

export interface ISongDiff {
    source: string;
    changed: {
        title?: IChangedProperty<string>;
        artist?: IChangedProperty<string>;
        album?: IChangedProperty<string>;
        source?: IChangedProperty<string>;
        cover?: IChangedProperty<string>;
        favorite?: IChangedProperty<boolean>;
        metadata?: IChangedProperty<IMetadata>;
    };
    id?: number;
}

export interface IPlaylistDiff {
    name: string;
    added: ISong[];
    removed: ISong[];
    modified: ISongDiff[];
    id?: string;
}

export interface IDiff {
    added: ISyncablePlaylist[];
    removed: ISyncablePlaylist[];
    modified: IPlaylistDiff[];
}

/**
 * 
 * @param a base
 * @param b other
 * @returns 
 */
const diffSong = (a: ISong, b: ISong) => {
    const diff: ISongDiff = {
        source: a.source,
        id: a.id,
        changed: {},
    }
    const changed = diff.changed;

    const skip = [ "id", "href", "duration", "plays", "artists" ];

    for (const key of Object.keys(a)) {
        if (skip.includes(key)) continue;

        if (key === "metadata") {
            const aMeta = a.metadata;
            const bMeta = b.metadata;
            if (aMeta && bMeta) {
                if (!aMeta.spotify && !bMeta.spotify) {
                    continue;
                }

                if (!aMeta.spotify && bMeta.spotify) {
                    changed.metadata = {
                        from: aMeta,
                        to: bMeta,
                    };
                    continue;
                }
                if (aMeta.spotify && !bMeta.spotify) {
                    changed.metadata = {
                        from: aMeta,
                        to: bMeta,
                    };
                    continue;
                }

                if (aMeta.spotify.id !== bMeta.spotify.id) {
                    changed.metadata = {
                        from: aMeta,
                        to: bMeta,
                    };
                }
            } else if (aMeta || bMeta) {
                changed.metadata = {
                    from: aMeta,
                    to: bMeta,
                };
            }
            continue;
        }

        if (key === "id") {
            continue;
        }

        if (a[key] !== b[key]) {
            changed[key] = {
                from: a[key],
                to: b[key],
            };
        }
    }

    if (Object.keys(changed).length) {
        return diff;
    }
    return null;
}

const diffPlaylist = (base: ISyncablePlaylist, other: ISyncablePlaylist) => {
    const diff: IPlaylistDiff = {
        name: base.playlist.name,
        id: base.playlist.id,
        added: [],
        removed: [],
        modified: [],
    };

    if (base.playlist.type !== other.playlist.type) {
        return null;
    }

    if (base.playlist.type === "smart") {
        const smartPlaylist = base.playlist as ISmartPlaylist;
        const otherSmartPlaylist = other.playlist as ISmartPlaylist;
        return diff;
    }
    if (other.playlist.type === "smart") return;

    for (const baseSong of base.playlist.songs) {
        const otherSong = other.playlist.songs.find((s) => s.source === baseSong.source);
        if (otherSong) {
            const songDiff = diffSong(baseSong, otherSong);
            if (songDiff) {
                diff.modified.push(songDiff);
            }
        } else {
            diff.removed.push(baseSong);
        }
    }
    for (const otherSong of other.playlist.songs) {
        const baseSong = base.playlist.songs.find((s) => s.source === otherSong.source);
        if (!baseSong) {
            diff.added.push(otherSong);
        }
    }
    if (diff.added.length || diff.removed.length || diff.modified.length) {
        return diff;
    }
    return null;
};

export const diffLib = (base: ISyncableCollection, other: ISyncableCollection) => {
    const diff: IDiff = {
        added: [],
        removed: [],
        modified: [],
    };
    for (const basePlaylist of base.collection) {
        const otherPlaylist = other.collection.find((p) => p.playlist.name === basePlaylist.playlist.name);
        if (otherPlaylist) {
            const playlistDiff = diffPlaylist(basePlaylist, otherPlaylist);
            if (playlistDiff) {
                diff.modified.push(playlistDiff);
            }
        } else {
            diff.removed.push(basePlaylist);
        }
    }
    for (const otherPlaylist of other.collection) {
        const basePlaylist = base.collection.find((p) => p.playlist.name === otherPlaylist.playlist.name);
        if (!basePlaylist) {
            diff.added.push(otherPlaylist);
        }
    }
    return diff;
};

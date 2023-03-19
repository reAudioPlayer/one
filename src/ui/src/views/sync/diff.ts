/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { IFullPlaylist, IMetadata, ISong } from "../../common";

export interface IChangedProperty<E> {
    from: E;
    to: E;
}

export interface ISongDiff {
    id: number;
    changed: {
        title?: IChangedProperty<string>;
        artist?: IChangedProperty<string>;
        album?: IChangedProperty<string>;
        source?: IChangedProperty<string>;
        cover?: IChangedProperty<string>;
        favorite?: IChangedProperty<boolean>;
        metadata?: IChangedProperty<IMetadata>;
    }
}

export interface IPlaylistDiff {
    id?: number;
    name: string;
    added: ISong[];
    removed: ISong[];
    modified: ISongDiff[];
}

export interface IDiff {
    added: IFullPlaylist[];
    removed: IFullPlaylist[];
    modified: IPlaylistDiff[];
}

const diffSong = (a: ISong, b: ISong) => {
    console.log("diffing", a, b);

    const diff: ISongDiff = {
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

const diffPlaylist = (base: IFullPlaylist, other: IFullPlaylist) => {
    const diff: IPlaylistDiff = {
        name: base.name,
        id: base.id,
        added: [],
        removed: [],
        modified: [],
    };
    for (const baseSong of base.songs) {
        const otherSong = other.songs.find((s) => s.id === baseSong.id);
        if (otherSong) {
            const songDiff = diffSong(baseSong, otherSong);
            if (songDiff) {
                diff.modified.push(songDiff);
            }
        } else {
            diff.removed.push(baseSong);
        }
    }
    for (const otherSong of other.songs) {
        const baseSong = base.songs.find((s) => s.id === otherSong.id);
        if (!baseSong) {
            diff.added.push(otherSong);
        }
    }
    if (diff.added.length || diff.removed.length || diff.modified.length) {
        return diff;
    }
    return null;
};

export const diffLib = (base: IFullPlaylist[], other: IFullPlaylist[]) => {
    const diff: IDiff = {
        added: [],
        removed: [],
        modified: [],
    };
    for (const basePlaylist of base) {
        const otherPlaylist = other.find((p) => p.name === basePlaylist.name);
        if (otherPlaylist) {
            const playlistDiff = diffPlaylist(basePlaylist, otherPlaylist);
            if (playlistDiff) {
                diff.modified.push(playlistDiff);
            }
        } else {
            diff.removed.push(basePlaylist);
        }
    }
    for (const otherPlaylist of other) {
        const basePlaylist = base.find((p) => p.name === otherPlaylist.name);
        if (!basePlaylist) {
            diff.added.push(otherPlaylist);
        }
    }
    return diff;
};

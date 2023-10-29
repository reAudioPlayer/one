import { IFullPlaylist, ISong, ISmartPlaylist } from "../../common";
import { getSmartPlaylistDefinition } from "../../api/playlist";

const SONG_EXPORT_VERSION = 1;
const PLAYLIST_EXPORT_VERSION = 1;
const COLLECTION_EXPORT_VERSION = 1;

/*
// song
[song].one.song
{
    type: 'song',
    version: number,
    song: ISong
}

// playlist
[playlist].one.playlist
{
    type: 'playlist',
    version: number,
    playlist: IFullPlaylist | ISmartPlaylistDefinition
}

// collection
[collection].one.collection
{
    type: 'collection',
    version: number,
    collection: SyncablePlaylist[]
}
*/

interface ISyncable {
    type: "song" | "playlist" | "collection";
    version: number;
}

export interface ISyncableSong extends ISyncable {
    type: "song";
    song: ISong;
}

export interface ISyncablePlaylist extends ISyncable {
    type: "playlist";
    playlist: IFullPlaylist | ISmartPlaylist;
}

export interface ISyncableCollection extends ISyncable {
    type: "collection";
    collection: ISyncablePlaylist[];
}

export type ISyncableOne =
    | ISyncableSong
    | ISyncablePlaylist
    | ISyncableCollection;

export const asSyncableSong = (song: ISong): ISyncableSong => ({
    type: "song",
    version: SONG_EXPORT_VERSION,
    song,
});

export const asSyncablePlaylist = async (playlist: IFullPlaylist) => {
    const value: ISyncable = {
        type: "playlist",
        version: PLAYLIST_EXPORT_VERSION,
    };

    if (playlist.type === "special") return null;

    if (playlist.type === "classic") {
        const data = Object.assign({}, playlist);
        delete data.queue;
        delete data.cursor;
        return {
            ...value,
            playlist: data,
        } as ISyncablePlaylist;
    }

    if (playlist.type === "smart") {
        const definition = await getSmartPlaylistDefinition(playlist.id);
        return {
            ...value,
            playlist: {
                name: playlist.name,
                description: playlist.description,
                cover: playlist.cover,
                type: playlist.type,
                definition,
                plays: playlist.plays,
                id: playlist.id,
                href: playlist.href,
            },
        } as ISyncablePlaylist;
    }
};

export const asSyncableCollection = async (collection: IFullPlaylist[]) => {
    return {
        type: "collection",
        version: COLLECTION_EXPORT_VERSION,
        collection: await Promise.all(
            collection
                .filter((x) => x.type != "special")
                .map(asSyncablePlaylist)
        ),
    } as ISyncableCollection;
};

export const downloadSyncable = (
    syncable: ISyncableOne,
    name: string = "my"
) => {
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(syncable));
    var anchor = document.createElement("a");
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `${name}.one.${syncable.type}`);
    anchor.click();
};

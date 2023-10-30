import { IFullPlaylist, ISong, ISmartPlaylist } from "../../common";
import { createPlaylistWithMetadata, getSmartPlaylistDefinition, updateSmartPlaylistDefinition } from "../../api/playlist";
import { addSongs } from "../../api/song";
import { Notifications } from "../../components/notifications/createNotification";
import { useDataStore } from "../../store/data";
import { useRoute } from "vue-router";

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

const addSongsToPlaylist = async (songs: ISyncableSong[]) => {
    if (!songs.length) {
        return;
    }

    const route = useRoute();
    if (!route.path.startsWith("/playlist/")) {
        Notifications.addError(
            "No playlist selected",
            "Please select open the playlist you want to add songs to",
            3000
        );
        return;
    }

    const playlist = useDataStore().getPlaylistById(route.params.id as string);

    if (playlist.type !== "classic") {
        Notifications.addError(
            "Can't add songs to this playlist",
            "You can only add songs to classic playlists",
            3000
        );
        return;
    }

    await addSongs(
        playlist.id,
        songs.map((x) => x.song)
    );
    Notifications.addSuccess(
        `Added ${songs.length} songs to ${playlist.name}`,
        null,
        3000
    );
};

const addPlaylist = async (playlist: ISyncablePlaylist) => {
    const toAdd = playlist.playlist;
    const id = await createPlaylistWithMetadata(
        toAdd.type as any,
        toAdd.name,
        toAdd.description,
        toAdd.cover
    );

    if (toAdd.type === "smart") {
        await updateSmartPlaylistDefinition(
            id,
            (toAdd as ISmartPlaylist).definition
        );
        return;
    }
    await addSongs(id, toAdd.songs);
};

const addPlaylists = async (playlists: ISyncablePlaylist[]) => {
    if (!playlists.length) {
        return;
    }

    for (const playlist of playlists) {
        await addPlaylist(playlist);
    }
    Notifications.addSuccess(`Added ${playlists.length} playlists`, null, 3000);
    useDataStore().fetchPlaylists();
};

export const importSyncables = (items: ISyncableOne[]) => {
    const songs = items.filter((x) => x.type === "song") as ISyncableSong[];
    addSongsToPlaylist(songs);
    const playlists = items.filter(
        (x) => x.type === "playlist"
    ) as ISyncablePlaylist[];
    const collections = items.filter(
        (x) => x.type === "collection"
    ) as ISyncableCollection[];
    for (const collection of collections) {
        playlists.push(...collection.collection);
    }
    addPlaylists(playlists);
}

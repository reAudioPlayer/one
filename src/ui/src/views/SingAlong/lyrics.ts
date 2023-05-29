import { usePlayerStore } from '../../store/player';

interface ILine {
    endTimeMs: string;
    startTimeMs: string;
    syllables: string[];
    words: string;
    originalWorlds?: string;
};

interface IReturn {
    error: boolean;
    message?: string;
    syncType?: string;
    lines?: ILine[];
};

export interface ILyrics {
    error?: string | null;
    lyrics?: ILine[] | null;
}

/*const getAccessToken = async () => {
    // CORS
    const res = await fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player");
    const data = await res.json();
    console.log(data.accessToken);
};*/

const getLyrics = async (id: string) => {
    //const res = await fetch("https://spclient.wg.spotify.com/color-lyrics/v2/track/" + id + "?format=json&market=from_token");
    const res = await fetch("https://spotify-lyric-api.herokuapp.com/?trackid=" + id);
    const data: IReturn = await res.json();

    return {
        error: data.message,
        lyrics: data.lines,
    }
};

export const findLyrics = async () => {
    const playerStore = usePlayerStore();
    const track = playerStore.song;
    if (track.metadata.spotify?.id) {
        return await getLyrics(track.metadata.spotify?.id);
    }

    return {
        error: "Spotify equivalent unknown.",
    }
};

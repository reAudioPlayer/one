import Hashids from 'hashids'
const playlistHash = new Hashids("reapOne.playlist", 22)

export const hashPlaylist = id => {
    return playlistHash.encode(id);
}

export const unhashPlaylist = id => {
    return playlistHash.decode(id);
}

export const zeroPad = (num, places) => {
    return String(num).padStart(places, '0')
}

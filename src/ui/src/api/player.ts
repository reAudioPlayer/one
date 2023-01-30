export const nextSong = () => {
    fetch("/api/player/next");
}

export const prevSong = () => {
    fetch("/api/player/previous");
}

export const setShuffle = (shuffle: boolean) => {
    fetch(`/api/player/shuffle`, {
        method: "POST",
        body: JSON.stringify(shuffle),
    })
}

export const getShuffle = () => {
    return fetch("/api/player/shuffle").then((res) => res.json());
}

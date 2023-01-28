export const nextSong = () => {
    fetch("/api/player/next");
}

export const prevSong = () => {
    fetch("/api/player/previous");
}

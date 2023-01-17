export const playInPicture = (artist: string, title: string, href: string) => {
    const event = new CustomEvent('player.play', { detail: {
            artist,
            title,
            source: href
        } });
    window.dispatchEvent(event);
}

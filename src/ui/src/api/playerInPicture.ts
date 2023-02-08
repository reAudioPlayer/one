/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

export const playInPicture = (artist: string, title: string, href: string) => {
    const event = new CustomEvent('player.play', { detail: {
            artist,
            title,
            source: href
        } });
    window.dispatchEvent(event);
}

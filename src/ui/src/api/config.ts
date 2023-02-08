/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

export const isFirstRun = async (): Promise<boolean> => {
    const res = await fetch("/api/config/first-time")
    return await res.json();
}

export const setSpotifyConfig = async (id: string, secret: string): Promise<void> => {
    await fetch("/api/config/spotify", {
        method: "POST",
        body: JSON.stringify({
            id,
            secret
        })
    })
}

export const authoriseSpotify = async (): Promise<boolean> => {
    const res = await fetch("/api/spotify/authorise");
    if (res.status == 200) {
        window.location.href = await res.text();
        return true;
    }
    return res.status == 204;
}

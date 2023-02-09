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


export type CacheStrategy = "all" | "playlist" | "current" | "current-next";
export interface ICacheConfig {
    preserve: boolean;
    preserveInSession: boolean;
    strategy: CacheStrategy;
}
export interface IConfig {
    cache: ICacheConfig;
}

export const getConfig = async (): Promise<IConfig> => {
    const res = await fetch("/api/config");
    return await res.json();
}

export const setConfig = async (config: IConfig): Promise<void> => {
    await fetch("/api/config", {
        method: "PUT",
        body: JSON.stringify(config)
    })
}

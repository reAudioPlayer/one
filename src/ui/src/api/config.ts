/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { Notifications } from "../components/notifications/createNotification";

export const isFirstRun = async (): Promise<boolean> => {
    const res = await fetch("/api/config/first-time")
    Notifications.addYesNo("qweqweqw")
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
        Notifications.addYesNo(
          "Do you want to authorise reAudioPlayer ONE to access your Spotify account?",
            "You will be redirected to Spotify to authorise reAudioPlayer ONE to access your account.",
          null,
          async () => {
              window.location.href = await res.text();
          }
        )
        return false;
    }
    return res.status == 204;
}


export type CacheStrategy = "all" | "playlist" | "current" | "current-next";
export interface ICacheConfig {
    preserve: boolean;
    preserveInSession: boolean;
    strategy: CacheStrategy;
}
export interface IGithubConfig {
    gistId: string;
    githubPat: string;
}
export interface IConfig {
    cache: ICacheConfig;
    github: IGithubConfig;
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

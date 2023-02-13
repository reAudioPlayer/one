/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { getConfig } from "./config";

const getHeaders = async () => {
    const config = await getConfig();
    const token = config.github.githubPat;

    if (!token) throw new Error("No GitHub PAT found");

    return {
        "Authorization": "Bearer " + token
    }
};

const body = (data: object, filename: string = "one.lib.json") => {
    const files = {};
    files[filename] = {
        content: JSON.stringify(data)
    }
    return JSON.stringify({
        files
    });
};

const gistId = async () => {
    const config = await getConfig();
    return config.github.gistId;
};

const get = async () => {
    const headers = await getHeaders();
    const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
        headers
    });
    return await res.json();
};

export default {
    get,
    getContent: async (filename: string = "one.lib.json"): object => {
        const gist = await get();
        return JSON.parse(gist.files[filename].content);
    },
    update: async (data: object, filename: string = "one.lib.json") => {
        const headers = await getHeaders();
        const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
            method: "PATCH",
            headers,
            body: body(data, filename)
        });
        return await res.json();
    },
    save: async (data: object, filename: string = "one.lib.json") => {
        const headers = await getHeaders();
        const res = await fetch("https://api.github.com/gists", {
            method: "POST",
            headers,
            body: body(data, filename)
        });
        const jdata = await res.json();
        if (jdata.id) {
            await fetch("/api/config", {
                method: "PUT",
                body: JSON.stringify({
                    github: {
                        gistId: jdata.id
                    }
                })
            });
        }
    },
    delete: async () => {
        const headers = await getHeaders();
        const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
            method: "DELETE",
            headers
        });
        return await res.json();
    }
}

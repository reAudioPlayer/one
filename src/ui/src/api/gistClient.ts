/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { getConfig } from "./config";
import { Notifications } from "../components/notifications/createNotification";

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
    try {
        return await res.json();
    } catch (e) {
        return null;
    }
};

const update = async (data: object, filename: string = "one.lib.json") => {
    const headers = await getHeaders();
    const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
        method: "PATCH",
        headers,
        body: body(data, filename)
    });

    if (!res.ok) {
        Notifications.addError("Failed to update gist", "", 3000);
        return null;
    }

    const jdata = await res.json();
    Notifications.addSuccess("Gist updated", "", 3000);
    return jdata;
};

const save = async (data: object, filename: string = "one.lib.json") => {
    const headers = await getHeaders();
    const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers,
        body: body(data, filename)
    });

    if (!res.ok) {
        Notifications.addError("Failed to create gist", "", 3000);
        return null;
    }

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
    Notifications.addSuccess("Gist created", "", 3000);
};

export default {
    connected: async () => {
        return !!(await gistId());
    },
    get,
    getContent: async (filename: string = "one.lib.json"): Promise<any[]> => {
        const gist = await get();
        const content = gist.files?.[filename]?.content;
        return content ? JSON.parse(content) : [];
    },
    saveOrUpdate: async (data: object, filename: string = "one.lib.json") => {
        const gist = await get();
        if (gist.files) {
            return await update(data, filename);
        } else {
            return await save(data, filename);
        }
    },
    save,
    update,
    delete: async () => {
        const headers = await getHeaders();
        const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
            method: "DELETE",
            headers
        });
        return await res.json();
    }
}

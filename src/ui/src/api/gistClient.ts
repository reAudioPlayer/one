/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { getConfig } from "./config";
import { Notifications } from "../components/notifications/createNotification";

type Files = Record<string, object>;

const getHeaders = async (forcePat: string = null) => {
    const config = await getConfig();
    const token = forcePat ?? config.github.githubPat;

    if (!token) throw new Error("No GitHub PAT found");

    return {
        Authorization: "Bearer " + token,
    };
};

const body = (
    files: Files,
    filename: string = "reAudioPlayer One",
    description: string = "Fully managed with reAudioPlayer One",
    isPublic: boolean = false
) => {
    const body = {
        public: isPublic,
        description: description,
        files: {
            [`_${filename}.md`]: {
                content:
                    "# reAudioPlayer One\n\nThis gist was created with reAudioPlayer One\n\nhttps://reaudioplayer.github.io/one/",
            },
        },
    };
    for (const [key, value] of Object.entries(files)) {
        body.files[key] = {
            content: JSON.stringify(value, null, 4),
        };
    }
    return JSON.stringify(body);
};

const gistId = async () => {
    const config = await getConfig();
    return config.github.gistId;
};

const get = async () => {
    const headers = await getHeaders();
    const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
        headers,
    });
    try {
        return await res.json();
    } catch (e) {
        return null;
    }
};

const update = async (files: Files, filename: string = "one.lib.json") => {
    const headers = await getHeaders();
    const res = await fetch(`https://api.github.com/gists/${await gistId()}`, {
        method: "PATCH",
        headers,
        body: body(files, filename),
    });

    if (!res.ok) {
        Notifications.addError("Failed to update gist", "", 3000);
        return null;
    }

    const jdata = await res.json();
    Notifications.addSuccess("Gist updated", "", 3000);
    return jdata;
};

const save = async (
    files: Files,
    filename: string = "reAudioPlayer One",
    isPublic: boolean = false,
    description: string = "Fully managed with reAudioPlayer One"
) => {
    const headers = await getHeaders();
    const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers,
        body: body(files, filename, description, isPublic),
    });

    if (!res.ok) {
        Notifications.addError("Failed to create gist", "", 3000);
        return null;
    }

    const jdata = await res.json();
    if (!isPublic && jdata.id) {
        await fetch("/api/config", {
            method: "PUT",
            body: JSON.stringify({
                github: {
                    gistId: jdata.id,
                },
            }),
        });
    }
    Notifications.addSuccess("Gist created", "", 3000);
    return jdata;
};

export default {
    connected: async () => {
        return !!(await gistId());
    },
    get,
    getContent: async (
        filename: string = "my.one.collection"
    ): Promise<any> => {
        const gist = await get();
        const content = gist.files?.[filename]?.content;
        return content ? JSON.parse(content) : [];
    },
    saveOrUpdate: async (
        files: Files,
        filename: string = "reAudioPlayer One",
        isPublic: boolean = false
    ) => {
        const gist = await get();
        if (gist?.files) {
            return await update(files, filename);
        } else {
            return await save(files, filename, isPublic);
        }
    },
    save,
    update,
    delete: async () => {
        const headers = await getHeaders();
        const res = await fetch(
            `https://api.github.com/gists/${await gistId()}`,
            {
                method: "DELETE",
                headers,
            }
        );
        return await res.json();
    },
    search: async (forcePat: string = null) => {
        // searches for gists with the filename "one.lib.json"
        const headers = await getHeaders(forcePat);
        const res = await fetch(`https://api.github.com/gists`, {
            headers,
        });
        const data = await res.json();

        // search for file "my.one.collection"
        const filename = "my.one.collection";
        const gist = data?.find((gist) => gist.files?.[filename]);
        return gist?.id;
    },
    gistUrl: async () => {
        const gist = await get();
        return gist?.html_url;
    },
};

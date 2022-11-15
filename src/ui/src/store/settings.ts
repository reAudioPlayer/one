import { defineStore } from 'pinia'
import {ref, watch} from "vue";

const KEY = "reapOne.settings";

export interface ISettings {
    sidebar: {
        sports: boolean;
        news: boolean;
        collapsed: boolean;
    },
    player: {
        inBrowser: boolean;
        expandedCover: boolean;
        supportsLocalPlayback: boolean;
    },
    theme: string;
}

const updateStorage = (settings: ISettings) => {
    localStorage.setItem(KEY, JSON.stringify({
        sidebar: settings.sidebar,
        player: settings.player,
        theme: settings.theme
    }));
}

const defaultSettings: ISettings = {
    sidebar: {
        sports: false,
        news: false,
        collapsed: false
    },
    player: {
        inBrowser: true,
        expandedCover: false,
        supportsLocalPlayback: false
    },
    theme: "jade"
}

const getSettings = (): ISettings => {
    const settings = JSON.parse(localStorage.getItem(KEY) || JSON.stringify(defaultSettings));
    return settings;
}

const migrateSettings = () => {
    const settings = getSettings();
    console.log("migrateSettings", settings);

    const sports = localStorage.getItem("sidebar.showSportsTab");
    const news = localStorage.getItem("sidebar.showNewsTab");
    const playInBrowser = localStorage.getItem("player.inBrowser");
    const collapsedSidebar = localStorage.getItem("player.collapsedSidebar");
    const exapndedCover = localStorage.getItem("player.exapndCover");
    const theme = localStorage.getItem("theme");

    if (sports) {
        settings.sidebar.sports = sports === "true";
        localStorage.removeItem("sidebar.showSportsTab");
    }
    if (news) {
        settings.sidebar.news = news === "true";
        localStorage.removeItem("sidebar.showNewsTab");
    }
    if (playInBrowser) {
        settings.player.inBrowser = playInBrowser === "true";
        localStorage.removeItem("player.inBrowser");
    }
    if (collapsedSidebar) {
        settings.sidebar.collapsed = collapsedSidebar === "true";
        localStorage.removeItem("player.collapsedSidebar");
    }
    if (exapndedCover) {
        settings.player.expandedCover = exapndedCover === "true";
        localStorage.removeItem("player.exapndCover");
    }
    if (theme) {
        settings.theme = theme;
        localStorage.removeItem("theme");
    }
    updateStorage(settings);
}

export const useSettingsStore = defineStore("settings", () => {
    migrateSettings();
    const playerState = ref(getSettings().player);
    const sidebarState = ref(getSettings().sidebar);
    const theme = ref(getSettings().theme);

    const update = () => {
        updateStorage({
            player: playerState.value,
            sidebar: sidebarState.value,
            theme: theme.value
        });
    }

    const checkLocalPlayback = async () => {
        console.log("checkLocalPlayback");
        const res = await fetch("/api/player/supports/local-playback");

        if (res.status != 200) {
            setTimeout(checkLocalPlayback, 1000);
            return;
        }

        playerState.value.supportsLocalPlayback = await res.json();
        update();
    };
    checkLocalPlayback();

    watch(() => playerState, update, {deep: true});
    watch(() => sidebarState, update, {deep: true});
    watch(() => theme, update, {deep: true});

    return { player: playerState, sidebar: sidebarState, theme };
});

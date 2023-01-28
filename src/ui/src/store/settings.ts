import { defineStore } from 'pinia'
import {ref, watch} from "vue";
import {usePlayerStore} from "./player";

const KEY = "reapOne.settings";
const DEFAULT_THEME = "dynamic";

export interface ISettings {
    sidebar: {
        sports: boolean;
        news: boolean;
        collapsed: boolean;
    },
    player: {
        expandedCover: boolean;
        pictureInPicture: boolean;
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
        expandedCover: false,
        pictureInPicture: false
    },
    theme: DEFAULT_THEME
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
    const expandedCover = localStorage.getItem("player.exapndCover");
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
        localStorage.removeItem("player.inBrowser");
    }
    if (collapsedSidebar) {
        settings.sidebar.collapsed = collapsedSidebar === "true";
        localStorage.removeItem("player.collapsedSidebar");
    }
    if (expandedCover) {
        settings.player.expandedCover = expandedCover === "true";
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

    watch(() => playerState, update, {deep: true});
    watch(() => sidebarState, update, {deep: true});
    watch(() => theme, update, {deep: true});

    return { player: playerState, sidebar: sidebarState, theme };
});

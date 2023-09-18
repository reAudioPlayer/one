import themes from "./assets/themes.json";
import { useSettingsStore } from "./store/settings";

const settings = () => useSettingsStore();


interface CustomWindow extends Window {
    getThemes: () => string[];
    getCurrentTheme: () => string;
    setTheme: (theme: string) => void;
    getCurrentThemeProperty: (property: string) => string;
    themes: string[];
    restoreTheme: () => void;
}

declare const window: CustomWindow;

window.getThemes = () => { // returns a string array of all available themes
    window.themes = []
    for (const key of Object.keys(themes)) {
        for (const theme of Object.keys(themes[key])) {
            if (!window.themes.includes(theme)) {
                window.themes.push(theme)
            }
        }
    }
    return window.themes;
}

window.getCurrentTheme = () => {
    return settings().theme;
}

window.setTheme = (theme) => { // accepts a string (theme name)
    if (!window.getThemes().includes(theme)) {
        return;
    }

    settings().theme = theme;

    for (const key of Object.keys(themes)) {
        const value = themes[key]

        if (key == "coverAsBackground") continue;

        document.documentElement.style.setProperty(`--${key}`, value[theme] ?? value.dark);
    }
}

window.restoreTheme = () => window.setTheme(settings().theme || "dynamic") // optional, loads the default theme

window.getCurrentThemeProperty = (property) => {
    const value = themes[property]
    return value[settings().theme] ?? value.dark;
}

export default window;

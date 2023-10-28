import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import "../src/assets/css/main.css";
import "../src/assets/css/material-symbols.css";
import "../src/assets/css/scrollbars.css";
import "../src/assets/scss/_variables.scss";
import "../src/assets/scss/tailwind-extended.scss";
import themes from "../src/themes";
import { createPinia } from "pinia";
import { App } from "vue";

const pinia = createPinia();

setup((app: App) => {
    app.use(pinia);
});


themes.setTheme("light");

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;

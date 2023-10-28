import type { Meta, StoryObj } from "@storybook/vue3";

import TextInputWithIcon from "./TextInputWithIcon.vue";

const meta: Meta<typeof TextInputWithIcon> = {
    component: TextInputWithIcon,
};

export default meta;
type Story = StoryObj<typeof TextInputWithIcon>;

export const Primary: Story = {
    render: (args) => ({
        components: { TextInputWithIcon },
        setup() {
            return { args };
        },
        template: "<TextInputWithIcon v-bind='args' />",
    }),
    args: {
        icon: "title",
        placeholder: "Title",
    },
};

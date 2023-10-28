import type { Meta, StoryObj } from "@storybook/vue3";

import Spinner from "./Spinner.vue";

const meta: Meta<typeof Spinner> = {
    component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
    render: () => ({
        components: { Spinner },
        template: "<Spinner />",
    }),
};

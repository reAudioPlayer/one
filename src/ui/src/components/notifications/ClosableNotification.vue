<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType } from "vue";
import type { INotification } from "./createNotification";
import Card from "../../containers/Card.vue";
import { useRouter } from "vue-router";

const props = defineProps({
    notification: {
        type: Object as PropType<INotification>,
        required: true,
    },
});

const emit = defineEmits(["remove"]);
const router = useRouter();

const remove = (id: string) => {
    emit("remove", id);
};

const click = () => {
    emit("remove", props.notification.id);
    if (props.notification.onClick) {
        props.notification.onClick();
    }
    console.log(props.notification.redirect);
    if (props.notification.redirect) {
        router.push(props.notification.redirect);
    }
};
</script>

<template>
    <Card
        :class="{
            [notification.type]: true,
            'cursor-pointer': notification.redirect || notification.onClick,
        }"
        class="notification"
        @click.stop.prevent="click"
    >
        <div class="message">
            <h4>
                {{ notification.message }}
            </h4>
            <span v-if="notification.details" class="details">
                {{ notification.details }}
            </span>
        </div>
        <span
            class="material-symbols-rounded close"
            @click.stop.prevent="remove(notification.id)"
        >
            close
        </span>
    </Card>
</template>

<style lang="scss" scoped>
.notification {
    padding: 0.5em 1em;
    display: flex;
    flex-direction: row;
    gap: 2em;
    align-items: center;
    justify-content: space-between;
    color: white;
    filter: var(--drop-shadow);

    &.success {
        background-color: var(--success);
    }

    &.error {
        background-color: var(--fail);
    }

    &.info {
        background-color: var(--info);
    }

    &.warning {
        background-color: var(--warning);
    }

    h4,
    p {
        margin: 0;
    }

    .details {
        font-size: 0.8em;
    }
}

.close {
    cursor: pointer;
}
</style>

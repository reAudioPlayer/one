<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType } from "vue";
import { INotification } from "./NotificationHandler.vue";
import Card from "../../containers/Card.vue";

const props = defineProps({
    notification: {
        type: Object as PropType<INotification>,
        required: true
    }
})

const emit = defineEmits(["remove"]);

const remove = (id: string) => {
    emit("remove", id);
}
</script>

<template>
    <Card
        :class="notification.type"
        class="notification"
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
            @click="remove(notification.id)"
        >
            close
        </span>
    </Card>
</template>

<style lang="scss" scoped>
.notification {
    padding: .5em 1em;
    display: flex;
    flex-direction: row;
    gap: 2em;
    align-items: center;
    justify-content: space-between;
    color: white;

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

    h4, p {
        margin: 0;
    }

    .details {
        font-size: .8em;
    }
}

.close {
    cursor: pointer;
}
</style>

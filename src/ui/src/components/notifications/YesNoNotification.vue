<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType } from "vue";
import { IYesNoNotification } from "./Notifications.vue";
import Card from "../../containers/Card.vue";

const props = defineProps({
    notification: {
        type: Object as PropType<IYesNoNotification>,
        required: true
    }
})

const emit = defineEmits(["remove"]);

const no = () => {
    emit("remove", props.notification.id);
    props.notification.onNo();
}

const yes = () => {
    emit("remove", props.notification.id);
    props.notification.onYes();
}
</script>

<template>
    <Card
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
        <div class="yes-no">
            <div
                class="yes option"
                @click="yes"
            >
                <span class="material-symbols-rounded">
                    check
                </span>
            </div>
            <div
                class="no option"
                @click="no"
            >
                <span class="material-symbols-rounded">
                    close
                </span>
            </div>
        </div>
    </Card>
</template>

<style lang="scss" scoped>
.notification {
    gap: 2em;
    align-items: center;
    color: white;
    overflow: hidden;

    --background: #1e1e1e;
    --neutral: #374148;
    --success: #00c48b;
    --fail: #e85454;
    --warning: #c7aa19;
    --info: #189de4;

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

    .message {
        padding: .5em 1em;

        h4 {
            margin: 0;
        }

        .details {
            font-size: .8em;
        }
    }
}

.yes-no {
    display: flex;
    flex-direction: row;

    .option {
        flex: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &.yes {
            background-color: var(--success);
        }

        &.no {
            background-color: var(--fail);
        }
    }
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { ref } from "vue";
import ClosableNotification from "./ClosableNotification.vue";
import YesNoNotification from "./YesNoNotification.vue";
import { IFullNotification } from "./createNotification";

const closableNotifications = [ "success", "error", "info", "warning" ];

const notifications = ref<IFullNotification[]>([]);

const add = (notification: IFullNotification) => {
    notifications.value.push(notification);
    if (notification.timeout) {
        setTimeout(() => {
            notification.onTimeout?.();
            remove(notification.id);
        }, notification.timeout);
    }
};

const remove = (id: string) => {
    notifications.value = notifications.value.filter(notification => notification.id != id);
};

const clear = () => {
    notifications.value = [];
};

window.addEventListener('notification.add', e => {
    const notification = (e as CustomEvent).detail;
    add(notification);
});

window.addEventListener('notification.remove', e => {
    const id = (e as CustomEvent).detail;
    remove(id);
});

window.addEventListener('notification.clear', () => {
    clear();
});
</script>

<template>
    <div class="notifications">
        <template
            v-for="notification in notifications"
            :key="notification.id"
        >
            <ClosableNotification
                v-if="closableNotifications.includes(notification.type)"
                :notification="notification"
                @remove="remove"
            />
            <YesNoNotification
                v-else-if="notification.type == 'yes-no'"
                :notification="notification"
                @remove="remove"
            />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.notifications {
    position: absolute;
    inset: auto auto 0 0;
    z-index: 10;
    margin: 2em 2em calc(var(--h-player) + 10px) calc(var(--w-sidebar) + 40px);
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: flex-start;

    .notification {
        min-width: 200px;
        max-width: 400px;
    }
}
</style>

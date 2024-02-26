<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script setup lang="ts">
import Loader from "@/components/Loader";
// @ts-ignore
import Logo from "/src/assets/images/logo/logo-text.svg";
import { onMounted } from "vue";
import { Notifications } from "@/components/notifications/createNotification";

onMounted(() => {
    Notifications.clear();
});
</script>
<template>
    <div class="startup">
        <div class="wrap">
            <div class="logo">
                <Loader />
                <Logo />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.startup .loader {
    width: max-content;

    .wrap {
        width: 200px;
        height: 200px;
    }
}
</style>

<style lang="scss" scoped>
.startup {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .wrap {
        width: 80%;
    }

    .logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        align-items: center;

        svg {
            fill: var(--fg-base);
            padding: 10px;
            translate: 5px 5px;
            height: 100%;
            max-width: 400px;
        }

        p {
            font-size: 1em;
            color: var(--fg-base);
            z-index: 1;
            margin-left: 50px;
        }
    }
}
</style>

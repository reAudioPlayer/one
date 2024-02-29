<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="error">
        <h1 v-html="msg" />
    </div>
</template>

<script lang="ts" setup>
defineProps({
    msg: {
        type: String,
        required: true,
    },
});
</script>

<style>
.error h1 p.smaller {
    font-weight: normal;
    font-size: 0.5em;
}
.error h1 p.muted {
    color: var(--fg-base-dk);
}
.error h1 p.accent {
    color: var(--fg-secondary);
}
</style>

<style scoped>
.mobileMenu {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.error {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    text-align: center;
}
</style>

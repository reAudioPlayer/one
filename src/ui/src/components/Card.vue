<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="card">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
.card {
    background: var(--background-light);
    border-radius: 1em;
    overflow: hidden;
    padding: 1em;
}
</style>

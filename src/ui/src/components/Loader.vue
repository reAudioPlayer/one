<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="loader">
        <div class="wrap">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
    </div>
</template>

<style scoped>
.loader {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.wrap {
    display: flex;
    gap: 0.5em;
    width: 100px;
    height: 100px;
    align-items: center;
}

.bar {
    height: 100%;
    width: 20%;
    max-height: 20%;
    border-radius: 1000vmax;
    background: var(--fg-base);
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        max-height: 20%;
    }
    30% {
        max-height: 100%;
    }
    60% {
        max-height: 20%;
    }
}

.bar:nth-child(2) {
    animation-delay: 0.1s;
}

.bar:nth-child(3) {
    animation-delay: 0.2s;
}

.bar:nth-child(4) {
    animation-delay: 0.3s;
}

.bar:nth-child(5) {
    animation-delay: 0.4s;
}
</style>

<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div class="image" :style="{ backgroundImage: 'url(' + src + ')' }">
        <div class="filter">
        </div>
        <div class="info">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        src: String
    }
}
</script>

<style lang="scss" scoped>
.filter, .info, .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--font-accent-contrast);
}

.image {
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.filter {
    backdrop-filter: blur(50px);
}
</style>

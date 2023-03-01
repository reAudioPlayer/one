<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { computed } from "vue";
import SlottedMarquee from "./SlottedMarquee.vue";

const props = defineProps({
   artist: {
      type: String,
      required: true
   }
});

const artists = computed(() => props.artist.split(", "));
</script>
<template>
    <SlottedMarquee>
        <span
            v-for="artist in artists"
            class="artist"
        >
            <router-link
                :to="'/artist/' + artist"
            >
                {{artist}}
            </router-link>
        </span>
    </SlottedMarquee>
</template>

<style lang="scss" scoped>
.artist {
    &:not(:last-child)::after {
        content: ", ";
    }

    & > a {
        color: inherit;
        text-decoration: none
    }

    & > a:active, & > a:hover {
        color: inherit;
        text-decoration: underline;
    }
}
</style>

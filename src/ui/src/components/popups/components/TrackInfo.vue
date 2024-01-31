<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import {PropType} from "vue";
import Cover from "../../image/Cover.vue";

interface IIcon {
    name: string;
    onClick (): void;
}

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    icons: {
        type: Array as PropType<IIcon[]>,
        required: true
    }
})
</script>
<template>
<div class="padding-20 playlisteditor">
    <Cover type="playlist" :name="title" :src="cover" class="cover" />
    <div class="details">
        <div class="detailswrapper">
            <span
                v-for="(icon, index) in icons"
                :key="index"
                class="material-icons-round"
                @click="icon.onClick"
            >
                {{icon.name}}
            </span>
        </div>
        <h1>{{title}}</h1>
        <h6>{{subtitle}}</h6>
    </div>
</div>
</template>

<style lang="scss" scoped>
/** TODO: refactor **/

$mobileWidth: 950px;

.playlisteditor {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    align-items: center;

    img {
        width: 20%;
        margin-right: 20px;
        border-radius: 5px;
    }

    @media screen and (max-width: $mobileWidth) {
        flex-direction: column;

        img {
            align-self: center;
            width: 40%;
            margin-right: 0;
        }
    }
}

.playlisteditor>.details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-self: end;
}

.playlisteditor>.details>h1 {
    font-size: 2em;
    margin-top: 10px;
    margin-bottom: 10px;

    @media screen and (max-width: $mobileWidth) {
        font-size: 1.4em;
    }
}

.playlisteditor>.details>.detailswrapper {
    font-size: .8em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    @media screen and (max-width: $mobileWidth) {
        justify-content: center;
    }
}

.playlisteditor>.details>.detailswrapper>.material-icons-round {
    line-height: 15px;
    font-size: 15px;
    cursor: pointer;

    &:not(:first-child) {
        margin-left: 10px;
    }
}

.playlisteditor>.details>h5 {
    font-size: .8em;
    margin: 0;
}
</style>

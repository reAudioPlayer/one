<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <Card class="wrapper drop-shadow-md" with-hover>
        <div class="item">
            <Cover :src="cover" :type="imageType" :name="title" />
            <div>
                <div class="title">
                    <span
                        v-if="![null, 'classic'].includes(playlistType)"
                        class="material-symbols-rounded"
                    >
                        {{ playlistType == "smart" ? "neurology" : "bolt" }}
                    </span>
                    <h4 :title="title">{{ title }}</h4>
                </div>
                <p
                    class="text-muted text-xs hideIfMobile"
                    :title="description"
                    v-html="description"
                />
            </div>
        </div>
    </Card>
</template>

<script lang="ts">
import Cover from "@/components/image/Cover.vue";
import Card from "@/containers/Card.vue";

export default {
    components: { Card, Cover },
    name: "CardWithImageAndText",
    props: {
        cover: String,
        title: String,
        description: String,
        playlistType: {
            type: String,
            default: null,
        },
        imageType: {
            type: String,
            default: "playlist",
        },
    },
};
</script>

<style lang="scss" scoped>
$horizontalWidth: 1200px;
$mobileWidth: 950px;

p.note {
    font-size: 0.7em;
}

div.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    gap: 0.5em;

    h4 {
        margin-top: 0;
    }

    span {
        color: var(--fg-secondary);
    }
}

.wrapper {
    background: var(--bg-base-lt);
    border-radius: 20px;
    min-height: 10vh;
    margin: 10px;
}

.wrapper:hover {
    cursor: pointer;
    background: var(--bg-hover-dk);
}

.item {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: $mobileWidth) {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
    }
}

img {
    width: 100%;
    border-radius: 12px;

    @media screen and (max-width: $mobileWidth) {
        width: 20%;
    }
}

h4 {
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: $mobileWidth) {
        margin-left: 20px;
        margin-top: 0;
    }
}

p {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

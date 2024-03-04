<script setup lang="ts">
import AmbientBackground from "@/components/image/AmbientBackground.vue";
import IconButton from "@/components/inputs/IconButton.vue";
import { usePlayerStore } from "@/store/player";
import Loader from "@/components/Loader.vue";
// @ts-ignore
import { translate } from "google-translate-api-browser";

const playerStore = usePlayerStore();

const displayLine = (index: number) => {
    if (!playerStore.lyrics?.lyrics) {
        return false;
    }

    const currentMs = playerStore.progress * 1000;
    const line = playerStore.lyrics.lyrics[index];

    /**
     * if end != 0, use end time
     * if end == 0, use start time of next line
     */

    const start = parseInt(line.startTimeMs);
    const end = parseInt(line.endTimeMs)
        ? parseInt(line.endTimeMs)
        : parseInt(playerStore.lyrics.lyrics[index + 1]?.startTimeMs);

    if (currentMs >= start && currentMs < end) {
        // scroll to this element
        const el = document.querySelector(`.line:nth-child(${index + 1})`);
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }

        return "current";
    }

    if (currentMs >= end) {
        return "past";
    }

    return "future";
};

const toggleTranslation = (index: number) => {
    const line = playerStore.lyrics!.lyrics[index];
    if (line.originalWorlds) {
        untranslateLine(index);
    } else {
        translateLine(index);
    }
};

const translateLine = async (index: number) => {
    const line = playerStore.lyrics!.lyrics[index];
    if (line.originalWorlds) {
        return;
    }
    const res = await translate(line.words, {
        to: "en",
        corsUrl: "http://localhost:1234/api/cors/",
    });
    line.originalWorlds = line.words;
    line.words = res.text;
};

const untranslateLine = (index: number) => {
    const line = playerStore.lyrics!.lyrics[index];
    if (line.originalWorlds) {
        line.words = line.originalWorlds;
        line.originalWorlds = null;
    }
};

const translateAll = () => {
    playerStore.lyrics?.lyrics?.forEach((line, index) => {
        translateLine(index);
    });
};

const untranslateAll = () => {
    playerStore.lyrics?.lyrics?.forEach((line, index) => {
        untranslateLine(index);
    });
};

const showUntranslateAll = () => {
    const nTranslated = playerStore.lyrics?.lyrics?.filter(
        (line) => line.originalWorlds
    ).length;
    // > 50%
    return nTranslated && nTranslated > playerStore.lyrics?.lyrics?.length / 2;
};
</script>
<template>
    <AmbientBackground :src="playerStore.song.cover" />
    <div
        v-if="!playerStore.lyrics || playerStore.lyrics?.error"
        class="fill-page"
    >
        <h1 v-if="playerStore.lyrics?.error">
            {{ playerStore.lyrics?.error }}
        </h1>
        <Loader v-else />
    </div>
    <div class="w-full flex flex-row justify-end">
        <IconButton
            v-if="playerStore.lyrics?.lyrics"
            icon="translate"
            :label="showUntranslateAll() ? 'Show original' : 'Translate all'"
            class="mr-2"
            @click="showUntranslateAll() ? untranslateAll() : translateAll()"
        />
    </div>
    <div class="lyrics" v-if="playerStore.lyrics?.lyrics">
        <div
            v-for="(line, index) in playerStore.lyrics?.lyrics"
            class="line"
            :class="displayLine(index)"
            @click="playerStore.seek(parseInt(line.startTimeMs) / 1000)"
        >
            {{ line.words }}

            <span
                class="material-symbols-rounded translate"
                :class="{ translated: line.originalWorlds }"
                @click.stop="toggleTranslation(index)"
            >
                translate
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lyrics {
    display: flex;
    flex-direction: column;
    align-items: center;

    .line {
        --color: var(--fg-base);
        color: var(--color);
        font-size: 2rem;
        font-weight: 500;
        line-height: 2;
        width: min(100%, 50ch);
        cursor: pointer;
        position: relative;

        &.current {
            --color: var(--fg-secondary);
        }

        &.past {
            --color: var(--fg-base-dk);
        }

        .translate {
            position: absolute;
            right: 1em;
            top: 50%;
            transform: translateY(-50%);

            &:not(.translated) {
                display: none;
            }
        }

        &:hover {
            --color: var(--fg-secondary);

            .translate {
                display: inherit;
            }
        }
    }
}
</style>

<script setup lang=ts>
import { usePlayerStore } from '../../store/player';

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
    const end = parseInt(line.endTimeMs) ? parseInt(line.endTimeMs) : parseInt(playerStore.lyrics.lyrics[index + 1]?.startTimeMs);

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
    };

    if (currentMs >= end) {
        return "past";
    };

    return "future";
};
</script>
<template>
    <div v-if="playerStore.lyrics?.error" class="fill-page">
        <h1>
            {{ playerStore.lyrics?.error }}
        </h1>
    </div>
    <div class="lyrics" v-if="playerStore.lyrics?.lyrics">
        <div
            v-for="(line, index) in playerStore.lyrics?.lyrics"
            class="line"
            :class="displayLine(index)"
        >
            {{ line.words }}
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
        width: min(100%, 60ch);

        &.current {
            --color: var(--fg-secondary);
        }

        &.past {
            --color: var(--fg-base-dk);
        }
    }
}
</style>

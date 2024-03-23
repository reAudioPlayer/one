<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { version } from "../../../../package.json";
import Markdown from "../../../components/popups/Markdown.vue";

const BACKEND_VERSION = "1.0.0";

const latestVersion = ref("");
const changes = ref("");

onMounted(async () => {
    const res = await fetch(
        "https://api.github.com/repos/reAudioPlayer/one/releases/latest"
    );
    const data = await res.json();
    latestVersion.value = data.tag_name;
    changes.value = data.body;
});

const isLatest = computed(() => latestVersion.value === BACKEND_VERSION);

const build = computed(() => version.split(".").pop());

const changelog = ref(null);
</script>
<template>
    <div class="flex flex-col">
        <Markdown
            v-if="changes"
            :content="changes"
            :title="'What\'s new in ' + latestVersion"
            ref="changelog"
            @close="() => (changes = '')"
        />

        <span>
            <strong>v{{ BACKEND_VERSION }}</strong>
            (Build {{ build }})
        </span>
        <template v-if="latestVersion">
            <span
                v-if="isLatest"
                class="text-sm flex items-center gap-2 latest"
            >
                <span class="material-symbols-rounded">check</span>
                You're on the latest version
                <a class="cursor-pointer" @click="changelog?.show()">
                    What's changed?
                </a>
            </span>
            <span v-else class="text-sm flex items-center gap-2 update">
                <span class="material-symbols-rounded">update</span>
                Update available: {{ latestVersion }}
                <a class="cursor-pointer" @click="changelog?.show()">
                    What's changed?
                </a>
            </span>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.latest {
    --color: var(--success);
}

.update {
    --color: var(--warning);
}

span {
    color: var(--color);
}

a:hover {
    color: inherit;
    font-weight: bold;
}
</style>

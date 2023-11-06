<script setup lang="ts">
import {onMounted} from "vue";
import Card from "../../containers/Card.vue";
import { createPlaylist } from "../../api/playlist";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const create = async (type: string) => {
    const playlist = await createPlaylist(type);
    router.push(playlist);
};

onMounted(() => {
    if (route.query.type) {
        create(route.query.type as string);
    }
});
</script>
<template>
    <div class="flex h-full w-full items-center justify-center">
        <div class="types">
            <Card with-hover class="cursor-pointer" @click="create('classic')">
                <div class="flex flex-row justify-center">
                    <span class="text-9xl material-symbols-rounded icon"
                        >library_music</span
                    >
                </div>
                <h4>Classic Playlist</h4>
                <p class="text-sm text-muted">Manage your playlist manually</p>
            </Card>
            <Card with-hover class="cursor-pointer" @click="create('smart')">
                <div class="flex flex-row justify-center">
                    <span class="text-9xl material-symbols-rounded icon"
                        >bolt</span
                    >
                </div>
                <h4>Smart Playlist</h4>
                <p class="text-sm text-muted">
                    Define rules to automatically update your playlist
                </p>
            </Card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
    gap: 1rem;
    min-width: 800px;

    > div {
        padding: 1em;
    }
}

.icon {
    color: var(--fg-secondary);
}
</style>

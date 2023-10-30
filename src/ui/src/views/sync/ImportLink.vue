<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISyncableOne, importSyncables, type ISyncablePlaylist } from './collection';
import Card from '../../containers/Card.vue';
import IconButton from '../../components/inputs/IconButton.vue';

const route = useRoute();
const router = useRouter();

const who = ref('');
const what = ref<ISyncableOne[]>([]);

onMounted(async () => {
    const base64 = route.params.id as string;
    const str = atob(base64);
    const [type, ...data] = str.split(':');

    if (type === "gist") {
        const [user, gist, file] = data;
        const url = `https://gist.githubusercontent.com/${user}/${gist}/raw/${file}`;

        const res = await fetch(url);
        const jdata = await res.json();

        what.value = [jdata];
        who.value = user;
    }
})

const confirm = async () => {
    await importSyncables(what.value);
    router.push('/');
}
</script>
<template>
    <div class="max-w-[60ch] w-full h-full flex items-center justify-center">
        <div class="flex-col">
            <strong>{{ who }}</strong> wants to share:
            <span v-if="what.length == 0" class="text-muted italic text-sm">Nothing</span>
            <Card class="p-4 mt-4 w-max flex flex-col gap-4" v-else>
                <ul class="ml-0">
                    <li v-for="item in what" class="flex gap-2 items-center">
                        <span class="text-muted uppercase text-sm">{{ item.type }}</span>
                        {{ (item as ISyncablePlaylist).playlist.name }}
                        <span class="material-symbols-rounded cursor-pointer"
                              @click="what.splice(what.indexOf(item), 1)"
                        >
                            delete
                        </span>
                    </li>
                </ul>
                <div class="buttons flex gap-2">
                    <IconButton
                        type="success"
                        icon="check"
                        label="Accept"
                        @click="confirm"
                    />
                    <IconButton
                        type="danger"
                        icon="close"
                        label="Reject"
                        @click="router.push('/')"
                    />
                </div>
            </Card>
        </div>
    </div>
</template>
<style scoped>
.buttons {
    border-top: var(--border-container);
}
</style>

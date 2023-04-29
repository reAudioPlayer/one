/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import {usePlayerStore} from "./player";
import {useDataStore} from "./data";
import {useDownloaderStore} from "./downloader";

export const initialiseStores = () => {
    usePlayerStore().initialise();
    useDataStore().fetchPlaylists();
    useDownloaderStore().initialise();
}

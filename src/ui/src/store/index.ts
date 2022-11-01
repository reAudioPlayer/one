import {usePlayerStore} from "./player";
import {useDataStore} from "./data";

export const initialiseStores = () => {
    useDataStore().initialise();
    usePlayerStore().initialise();
}
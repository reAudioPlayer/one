import {usePlayerStore} from "./player";
import {useDataStore} from "./data";

export const initialiseStores = () => {
    usePlayerStore().initialise();
}
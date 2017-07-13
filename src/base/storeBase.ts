
import {Base} from "./base";

/**
 * Class StoreBase
 * @extends Base
 */
export class StoreBase extends Base {
    public id: string;
}

/**
 * @interface Store
 */
export interface IStore {
    state: Object;
    getters: {[type: string]: Function};
    mutations: {[type: string]: Function};
    actions: {[type: string]: Function};
}

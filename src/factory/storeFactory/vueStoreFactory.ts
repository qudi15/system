import { StoreFactoryBase } from "./storeFactoryBase";
import { IStore } from "../../base/storeBase";

interface IWindowWithVuex extends Window {
    Vuex: any;
}

/**
 * Class VueStoreFactory
 * @extends StoreFactoryBase
 */
export class VueStoreFactory extends StoreFactoryBase {

    /**
     * @protected
     * @param {String} moduleId - Module id.
     * @param {Function} constructor - Store constructor.
     */
    protected createStore(moduleId: string, constructor: any): Promise<IStore> {
        const ins = new constructor();
        this.cache[moduleId] = Promise.resolve(ins);
        this.instanceCache[moduleId] = Promise.resolve(new (window as IWindowWithVuex).Vuex.Store(ins));
        return this.instanceCache[moduleId];
    }
}

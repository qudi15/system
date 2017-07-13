import { FactoryBase } from "../base";
import { StoreBase } from "../../base/index";
import { IStore } from "../../base/storeBase";

/**
 * Class StoreFactoryBase
 * @extends FactoryBase
 */
export class StoreFactoryBase extends FactoryBase {
    protected cache: {[moduleId: string]: Promise<IStore>};

    /**
     * @public
     * @param {Function} constructor - Store constructor.
     * @param {String} moduleId - Module id.
     * @return {Promise<StoreBase>}
     */
    public put(constructor: any, moduleId: string): Promise<IStore> {
        if (!this.cache[moduleId]) {
            this.cache[moduleId] = this.createStore(moduleId, constructor);
        }

        return this.cache[moduleId];
    }

    protected createStore(id: string, constructor: Function): any {}
}

import { FactoryBase } from "../base";
/**
 * Class StoreFactoryBase
 * @extends FactoryBase
 */
export class StoreFactoryBase extends FactoryBase {
    /**
     * @public
     * @param {Function} constructor - Store constructor.
     * @param {String} moduleId - Module id.
     * @return {Promise<StoreBase>}
     */
    put(constructor, moduleId) {
        if (!this.instanceCache[moduleId]) {
            this.instanceCache[moduleId] = this.createStore(moduleId, constructor);
        }
        return this.instanceCache[moduleId];
    }
    createStore(id, constructor) { }
}
//# sourceMappingURL=storeFactoryBase.js.map
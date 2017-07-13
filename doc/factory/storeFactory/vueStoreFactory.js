import { StoreFactoryBase } from "./storeFactoryBase";
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
    createStore(moduleId, constructor) {
        const ins = new constructor();
        this.cache[moduleId] = Promise.resolve(ins);
        this.instanceCache[moduleId] = Promise.resolve(new window.Vuex.Store(ins));
        return this.instanceCache[moduleId];
    }
}
//# sourceMappingURL=vueStoreFactory.js.map
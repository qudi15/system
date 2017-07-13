import { Base } from "../base/index";
/**
 * Class FactoryBase
 * @extends Base
 */
export class FactoryBase extends Base {
    put(namespance, parent) { }
    /**
     * @public
     * @param {String} id - id
     * @description Delete from cache.
     */
    del(id) {
        delete this.cache[id];
        delete this.instanceCache[id];
    }
    /**
     * @public
     * @description Clear all cache.
     */
    clear() { }
    constructor() {
        super();
        this.cache = {};
        this.instanceCache = {};
    }
    /**
     * @public
     * @param {String} id - id
     * @return {Object}
     * @description Get from cache.
     */
    get(id) {
        return {
            instance: this.instanceCache[id],
            constructor: this.cache[id]
        };
    }
}
//# sourceMappingURL=base.js.map
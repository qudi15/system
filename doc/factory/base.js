import { Base } from "../base/index";
/**
 * Class FactoryBase
 * @extends Base
 */
export class FactoryBase extends Base {
    put(namespance, parent) { }
    del() { }
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
     */
    get(id) {
        return {
            instance: this.instanceCache[id],
            constructor: this.cache[id]
        };
    }
}
//# sourceMappingURL=base.js.map
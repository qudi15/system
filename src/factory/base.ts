import { Base } from "../base/index";

/**
 * Class FactoryBase
 * @extends Base
 */
export class FactoryBase extends Base {

    protected cache: {[id: string]: Promise<any>};
    protected instanceCache: {[id: string]: Promise<any>};

    public put(namespance: any, parent?: any): any {}

    /**
     * @public
     * @param {String} id - id
     * @description Delete from cache.
     */
    public del(id: string) {
        delete this.cache[id];
        delete this.instanceCache[id];
    }

    /**
     * @public
     * @description Clear all cache.
     */
    public clear() {}

    public constructor() {
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
    public get(id: string) {
        return {
            instance: this.instanceCache[id],
            constructor: this.cache[id]
        };
    }
}

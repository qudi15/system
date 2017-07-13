import { FactoryBase } from "../base";

/**
 * Class ServiceFactoryBase
 * @extends FactoryBase
 */
export class ServiceFactoryBase extends FactoryBase {

    protected instanceCache: {[serviceName: string]: Promise<Function>};

    constructor() {
        super();
    }

    /**
     * @public
     * @param {Function} service - Service function.
     * @param {String} moduleId - Module id.
     * @return {Promise<Function>}
     */
    public put(service: Function, moduleId: string): Promise<any> {
        const instanceCache = this.instanceCache;
        if (!instanceCache[moduleId]) { instanceCache[moduleId] = Promise.resolve(service); }
        return instanceCache[moduleId];
    }
}

import { FactoryBase } from "../base";

/**
 * Class ServiceFactoryBase
 * @extends FactoryBase
 */
export class ServiceFactoryBase extends FactoryBase {

    protected instanceCache: {
        [moduleId: string]: {[serviceName: string]: Promise<Function>}
    };

    constructor() {
        super();
        (window as any).serviceFactory = this;
    }

    /**
     * @public
     * @param {Function} service - Service function.
     * @param {String} moduleId - Module id.
     * @return {Promise<Function>}
     */
    public put(service: Function, moduleId: string): Promise<any> {
        const instanceCache = this.instanceCache;
        if (!instanceCache[moduleId]) {
            instanceCache[moduleId] = {};
        }
        instanceCache[moduleId][service.name] = Promise.resolve(service);
        return instanceCache[moduleId][service.name];
    }
}

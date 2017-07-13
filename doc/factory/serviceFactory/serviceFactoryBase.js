import { FactoryBase } from "../base";
/**
 * Class ServiceFactoryBase
 * @extends FactoryBase
 */
export class ServiceFactoryBase extends FactoryBase {
    constructor() {
        super();
    }
    /**
     * @public
     * @param {Function} service - Service function.
     * @param {String} moduleId - Module id.
     * @return {Promise<Function>}
     */
    put(service, moduleId) {
        const instanceCache = this.instanceCache;
        if (!instanceCache[moduleId]) {
            instanceCache[moduleId] = Promise.resolve(service);
        }
        return instanceCache[moduleId];
    }
}
//# sourceMappingURL=serviceFactoryBase.js.map
import { FactoryBase } from "../base";
/**
 * Class ServiceFactoryBase
 * @extends FactoryBase
 */
export class ServiceFactoryBase extends FactoryBase {
    constructor() {
        super();
        window['ServiceFactory'] = this;
    }
    /**
     * @public
     * @param {Function} service - Service function.
     * @param {String} moduleId - Module id.
     * @return {Promise<Function>}
     */
    put(service, moduleId) {
        var instanceCache = this.instanceCache;
        if (!instanceCache[moduleId]) {
            instanceCache[moduleId] = {};
        }
        var moduleServicesCache = instanceCache[moduleId];
        moduleServicesCache[service.name] = service;
        return Promise.resolve(service);
    }
}
//# sourceMappingURL=serviceFactoryBase.js.map
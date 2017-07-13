import { FactoryBase } from "../base";

/**
 * Class ServiceFactoryBase
 * @extends FactoryBase
 */
export class ServiceFactoryBase extends FactoryBase {

    constructor(){
        super();
        (<any>window)['ServiceFactory'] = this;
    }

    /**
     * @public
     * @param {Function} service - Service function.
     * @param {String} moduleId - Module id.
     * @return {Promise<Function>} 
     */
    put(service: Function, moduleId: string): Promise<any>{
        var instanceCache = this.instanceCache;
        if(!(<any>instanceCache)[moduleId]){(<any>instanceCache)[moduleId] = {};}
        var moduleServicesCache = (<any>instanceCache)[moduleId];
        moduleServicesCache[(<any>service).name] = service;
        return Promise.resolve(service);
    }
}
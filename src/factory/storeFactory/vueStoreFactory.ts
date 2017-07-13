import { StoreFactoryBase } from './storeFactoryBase';

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
    protected createStore(moduleId: string, constructor: any){
        let ins = new constructor();
        (<any>this.cache)[moduleId] = Promise.resolve(ins);
        (<any>this.instanceCache)[moduleId] = Promise.resolve(new (<any>window)['Vuex'].Store(ins));
        return (<any>this.instanceCache)[moduleId];
    }

}
import { FactoryBase } from "../base";
import { StoreBase } from "../../base/index";

/**
 * Class StoreFactoryBase
 * @extends FactoryBase
 */
export class StoreFactoryBase extends FactoryBase {
    cache: Array<StoreBase>;

    /**
     * @public
     * @param {Function} constructor - Store constructor.
     * @param {String} moduleId - Module id.
     * @return {Promise<StoreBase>}
     */
    put(constructor: any, moduleId: string){
        if(!(<any>this.instanceCache)[moduleId]){
            (<any>this.instanceCache)[moduleId] = this.createStore(moduleId, constructor);
        }

        return (<any>this.instanceCache)[moduleId];
    }

    protected createStore(id: string, constructor: Function){}
}
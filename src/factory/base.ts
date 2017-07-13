import { Base } from "../base/index";

/**
 * Class FactoryBase
 * @extends Base
 */
export class FactoryBase extends Base {
    cache: Object;
    instanceCache: Object;
    put(namespance: any, parent?: any): any {}
    del(){}
    clear(){}

    constructor(){
        super();
        this.cache = {};
        this.instanceCache = {};
    }

    /**
     * @public
     * @param {String} id - id
     * @return {Object}
     */
    get(id: string){
        return {
            instance: (<any>this.instanceCache)[id],
            constructor: (<any>this.cache)[id]
        };
    }
}

import { Base } from "./base";

/**
 * Decorator Module
 */
export function Module(options: Object){
    return function(constructor: Function){
        constructor.prototype.options = options;
    }
}

/**
 * Class ModuleBase
 * @extends Base
 */
export class ModuleBase extends Base {
    /** 
     * @constructs 
     * @param {string} id - The module id.
     */
    constructor(
        public id: string
    ){
        super();
    }
}
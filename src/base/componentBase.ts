/**
 * ComponentBase
 * Author: Eddy
 * Last modified: 2017.7.6
 */

import Base from "./base";

export function Component(options: Object){
    return function(constructor: Function){
        constructor.prototype.options = options;
    }
}

export class ComponentBase extends Base {
    beforeMount(){}
    Mounted(){}
    BeforeUpdate(){}
    Updated(){}
}
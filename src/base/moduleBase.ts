import Base from "./base";

export function Module(options: Object){
    return function(constructor: Function){
        constructor.prototype.options = options;
    }
}

export class ModuleBase extends Base {
    constructor(
        public id: string
    ){
        super();
    }
}
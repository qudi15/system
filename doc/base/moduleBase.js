import { Base } from "./base";
/**
 * Decorator Module
 */
export function Module(options) {
    return function (constructor) {
        constructor.prototype.options = options;
    };
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
    constructor(id) {
        super();
        this.id = id;
    }
}
//# sourceMappingURL=moduleBase.js.map
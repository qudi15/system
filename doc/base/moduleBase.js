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
 * @example <caption>Minimal module</caption>
 * import Main from './components/main/index'
 * import { Module, ModuleBase } from 'system/base/moduleBase';
 * '@'Module({
 *   id: 'app', //Module identity name
 *   components: [ Main ], //Components to declare
 *   bootStrap: Main //Main component like module view.
 * })
 * export default class MainModule extends ModuleBase {}
 *
 * @example <caption>Complex module</caption>
 * import Main from './components/main/index'
 * import { Module, ModuleBase } from 'system/base/moduleBase';
 * import { getSth, postSth } from './services/index';
 * import Store from './store/index';
 * '@'Module({
 *   id: 'app',
 *   components: [ Main ],
 *   modules: ['pa'], //Dependent modules identity name.
 *   services: [ getSth, postSth ], //Services you want to share.
 *   store: Store,//Data store.
 *   bootStrap: Main
 * })
 * export default class MainModule extends ModuleBase {}
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
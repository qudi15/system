import { Base } from "./base";
/**
 * @decorator Component
 */
export function Component(options) {
    return (constructor) => {
        constructor.prototype.options = options;
    };
}
/**
 * Class ComponentBase
 * @extends Base
 * @description base component class. more detail.{@link https://vuejs.org/v2/api/ VueJs}.
 * @example <caption>Minimal component</caption>
 * import { Component, ComponentBase } from "system/base/componentBase";
 * '@'Component({
 *   name:"app-main",
 *   template: "<div>hello world!</div>"
 * })
 * export default class MainComponent extends ComponentBase {}
 *
 * @example <caption>Minimal component</caption>
 * require('./style.css');
 * import { Component, ComponentBase } from "system/base/componentBase";
 * '@'Component({
 *   name:"app-main",
 *   template: "<div>{{count}}</div>"
 * })
 * export default class MainComponent extends ComponentBase {
 *  //If you declare your store, service and modules in modules file, these will be passed by props
 *   props = ['service', 'store'];
 *   computed = {
 *     count: function(){
 *       return this.store.app.getters.count;
 *     }
 *   }
 * }
 */
export class ComponentBase extends Base {
    /**
     * Component life cycle hook.
     */
    beforeMount() { }
    /**
     * Component life cycle hook.
     */
    mounted() { }
    /**
     * Component life cycle hook.
     */
    beforeUpdate() { }
    /**
     * Component life cycle hook.
     */
    updated() { }
    /**
     * Component life cycle hook.
     */
    activated() { }
    /**
     * Component life cycle hook.
     */
    deactivated() { }
}
//# sourceMappingURL=componentBase.js.map
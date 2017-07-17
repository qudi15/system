
import { Base } from "./base";

/**
 * @interface ComponentOptions
 */
export interface IComponentOptions {
    name: string;
    template: string;
}

/**
 * @interface ComponentConstructor
 */
export interface IComponentConstructor {
    prototype: {
        options: IComponentOptions
    };
}

/**
 * @decorator Component
 */
export function Component(options: IComponentOptions) {
    return (constructor: IComponentConstructor) => {
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

    public name: string;
    /**
     * Component life cycle hook.
     */
    public beforeMount() {}
    /**
     * Component life cycle hook.
     */
    public mounted() {}
    /**
     * Component life cycle hook.
     */
    public beforeUpdate() {}
    /**
     * Component life cycle hook.
     */
    public updated() {}
    /**
     * Component life cycle hook.
     */
    public activated() {}
    /**
     * Component life cycle hook.
     */
    public deactivated() {}
}

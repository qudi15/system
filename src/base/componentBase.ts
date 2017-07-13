
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
 * @description base component class
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

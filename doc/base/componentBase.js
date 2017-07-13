import { Base } from "./base";
/**
 * @decorator Component
 */
export function Component(options) {
    return function (constructor) {
        constructor.prototype.options = options;
    };
}
/**
 * Class ComponentBase
 * @extends Base
 * @description base component class
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
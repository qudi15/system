import { ComponentFactoryBase } from "./componentFactoryBase";
import { mixin } from "../../util/util";
/**
 * Class VueComponentFactory
 * @extends ComponentFactoryBase
 */
export class VueComponentFactory extends ComponentFactoryBase {
    constructor() {
        super();
        this.instanceCache = {};
        window.componentFactory = this;
    }
    /**
     * @public
     * @param {Object} options - Component options.
     * @param {String} selector - querySelector.
     * @return {VueComponentInstance} Vue component instance.
     */
    boot(options, selector) {
        return new window.Vue(options).$mount(selector);
    }
    /**
     * @public
     * @param {Object} options - Component options.
     * @param? {Object} service - Services need to be passed on to main component.
     * @param? {Object} store - Stores need to be passed on to main component.
     * @return {Object} New component options.
     */
    changeComponentToModuleView(options, service, store) {
        const tag = options.name;
        service = service ? service : {};
        store = store ? store : {};
        return {
            name: "",
            data: () => {
                return {
                    service,
                    store
                };
            },
            template: `<div><${tag} :service="service" :store="store"></${tag}></div>`
        };
    }
    /**
     * @protected
     * @param {String} tagName - Component tag name.
     * @param {Function} constructor - Component constructor.
     * @return {Promise<ComponentBase>}
     */
    createComponent(tagName, constructor) {
        const ins = new constructor();
        return Promise.resolve(ins);
    }
    /**
     * @protected
     * @param {IComponentOptions} options - Component options.
     * @param {IComponentConstructor} constructor - Component constructor.
     * @return {IComponentOptions} New component options.
     */
    exchange(options, constructor) {
        mixin(options, constructor.prototype.options);
        this.exchangeData(options);
        this.cloneLifecycleHook(options);
        return options;
    }
    /**
     * @private
     * @param {IComponentOptions} options - Component options.
     * @return {IComponentOptions} New component options.
     */
    exchangeData(options) {
        const data = options.data;
        if (data) {
            options.data = data;
        }
        return options;
    }
    /**
     * @private
     * @param {IComponentOptions} options - Component options.
     * @return {IComponentOptions} New component options.
     */
    cloneLifecycleHook(options) {
        ["beforeCreate",
            "created",
            "beforeMount",
            "mounted",
            "beforeUpdate",
            "updated",
            "activated",
            "deactivated",
            "beforeDestroy",
            "destroyed"].forEach((hook) => {
            if (options[hook] != null) {
                options[hook] = options[hook];
            }
        });
        return options;
    }
    /**
     * @protected
     * @param {String} tagName - Component tag name.
     * @param {Object} options - Component options.
     * @return {Function} Component constructor.
     */
    register(tagName, options) {
        return window.Vue.component(tagName, options);
    }
}
//# sourceMappingURL=vueComponentFactory.js.map
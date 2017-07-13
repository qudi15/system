import { ComponentFactoryBase } from './componentFactoryBase';
import { mixin } from "../../util/util";
/**
 * Class VueComponentFactory
 * @extends ComponentFactoryBase
 */
export class VueComponentFactory extends ComponentFactoryBase {
    constructor() {
        super();
        this.instanceCache = {};
        window['componentFactory'] = this;
    }
    /**
     * @public
     * @param {Object} options - Component options.
     * @param {String} selector - querySelector.
     * @return {VueComponentInstance} Vue component instance.
     */
    boot(options, selector) {
        return new window['Vue'](options).$mount(selector);
    }
    /**
     * @public
     * @param {Object} options - Component options.
     * @param? {Object} service - Services need to be passed on to main component.
     * @param? {Object} store - Stores need to be passed on to main component.
     * @return {Object} New component options.
     */
    changeComponentToModuleView(options, service, store) {
        var tag = options.name;
        service = service ? service : {};
        store = store ? store : {};
        return {
            template: `<div><${tag} :service="service" :store="store"></${tag}></div>`,
            data: function () {
                return {
                    service,
                    store
                };
            }
        };
    }
    /**
     * @protected
     * @param {String} tagName - Component tag name.
     * @param {Function} constructor - Component constructor.
     * @return {Promise<ComponentBase>}
     */
    createComponent(tagName, constructor) {
        var ins = new constructor();
        this.instanceCache[tagName] = Promise.resolve(ins);
        return this.instanceCache[tagName];
    }
    /**
     * @protected
     * @param {Object} options - Component options.
     * @param {Function} constructor - Component constructor.
     * @return {Object} New component options.
     */
    exchange(options, constructor) {
        mixin(options, constructor.prototype.options);
        this.exchangeData(options);
        this.cloneLifecycleHook(options);
        return options;
    }
    /**
     * @private
     * @param {Object} options - Component options.
     * @return {Object} New component options.
     */
    exchangeData(options) {
        var data = options.data;
        data && (options.data = data);
        return options;
    }
    /**
     * @private
     * @param {Object} options - Component options.
     * @return {Object} New component options.
     */
    cloneLifecycleHook(options) {
        ['beforeCreate',
            'created',
            'beforeMount',
            'mounted',
            'beforeUpdate',
            'updated',
            'activated',
            'deactivated',
            'beforeDestroy',
            'destroyed'].forEach((hook) => {
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
        return window['Vue'].component(tagName, options);
    }
}
//# sourceMappingURL=vueComponentFactory.js.map
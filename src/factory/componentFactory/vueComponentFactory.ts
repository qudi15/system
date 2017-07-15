import { ComponentFactoryBase } from "./componentFactoryBase";
import { mixin } from "../../util/util";
import { IComponentOptions, IComponentConstructor, ComponentBase } from "../../base/componentBase";

interface IWindowWithVue extends Window {
    Vue: any;
}

/**
 * Class VueComponentFactory
 * @extends ComponentFactoryBase
 */
export class VueComponentFactory extends ComponentFactoryBase {

    protected instanceCache: {[tagName: string]: Promise<IComponentOptions>};

    constructor() {
        super();
        this.instanceCache = {};
        (window as any).componentFactory = this;
    }
    /**
     * @public
     * @param {Object} options - Component options.
     * @param {String} selector - querySelector.
     * @return {VueComponentInstance} Vue component instance.
     */
    public boot(options: any, selector: string) {
        return new (window as IWindowWithVue).Vue(options).$mount(selector);
    }

    /**
     * @public
     * @param {Object} options - Component options.
     * @param? {Object} service - Services need to be passed on to main component.
     * @param? {Object} store - Stores need to be passed on to main component.
     * @return {Object} New component options.
     */
    public changeComponentToModuleView(options: any, service?: Object, store?: Object) {
        const tag: string = options.name;
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
        } as IComponentOptions;
    }

    /**
     * @protected
     * @param {String} tagName - Component tag name.
     * @param {Function} constructor - Component constructor.
     * @return {Promise<ComponentBase>}
     */
    protected createComponent(tagName: string, constructor: IComponentConstructor): Promise<IComponentOptions> {
        const ins: IComponentOptions = new (constructor as any)();
        return Promise.resolve(ins);
    }

    /**
     * @protected
     * @param {IComponentOptions} options - Component options.
     * @param {IComponentConstructor} constructor - Component constructor.
     * @return {IComponentOptions} New component options.
     */
    protected exchange(options: IComponentOptions, constructor: IComponentConstructor) {
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
    private exchangeData(options: any) {
        const data = options.data;
        if (data) { options.data = data; }
        return options;
    }

    /**
     * @private
     * @param {IComponentOptions} options - Component options.
     * @return {IComponentOptions} New component options.
     */
    private cloneLifecycleHook(options: any) {
        ["beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "activated",
        "deactivated",
        "beforeDestroy",
        "destroyed"].forEach((hook: string) => {
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
    protected register(tagName: string, options: IComponentOptions) {
        return (window as IWindowWithVue).Vue.component(tagName, options);
    }
}

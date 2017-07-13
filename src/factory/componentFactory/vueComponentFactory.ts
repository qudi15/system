import { ComponentFactoryBase } from './componentFactoryBase';
import { mixin } from "../../util/util";


/**
 * Class VueComponentFactory
 * @extends ComponentFactoryBase
 */
export class VueComponentFactory extends ComponentFactoryBase {

    instanceCache: Object;

    constructor(){
        super();
        this.instanceCache = {};
        (<any>window)['componentFactory'] = this;
    }
    /**
     * @public
     * @param {Object} options - Component options.
     * @param {String} selector - querySelector.
     * @return {VueComponentInstance} Vue component instance.
     */
    boot(options: any, selector: string){
        return new (<any>window)['Vue'](options).$mount(selector);
    }

    /**
     * @public
     * @param {Object} options - Component options.
     * @param? {Object} service - Services need to be passed on to main component.
     * @param? {Object} store - Stores need to be passed on to main component.
     * @return {Object} New component options.
     */
    changeComponentToModuleView(options: any, service?: Object, store?: Object){
        var tag:string = options.name;
        service = service ? service : {};
        store = store ? store : {};
        return {
            template: `<div><${tag} :service="service" :store="store"></${tag}></div>`,
            data: function(){
                return {
                    service,
                    store
                }
            }
        };
    }
    
    /**
     * @protected
     * @param {String} tagName - Component tag name.
     * @param {Function} constructor - Component constructor.
     * @return {Promise<ComponentBase>}
     */
    protected createComponent(tagName: string, constructor: Function): Promise<any> {
        var ins = new (<any>constructor)();
        (<any>this.instanceCache)[tagName] = Promise.resolve(ins);
        return (<any>this.instanceCache)[tagName];
    }

    /**
     * @protected
     * @param {Object} options - Component options.
     * @param {Function} constructor - Component constructor.
     * @return {Object} New component options.
     */
    protected exchange(options: any, constructor: Function){
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
    private exchangeData(options: any){
        var data = options.data;
        data && (options.data = data);
        return options;
    }

    /**
     * @private
     * @param {Object} options - Component options.
     * @return {Object} New component options.
     */
    private cloneLifecycleHook(options: any){
        ['beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'activated',
        'deactivated',
        'beforeDestroy',
        'destroyed'].forEach((hook: string) => {
            if(options[hook] != null){
                options[hook] = options[hook];
            }
        })
        return options;
    }

    /**
     * @protected
     * @param {String} tagName - Component tag name.
     * @param {Object} options - Component options.
     * @return {Function} Component constructor.
     */
    protected register(tagName: string, options: Object){
        return (<any>window)['Vue'].component(tagName, options);
    }
}
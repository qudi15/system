import { ModuleBase } from "../../base/index";
import { ComponentFactory, ModuleFactoryBase, ServiceFactory, StoreFactory } from "../index";
import { Loader } from "../../loader/index";

/**
 * Class VueModuleFactory
 * @extends ModuleFactoryBase
 */
export class VueModuleFactory extends ModuleFactoryBase {

    /**
     * @constructs
     * @param{Loader} loader - File loader.
     * @param{ComponentFactory} componentFactory - Component factory.
     * @param{ServiceFactory} serviceFactory - Service factory.
     * @param{StoreFactory} storeFactory - Store factory.
     */
    constructor(protected loader: Loader, protected componentFactory: ComponentFactory, private serviceFactory: ServiceFactory, private storeFactory: StoreFactory){
        super(loader);
        this.instanceCache = {};
        (<any>window)['moduleFactory'] = this;
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>}
     */
    protected createServices(constructor: Function){
        var options = constructor.prototype.options;
        var services = options.services || [];
        var id = options.id;
        var servicesP = Promise.all(services.map((service: Function) => this.serviceFactory.put(service, id)));
        var moduleInstanceP = (<any>this.instanceCache)[id];
        return Promise.all([
            moduleInstanceP,
            servicesP
        ]).then(([moduleInstance, services]) => {
            moduleInstance.services = services;
            return moduleInstance;
        });
    }

    /**
     * @protected
     * @param {ModuleBase} moduleInstance - Module instance.
     * @param {ModuleBase[]} deps - Dependence of module.
     * @return {Promise<ModuleBase>}
     */
    protected changeComponentToModuleView(moduleInstance: any, deps: Array<any>){
        var depT = deps.concat(moduleInstance).reduce(({ services, stores } , dep: any) => {
            let id = dep.id;
            (<any>services)[id] = dep.services.reduce((res: any, service: Function) => {
                res[(<any>service).name] = service;
                return res;
            }, {});
            (<any>stores)[id] = dep.store;
            return { services, stores };
        }, { services:{}, stores: {} });
        var mainComponent = moduleInstance.bootStrap;
        moduleInstance.moduleView = this.componentFactory.changeComponentToModuleView(mainComponent, depT.services, depT.stores);
        return Promise.resolve(moduleInstance);
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>}
     */
    protected createStore(constructor: Function){
        var options = constructor.prototype.options;
        var id = options.id;
        var store = options.store;
        var moduleInstanceP = (<any>this.instanceCache)[id];
        var storeP = this.storeFactory.put(store, id);
        return Promise.all([
            moduleInstanceP,
            storeP
        ]).then(([moduleInstance, store]) => {
            moduleInstance.store = store;
            return moduleInstance;
        })
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * return {Promise<ModuleBase>}
     */
    protected createMainComponent(constructor: Function){
        var options = constructor.prototype.options;
        var id = options.id;
        var mainComponent = options.bootStrap;
        var moduleInstanceP = (<any>this.instanceCache)[id];
        var componentP = this.componentFactory.put(mainComponent, id);
        return Promise.all([
            moduleInstanceP,
            componentP
        ]).then(([moduleInstance, componentInstance]) => {
            moduleInstance.bootStrap = componentInstance;
            return moduleInstance;
        });
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>} 
     */
    protected createModule(constructor: Function): Promise<any>{
        var options = constructor.prototype.options;
        var id = options.id;
        var ins = new (<any>constructor)(options.id);
        (<any>this.instanceCache)[id] = Promise.resolve(ins);
        return (<any>this.instanceCache)[id];
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>}
     */
    protected createComponents(constructor: Function): Promise<any>{
        var options = constructor.prototype.options;
        var id = options.id;
        var components = options.components || [];

        var componentsP = Promise.all(components.map((component: any) => this.componentFactory.put(component, id)));
        var moduleInstanceP = (<any>this.instanceCache)[id];

        return Promise.all([
            moduleInstanceP,
            componentsP
        ]).then(([moduleInstance, componentsInstance]) => {
            moduleInstance.components = componentsInstance;
            return moduleInstance;
        });
    }
}
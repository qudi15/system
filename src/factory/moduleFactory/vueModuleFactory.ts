import { ModuleBase } from "../../base/index";
import { ComponentFactory, ModuleFactoryBase, ServiceFactory, StoreFactory } from "../index";
import { Loader } from "../../loader/index";
import { IComponentConstructor, IComponentOptions } from "../../base/componentBase";
import { IModuleOptions, IModule } from "../../base/moduleBase";
import { IStore } from "../../base/storeBase";

export interface IVueModuleFactoryConstructorArguments {
    loader: Loader;
    componentFactory: ComponentFactory;
    serviceFactory: ServiceFactory;
    storeFactory: StoreFactory;
}

/**
 * Class VueModuleFactory
 * @extends ModuleFactoryBase
 */
export class VueModuleFactory extends ModuleFactoryBase {

    protected instanceCache: {[moduleId: string]: Promise<IModule>};

    protected loader: Loader;
    protected componentFactory: ComponentFactory;
    protected serviceFactory: ServiceFactory;
    protected storeFactory: StoreFactory;

    /**
     * @constructs
     * @param{Loader} loader - File loader.
     * @param{ComponentFactory} componentFactory - Component factory.
     * @param{ServiceFactory} serviceFactory - Service factory.
     * @param{StoreFactory} storeFactory - Store factory.
     */
    constructor(args: IVueModuleFactoryConstructorArguments) {
        super(args.loader);
        this.instanceCache = {};
        this.loader = args.loader;
        this.componentFactory = args.componentFactory;
        this.serviceFactory = args.serviceFactory;
        this.storeFactory = args.storeFactory;
        (window as any).moduleFactory = this;
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<IModule>}
     */
    protected createServices(constructor: Function) {
        const options = constructor.prototype.options;
        const services = options.services || [];
        const id = options.id;
        const servicesP = Promise.all(services.map((service: Function) => this.serviceFactory.put(service, id)));
        const moduleInstanceP = this.instanceCache[id];
        return Promise.all([
            moduleInstanceP,
            servicesP
        ]).then(([ moduleInstance, services ]) => {
            moduleInstance.services = services;
            return moduleInstance;
        });
    }

    /**
     * @protected
     * @param {IModule} moduleInstance - Module instance.
     * @param {IModule[]} deps - Dependence of module.
     * @return {Promise<IModule>}
     */
    protected changeComponentToModuleView(moduleInstance: IModule, deps: IModule[]): Promise<IModule> {
        const depT = deps.concat(moduleInstance).reduce(({ services, stores } , dep: any) => {
            const id = dep.id;
            (services as any)[id] = dep.services.reduce((res: any, service: Function) => {
                res[(service as any).name] = service;
                return res;
            }, {});
            (stores as any)[id] = dep.store;
            return { services, stores };
        }, { services: {}, stores: {} });
        const mainComponent = moduleInstance.bootStrap;
        const view = this.componentFactory.changeComponentToModuleView(mainComponent, depT.services, depT.stores);
        moduleInstance.moduleView = view;
        return Promise.resolve(moduleInstance);
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<IModule>}
     */
    protected createStore(constructor: Function) {
        const options = constructor.prototype.options;
        const id = options.id;
        const store = options.store;
        const moduleInstanceP = this.instanceCache[id];
        const storeP: Promise<IStore> = this.storeFactory.put(store, id);
        return Promise.all([
            moduleInstanceP,
            storeP
        ]).then(([moduleInstance, store]) => {
            moduleInstance.store = store;
            return moduleInstance;
        });
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * return {Promise<IModule>}
     */
    protected createMainComponent(constructor: Function) {
        const options = constructor.prototype.options;
        const id = options.id;
        const mainComponent = options.bootStrap;
        const moduleInstanceP = this.instanceCache[id];
        const componentP = this.componentFactory.put(mainComponent, id);
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
     * @return {Promise<IModule>}
     */
    protected createModule(constructor: any): Promise<IModule> {
        const options = constructor.prototype.options;
        const id = options.id;
        const ins: IModule = new constructor(options.id);
        this.instanceCache[id] = Promise.resolve(ins);
        return this.instanceCache[id];
    }

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<IModule>}
     */
    protected createComponents(constructor: Function): Promise<any> {
        const options = constructor.prototype.options;
        const id = options.id;
        const components = options.components || [];

        const componentsP: Promise<any[]>  =
        Promise.all(components.map((component: IComponentConstructor) => this.componentFactory.put(component, id)));
        const moduleInstanceP = this.instanceCache[id];

        return Promise.all([
            moduleInstanceP,
            componentsP
        ]).then(([moduleInstance, componentsInstance]) => {
            moduleInstance.components = componentsInstance;
            return moduleInstance;
        });
    }
}

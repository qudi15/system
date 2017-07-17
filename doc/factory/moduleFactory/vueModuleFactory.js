import { ModuleFactoryBase } from "../index";
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
    constructor(args) {
        super(args.loader);
        this.instanceCache = {};
        this.loader = args.loader;
        this.componentFactory = args.componentFactory;
        this.serviceFactory = args.serviceFactory;
        this.storeFactory = args.storeFactory;
        window.moduleFactory = this;
    }
    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<IModule>}
     */
    createServices(constructor) {
        const options = constructor.prototype.options;
        const services = options.services || [];
        const id = options.id;
        const servicesP = Promise.all(services.map((service) => this.serviceFactory.put(service, id)));
        const moduleInstanceP = this.instanceCache[id];
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
     * @param {IModule} moduleInstance - Module instance.
     * @param {IModule[]} deps - Dependence of module.
     * @return {Promise<IModule>}
     */
    changeComponentToModuleView(moduleInstance, deps) {
        const depT = deps.concat(moduleInstance).reduce(({ services, stores }, dep) => {
            const id = dep.id;
            services[id] = dep.services.reduce((res, service) => {
                res[service.name] = service;
                return res;
            }, {});
            stores[id] = dep.store;
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
    createStore(constructor) {
        const options = constructor.prototype.options;
        const id = options.id;
        const store = options.store;
        const moduleInstanceP = this.instanceCache[id];
        const storeP = this.storeFactory.put(store, id);
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
    createMainComponent(constructor) {
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
    createModule(constructor) {
        const options = constructor.prototype.options;
        const id = options.id;
        const ins = new constructor(options.id);
        this.instanceCache[id] = Promise.resolve(ins);
        return this.instanceCache[id];
    }
    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<IModule>}
     */
    createComponents(constructor) {
        const options = constructor.prototype.options;
        const id = options.id;
        const components = options.components || [];
        const componentsP = Promise.all(components.map((component) => this.componentFactory.put(component, id)));
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
//# sourceMappingURL=vueModuleFactory.js.map
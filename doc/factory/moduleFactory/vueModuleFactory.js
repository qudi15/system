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
    constructor(loader, componentFactory, serviceFactory, storeFactory) {
        super(loader);
        this.loader = loader;
        this.componentFactory = componentFactory;
        this.serviceFactory = serviceFactory;
        this.storeFactory = storeFactory;
        this.instanceCache = {};
        window['moduleFactory'] = this;
    }
    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>}
     */
    createServices(constructor) {
        var options = constructor.prototype.options;
        var services = options.services || [];
        var id = options.id;
        var servicesP = Promise.all(services.map((service) => this.serviceFactory.put(service, id)));
        var moduleInstanceP = this.instanceCache[id];
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
    changeComponentToModuleView(moduleInstance, deps) {
        var depT = deps.concat(moduleInstance).reduce(({ services, stores }, dep) => {
            let id = dep.id;
            services[id] = dep.services.reduce((res, service) => {
                res[service.name] = service;
                return res;
            }, {});
            stores[id] = dep.store;
            return { services, stores };
        }, { services: {}, stores: {} });
        var mainComponent = moduleInstance.bootStrap;
        moduleInstance.moduleView = this.componentFactory.changeComponentToModuleView(mainComponent, depT.services, depT.stores);
        return Promise.resolve(moduleInstance);
    }
    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>}
     */
    createStore(constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var store = options.store;
        var moduleInstanceP = this.instanceCache[id];
        var storeP = this.storeFactory.put(store, id);
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
     * return {Promise<ModuleBase>}
     */
    createMainComponent(constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var mainComponent = options.bootStrap;
        var moduleInstanceP = this.instanceCache[id];
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
    createModule(constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var ins = new constructor(options.id);
        this.instanceCache[id] = Promise.resolve(ins);
        return this.instanceCache[id];
    }
    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase>}
     */
    createComponents(constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var components = options.components || [];
        var componentsP = Promise.all(components.map((component) => this.componentFactory.put(component, id)));
        var moduleInstanceP = this.instanceCache[id];
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
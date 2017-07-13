import { Loader } from "../loader/index";
import { ModuleFactory, ComponentFactory, ServiceFactory, StoreFactory } from "../factory/index";
export function broswerPlatform() {
    let ModuleFactoryInstance;
    let StoreFactoryInstance;
    let ComponentFactoryInstance;
    let ServiceFatoryInstance;
    let LoaderInstance;
    function instantiation() {
        if (!LoaderInstance) {
            LoaderInstance = new Loader();
        }
        if (!ComponentFactoryInstance) {
            ComponentFactoryInstance = new ComponentFactory();
        }
        if (!ServiceFatoryInstance) {
            ServiceFatoryInstance = new ServiceFactory();
        }
        if (!StoreFactoryInstance) {
            StoreFactoryInstance = new StoreFactory();
        }
        if (!ModuleFactoryInstance) {
            ModuleFactoryInstance = new ModuleFactory({
                loader: LoaderInstance,
                componentFactory: ComponentFactoryInstance,
                serviceFactory: ServiceFatoryInstance,
                storeFactory: StoreFactoryInstance
            });
        }
    }
    function loadModule(namespace) {
        return ModuleFactoryInstance.put(namespace).then(function (moduleInstance) {
            ComponentFactoryInstance.boot(moduleInstance.moduleView, "#app");
        });
    }
    return {
        bootStrapModule(namespace) {
            instantiation();
            loadModule(namespace);
        }
    };
}
//# sourceMappingURL=broswer.js.map
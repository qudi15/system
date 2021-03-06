import { Loader } from "../loader/index";
import { ModuleFactory, ComponentFactory, ServiceFactory, StoreFactory } from "../factory/index";
import { ModuleBase, IModule } from "../base/index";
import { IModuleFactoryConstructorArguments } from "../factory/index";

export function broswerPlatform() {
    let ModuleFactoryInstance: ModuleFactory;
    let StoreFactoryInstance: StoreFactory;
    let ComponentFactoryInstance: ComponentFactory;
    let ServiceFatoryInstance: ServiceFactory;
    let LoaderInstance: Loader;

    function instantiation(): void {
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

    function loadModule(namespace: string) {
        return ModuleFactoryInstance.put(namespace).then(function(moduleInstance: IModule){
            ComponentFactoryInstance.boot(moduleInstance.moduleView, "#app");
        });
    }

    return {
        bootStrapModule(namespace: string) {
            instantiation();
            loadModule(namespace);
        }
    };
}

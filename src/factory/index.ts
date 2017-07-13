/**
 * @module system/factory
 */

export * from "./componentFactory/componentFactoryBase";
export { 
    /**
     * ComponentFactory
     * See {@link VueComponentFactory}
     */
    VueComponentFactory as ComponentFactory 
} from "./componentFactory/vueComponentFactory";
export * from "./moduleFactory/moduleFactoryBase";
export { 
    /**
     * ModuleFactory
     * See {@link VueModuleFactory}
     */
    VueModuleFactory as ModuleFactory 
} from "./moduleFactory/vueModuleFactory";
export { 
    /**
     * ServiceFactory
     * See {@link ServiceFactoryBase}
     */
    ServiceFactoryBase as ServiceFactory 
} from "./serviceFactory/serviceFactoryBase";
export * from "./storeFactory/storeFactoryBase";
export { 
    /**
     * StoreFactory
     * See {@link VueStoreFactory}
     */
    VueStoreFactory as StoreFactory 
} from "./storeFactory/vueStoreFactory";
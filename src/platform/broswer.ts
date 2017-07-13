import { Loader } from "../loader/index";

import { ModuleFactory, ComponentFactory, ServiceFactory, StoreFactory } from "../factory/index";

import { ModuleBase } from '../base/index';

console.log(1);

function addScript(src: string){
    return new Promise<void>((resolve: Function, reject: Function) => {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function(){
            resolve();
        };
        script.onerror = function(){
            reject();
        }
    });
}

export function broswerPlatform(){
    var ModuleFactoryInstance: ModuleFactory;
    var StoreFactoryInstance: StoreFactory;
    var ComponentFactoryInstance: ComponentFactory;
    var ServiceFatoryInstance: ServiceFactory;
    var LoaderInstance: Loader;

    function instantiation(): void{
        (!LoaderInstance) && (LoaderInstance = new Loader());
        (!ComponentFactoryInstance) && (ComponentFactoryInstance = new ComponentFactory());
        (!ServiceFatoryInstance) && (ServiceFatoryInstance = new ServiceFactory());
        (!StoreFactoryInstance) && (StoreFactoryInstance = new StoreFactory());
        if(!ModuleFactoryInstance){
            ModuleFactoryInstance = new ModuleFactory(LoaderInstance, ComponentFactoryInstance, ServiceFatoryInstance, StoreFactoryInstance);
        };
    }

    function loadModule(namespace: string){
        return ModuleFactoryInstance.put(namespace).then(function(moduleInstance: ModuleBase){
            ComponentFactoryInstance.boot((<any>moduleInstance).moduleView, '#app');
        });
    }

    return {
        bootStrapModule(namespace: string){
            instantiation();
            loadModule(namespace);
        }
    };
}
import Loader from "../loader";
import VueModuleFactory from "../factory/moduleFactory/vueModuleFactory";
import VueComponentFactory from "../factory/componentFactory/vueComponentFactory";
import StoreFactory from "../factory/storeFactory/storeFactoryBase";

import { ModuleBase } from '../base/moduleBase';

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
    var ModuleFactoryInstance: VueModuleFactory;
    var StoreFactoryInstance: StoreFactory;
    var ComponentFactoryInstance: VueComponentFactory;
    var LoaderInstance: Loader;

    function instantiation(): void{
        (!LoaderInstance) && (LoaderInstance = new Loader());
        (!ComponentFactoryInstance) && (ComponentFactoryInstance = new VueComponentFactory());
        if(!ModuleFactoryInstance){
            ModuleFactoryInstance = new VueModuleFactory(ComponentFactoryInstance, LoaderInstance);
        };
        (!StoreFactoryInstance) && (StoreFactoryInstance = new StoreFactory());
    }

    return {
        bootStrapModule(namespace: string){
            instantiation();
            ModuleFactoryInstance.put(namespace);
        }
    };
}
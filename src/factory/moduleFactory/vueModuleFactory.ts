import ModuleFactoryBase from "./moduleFactoryBase";
import { ModuleBase } from "../../base/moduleBase";
import VueComponentFactory from "../componentFactory/componentFactoryBase";

import Loader from "../../loader";

export default class VueModuleFactory extends ModuleFactoryBase {

    private instanceCache: Object;

    constructor(protected loader: Loader, protected componentFactory: VueComponentFactory){
        super(loader);
    }

    protected createModule(namespace: string){
        var module = (<any>this.cache)[namespace];
        var options = (<any>module).prototype.options;
        var ins = new (<any>module)(options.id);
        (<any>this.instanceCache)[options.id] = ins;
    }

    protected createComponents(namespace: string){
        var module = (<any>this.cache)[namespace];
    }
}
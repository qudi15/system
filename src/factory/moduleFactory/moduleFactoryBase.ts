import FactoryBase from '../base';
import { ModuleBase } from '../../base/moduleBase';
import Loader from "../../loader";

function checkModuleExists(id: string, cache: Object){
    return typeof (<any>cache)[id] == undefined;
}

export default class ModuleFactoryBase extends FactoryBase {

    constructor(protected loader: Loader){
        super();
    }

    public put(namespace: string): void {
        if(!checkModuleExists(namespace, this.cache)){
            return (<any>this.loadModule(namespace)).then((module: ModuleBase) => {
                (<any>this.cache)[namespace] = module;
                return this.handleDeps(module);
            }).then(() => {
                this.createModule(namespace);
                this.createComponents(namespace);
            });
        }else{
            return (<any>Promise).resolve();
        }
    }

    protected handleDeps(module: ModuleBase){
        var options = (<any>module).prototype.options;
        var deps = options.modules || [];
        return Promise.all(deps.map((namespace: string) => this.put(namespace)));
    }

    protected loadModule(namespace: string){
        return this.loader.load(namespace).then(({ default: module }) => module);
    }

    protected createModule(namespace: string){}

    protected createComponents(namespace: string){}


}
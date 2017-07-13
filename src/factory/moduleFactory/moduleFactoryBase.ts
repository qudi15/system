import { FactoryBase } from '../base';
import { ModuleBase } from '../../base/index';
import { Loader } from "../../loader/index";

function checkModuleExists(id: string, cache: Object){
    return typeof (<any>cache)[id] == undefined;
}

/**
 * Class ModuleFactoryBase
 * @extends FactoryBase
 */
export class ModuleFactoryBase extends FactoryBase {

    constructor(protected loader: Loader){
        super();
    }

    /**
     * @public
     * @param {String} moduleId - Module Id
     * @return {Promise<ModuleBase>}
     */
    public put(moduleId: string): any {
        if(!checkModuleExists(moduleId, this.cache)){
            (<any>this.cache)[moduleId] = this.loadModule(moduleId).then((module: Function) => {
                return Promise.all([
                    this.handleDeps(module),
                    this.createModule(module),
                    this.createComponents(module),
                    this.createMainComponent(module),
                    this.createServices(module),
                    this.createStore(module)
                ]).then(([deps, moduleInstance]) => {
                    return this.changeComponentToModuleView(moduleInstance, deps);
                });
            });
        }
        return (<any>this.cache)[moduleId];
    }

    protected createStore(constructor: Function){}

    protected changeComponentToModuleView(moduleInstance: any, deps: Array<any>){}

    protected createServices(constructor: Function){}

    protected createMainComponent(constructor: Function){}

    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase[]>}
     */
    protected handleDeps(constructor: Function){
        var options = constructor.prototype.options;
        var deps = options.modules || [];
        return Promise.all(deps.map((namespace: string) => this.put(namespace)));
    }

    /**
     * @protected
     * @param {String} moduleId - Module Id
     * @return {Promise<ModuleBase>}
     */
    protected loadModule(moduleId: string) : Promise<any> {
        return this.loader.load(moduleId).then(( output: any ) => output.default);
    }

    protected createModule(constructor: Function): any {}

    protected createComponents(constructor: Function) : any{}


}
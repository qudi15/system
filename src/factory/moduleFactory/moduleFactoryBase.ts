import { FactoryBase } from "../base";
import { ModuleBase } from "../../base/index";
import { Loader } from "../../loader/index";
import { IModuleConstructor, IModuleOptions, IModule } from "../../base/moduleBase";

function checkModuleExists(id: string, cache: {[moduleId: string]: Promise<IModule>}) {
    return !!cache[id];
}

/**
 * Class ModuleFactoryBase
 * @extends FactoryBase
 */
export class ModuleFactoryBase extends FactoryBase {

    protected cache: {[moduleId: string]: Promise<IModule>};

    constructor(protected loader: Loader) {
        super();
    }

    /**
     * @public
     * @param {String} moduleId - Module Id
     * @return {Promise<IModuleConstructor>}
     */
    public put(moduleId: string): any {
        if (!checkModuleExists(moduleId, this.cache)) {
            this.cache[moduleId] = this.loadModule(moduleId).then((module: IModuleConstructor) => {
                return Promise.all([
                    this.handleDeps(module),
                    this.createModule(module),
                    this.createComponents(module),
                    this.createMainComponent(module),
                    this.createServices(module),
                    this.createStore(module)
                ]).then(([deps, moduleInstance]) => {
                    return this.changeComponentToModuleView(moduleInstance, deps) as IModule;
                });
            });
        }
        return this.cache[moduleId];
    }

    protected createStore(constructor: IModuleConstructor) {}

    protected changeComponentToModuleView(moduleInstance: IModule, deps: IModule[]): any {}

    protected createServices(constructor: IModuleConstructor) {}

    protected createMainComponent(constructor: IModuleConstructor) {}

    /**
     * @protected
     * @param {IModuleConstructor} constructor - Module constructor.
     * @return {Promise<IModule[]>}
     */
    protected handleDeps(constructor: IModuleConstructor) {
        const options = constructor.prototype.options;
        const deps = options.modules || [];
        return Promise.all(deps.map((namespace: string) => this.put(namespace)));
    }

    /**
     * @protected
     * @param {String} moduleId - Module Id
     * @return {Promise<IModuleConstructor>}
     */
    protected loadModule(moduleId: string): Promise<IModuleConstructor> {
        return this.loader.load(moduleId).then(( output: any ) => output.default as IModuleConstructor);
    }

    protected createModule(constructor: IModuleConstructor): any {}

    protected createComponents(constructor: IModuleConstructor): any {}

}

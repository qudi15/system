import { FactoryBase } from '../base';
function checkModuleExists(id, cache) {
    return typeof cache[id] == undefined;
}
/**
 * Class ModuleFactoryBase
 * @extends FactoryBase
 */
export class ModuleFactoryBase extends FactoryBase {
    constructor(loader) {
        super();
        this.loader = loader;
    }
    /**
     * @public
     * @param {String} moduleId - Module Id
     * @return {Promise<ModuleBase>}
     */
    put(moduleId) {
        if (!checkModuleExists(moduleId, this.cache)) {
            this.cache[moduleId] = this.loadModule(moduleId).then((module) => {
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
        return this.cache[moduleId];
    }
    createStore(constructor) { }
    changeComponentToModuleView(moduleInstance, deps) { }
    createServices(constructor) { }
    createMainComponent(constructor) { }
    /**
     * @protected
     * @param {Function} constructor - Module constructor.
     * @return {Promise<ModuleBase[]>}
     */
    handleDeps(constructor) {
        var options = constructor.prototype.options;
        var deps = options.modules || [];
        return Promise.all(deps.map((namespace) => this.put(namespace)));
    }
    /**
     * @protected
     * @param {String} moduleId - Module Id
     * @return {Promise<ModuleBase>}
     */
    loadModule(moduleId) {
        return this.loader.load(moduleId).then((output) => output.default);
    }
    createModule(constructor) { }
    createComponents(constructor) { }
}
//# sourceMappingURL=moduleFactoryBase.js.map
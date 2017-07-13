import { FactoryBase } from "../base";
function generateComponentTag(name, parentName) {
    return name.startsWith(parentName) ? name : parentName.concat('-', name);
}
/**
 * Class ComponentFactoryBase
 * @extends FactoryBase
 */
export class ComponentFactoryBase extends FactoryBase {
    /**
     * @param {Function} constructor - component constructor
     * @param {String} moduleId - module id
     * @return {Promise<ComponentBase>}
     */
    put(constructor, moduleId) {
        var options = constructor.prototype.options;
        var tagName = generateComponentTag(options.name, moduleId);
        var cache = this.cache;
        if (!cache[tagName]) {
            let process = cache[tagName] = this.createComponent(tagName, constructor);
            process.then((componentIns) => {
                this.exchange(componentIns, constructor);
                this.register(tagName, componentIns);
                return componentIns;
            });
        }
        return cache[tagName];
    }
    changeComponentToModuleView(component, service, store) { }
    createComponent(tagName, constructor) { }
    exchange(componentIns, constructor) { }
    register(tagName, componentIns) { }
}
//# sourceMappingURL=componentFactoryBase.js.map
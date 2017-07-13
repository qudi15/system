import { FactoryBase } from "../base";
function generateComponentTag(name, parentName) {
    return name.startsWith(parentName) ? name : parentName.concat("-", name);
}
/**
 * Class ComponentFactoryBase
 * @extends FactoryBase
 */
export class ComponentFactoryBase extends FactoryBase {
    /**
     * @param {IComponentConstructor} constructor - component constructor
     * @param {String} moduleId - module id
     * @return {Promise<IComponentOptions>}
     */
    put(constructor, moduleId) {
        const options = constructor.prototype.options;
        const tagName = generateComponentTag(options.name, moduleId);
        const cache = this.cache;
        if (!cache[tagName]) {
            cache[tagName] = Promise.resolve(constructor);
            return this.instanceCache[tagName] = this.createComponent(tagName, constructor)
                .then((componentIns) => {
                this.exchange(componentIns, constructor);
                this.register(tagName, componentIns);
                return componentIns;
            });
        }
        return this.instanceCache[tagName];
    }
    changeComponentToModuleView(component, service, store) { }
    createComponent(tagName, constructor) { }
    exchange(componentIns, constructor) { }
    register(tagName, componentIns) { }
}
//# sourceMappingURL=componentFactoryBase.js.map
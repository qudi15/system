
import { FactoryBase } from "../base";
import { ComponentBase } from "../../base/index";
import { IComponentConstructor, IComponentOptions } from "../../base/componentBase";

function generateComponentTag(name: string, parentName: string) {
    return name.startsWith(parentName) ? name : parentName.concat("-", name);
}

/**
 * Class ComponentFactoryBase
 * @extends FactoryBase
 */
export class ComponentFactoryBase extends FactoryBase {
    protected cache: {[tagName: string]: Promise<IComponentConstructor>};

    /**
     * @param {IComponentConstructor} constructor - component constructor
     * @param {String} moduleId - module id
     * @return {Promise<IComponentOptions>}
     */
    public put(constructor: IComponentConstructor, moduleId: string): Promise<IComponentOptions> {
        const options = constructor.prototype.options;
        const tagName = generateComponentTag(options.name, moduleId);
        const cache = this.cache;
        if (!cache[tagName]) {
            cache[tagName] = Promise.resolve(constructor);
            return this.instanceCache[tagName] = this.createComponent(tagName, constructor)
            .then((componentIns: IComponentOptions) => {
                this.exchange(componentIns, constructor);
                this.register(tagName, componentIns);
                return componentIns;
            });
        }

        return this.instanceCache[tagName];
    }

    public changeComponentToModuleView(component: IComponentOptions, service?: Object, store?: Object) {}

    protected createComponent(tagName: string, constructor: IComponentConstructor): any {}

    protected exchange(componentIns: IComponentOptions, constructor: IComponentConstructor) {}

    protected register(tagName: string, componentIns: IComponentOptions) {}
}

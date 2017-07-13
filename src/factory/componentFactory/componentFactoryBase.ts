
import { FactoryBase } from "../base";
import { ComponentBase } from "../../base/index";

function generateComponentTag(name: string, parentName: string){
    return (<any>name).startsWith(parentName) ? name : parentName.concat('-', name);
}

/**
 * Class ComponentFactoryBase
 * @extends FactoryBase
 */
export class ComponentFactoryBase extends FactoryBase {
    cache: Array<ComponentBase>;

    /**
     * @param {Function} constructor - component constructor
     * @param {String} moduleId - module id
     * @return {Promise<ComponentBase>}
     */
    put(constructor: Function, moduleId: string): Promise<any>{
        var options = constructor.prototype.options;
        var tagName = generateComponentTag(options.name, moduleId);
        var cache = this.cache;
        if(!(<any>cache)[tagName]){
            let process = (<any>cache)[tagName] = this.createComponent(tagName, constructor);
            process.then((componentIns: ComponentBase) => {
                this.exchange(componentIns, constructor);
                this.register(tagName, componentIns);
                return componentIns;
            });            
        }

        return (<any>cache)[tagName];
    }

    changeComponentToModuleView(component: any, service?: Object, store?: Object){}

    protected createComponent(tagName: string, constructor: Function): any{}

    protected exchange(componentIns: ComponentBase, constructor: Function){}

    protected register(tagName: string, componentIns: ComponentBase){}
}

import { Base } from "./base";
import { IComponentConstructor, IComponentOptions } from "./componentBase";
import { IService } from "./serviceBase";
import { IStore } from "./storeBase";

/**
 * @interface ModuleOptions
 */
export interface IModuleOptions {
    id: string;
    components: IComponentConstructor[];
    services: IService[];
    store: IStore;
    bootStrap: IComponentConstructor;
    modules: string[];
}

/**
 * @interface Module
 */
export interface IModule {
    id: string;
    components: IComponentOptions[];
    services: IService[];
    store: IStore;
    bootStrap: IComponentOptions;
    moduleView: IComponentOptions;
    modules: string[];
}

/**
 * @interface IModuleConstructor
 */
export interface IModuleConstructor extends Function {
    prototype: {
        options: IModuleOptions
    };
}

/**
 * Decorator Module
 */
export function Module(options: IModuleOptions) {
    return function(constructor: IModuleConstructor){
        constructor.prototype.options = options;
    };
}

/**
 * Class ModuleBase
 * @extends Base
 */
export class ModuleBase extends Base {
    /**
     * @constructs
     * @param {string} id - The module id.
     */
    constructor(
        public id: string
    ) {
        super();
    }
}

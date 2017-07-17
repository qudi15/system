
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
 * @example <caption>Minimal module</caption>
 * import Main from './components/main/index'
 * import { Module, ModuleBase } from 'system/base/moduleBase';
 * '@'Module({
 *   id: 'app', //Module identity name
 *   components: [ Main ], //Components to declare
 *   bootStrap: Main //Main component like module view.
 * })
 * export default class MainModule extends ModuleBase {}
 *
 * @example <caption>Complex module</caption>
 * import Main from './components/main/index'
 * import { Module, ModuleBase } from 'system/base/moduleBase';
 * import { getSth, postSth } from './services/index';
 * import Store from './store/index';
 * '@'Module({
 *   id: 'app',
 *   components: [ Main ],
 *   modules: ['pa'], //Dependent modules identity name.
 *   services: [ getSth, postSth ], //Services you want to share.
 *   store: Store,//Data store.
 *   bootStrap: Main
 * })
 * export default class MainModule extends ModuleBase {}
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

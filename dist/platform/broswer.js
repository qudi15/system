"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../loader/index");
var index_2 = require("../factory/index");
function broswerPlatform() {
    var ModuleFactoryInstance;
    var StoreFactoryInstance;
    var ComponentFactoryInstance;
    var ServiceFatoryInstance;
    var LoaderInstance;
    function instantiation() {
        if (!LoaderInstance) {
            LoaderInstance = new index_1.Loader();
        }
        if (!ComponentFactoryInstance) {
            ComponentFactoryInstance = new index_2.ComponentFactory();
        }
        if (!ServiceFatoryInstance) {
            ServiceFatoryInstance = new index_2.ServiceFactory();
        }
        if (!StoreFactoryInstance) {
            StoreFactoryInstance = new index_2.StoreFactory();
        }
        if (!ModuleFactoryInstance) {
            ModuleFactoryInstance = new index_2.ModuleFactory({
                loader: LoaderInstance,
                componentFactory: ComponentFactoryInstance,
                serviceFactory: ServiceFatoryInstance,
                storeFactory: StoreFactoryInstance
            });
        }
    }
    function loadModule(namespace) {
        return ModuleFactoryInstance.put(namespace).then(function (moduleInstance) {
            ComponentFactoryInstance.boot(moduleInstance.moduleView, "#app");
        });
    }
    return {
        bootStrapModule: function (namespace) {
            instantiation();
            loadModule(namespace);
        }
    };
}
exports.broswerPlatform = broswerPlatform;
//# sourceMappingURL=broswer.js.map
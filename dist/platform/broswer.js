"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vueModuleFactory_1 = require("../factory/moduleFactory/vueModuleFactory");
var vueComponentFactory_1 = require("../factory/componentFactory/vueComponentFactory");
var storeFactoryBase_1 = require("../factory/storeFactory/storeFactoryBase");
function addScript(src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () {
            resolve();
        };
        script.onerror = function () {
            reject();
        };
    });
}
function broswerPlatform() {
    var ModuleFactoryInstance;
    var StoreFactoryInstance;
    var ComponentFactoryInstance;
    function instantiation() {
        (!ComponentFactoryInstance) && (ComponentFactoryInstance = new vueComponentFactory_1.default());
        (!ModuleFactoryInstance) && (ModuleFactoryInstance = new vueModuleFactory_1.default(ComponentFactoryInstance));
        (!StoreFactoryInstance) && (StoreFactoryInstance = new storeFactoryBase_1.default());
    }
    return {
        bootStrapModule: function (module) {
            instantiation();
            ModuleFactoryInstance.put(module);
        }
    };
}
exports.broswerPlatform = broswerPlatform;
//# sourceMappingURL=broswer.js.map
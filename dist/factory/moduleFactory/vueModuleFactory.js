"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var VueModuleFactory = (function (_super) {
    __extends(VueModuleFactory, _super);
    function VueModuleFactory(args) {
        var _this = _super.call(this, args.loader) || this;
        _this.instanceCache = {};
        _this.loader = args.loader;
        _this.componentFactory = args.componentFactory;
        _this.serviceFactory = args.serviceFactory;
        _this.storeFactory = args.storeFactory;
        window.moduleFactory = _this;
        return _this;
    }
    VueModuleFactory.prototype.createServices = function (constructor) {
        var _this = this;
        var options = constructor.prototype.options;
        var services = options.services || [];
        var id = options.id;
        var servicesP = Promise.all(services.map(function (service) { return _this.serviceFactory.put(service, id); }));
        var moduleInstanceP = this.instanceCache[id];
        return Promise.all([
            moduleInstanceP,
            servicesP
        ]).then(function (_a) {
            var moduleInstance = _a[0], services = _a[1];
            moduleInstance.services = services;
            return moduleInstance;
        });
    };
    VueModuleFactory.prototype.changeComponentToModuleView = function (moduleInstance, deps) {
        var depT = deps.concat(moduleInstance).reduce(function (_a, dep) {
            var services = _a.services, stores = _a.stores;
            var id = dep.id;
            services[id] = dep.services.reduce(function (res, service) {
                res[service.name] = service;
                return res;
            }, {});
            stores[id] = dep.store;
            return { services: services, stores: stores };
        }, { services: {}, stores: {} });
        var mainComponent = moduleInstance.bootStrap;
        var view = this.componentFactory.changeComponentToModuleView(mainComponent, depT.services, depT.stores);
        moduleInstance.moduleView = view;
        return Promise.resolve(moduleInstance);
    };
    VueModuleFactory.prototype.createStore = function (constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var store = options.store;
        var moduleInstanceP = this.instanceCache[id];
        var storeP = this.storeFactory.put(store, id);
        return Promise.all([
            moduleInstanceP,
            storeP
        ]).then(function (_a) {
            var moduleInstance = _a[0], store = _a[1];
            moduleInstance.store = store;
            return moduleInstance;
        });
    };
    VueModuleFactory.prototype.createMainComponent = function (constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var mainComponent = options.bootStrap;
        var moduleInstanceP = this.instanceCache[id];
        var componentP = this.componentFactory.put(mainComponent, id);
        return Promise.all([
            moduleInstanceP,
            componentP
        ]).then(function (_a) {
            var moduleInstance = _a[0], componentInstance = _a[1];
            moduleInstance.bootStrap = componentInstance;
            return moduleInstance;
        });
    };
    VueModuleFactory.prototype.createModule = function (constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var ins = new constructor(options.id);
        this.instanceCache[id] = Promise.resolve(ins);
        return this.instanceCache[id];
    };
    VueModuleFactory.prototype.createComponents = function (constructor) {
        var _this = this;
        var options = constructor.prototype.options;
        var id = options.id;
        var components = options.components || [];
        var componentsP = Promise.all(components.map(function (component) { return _this.componentFactory.put(component, id); }));
        var moduleInstanceP = this.instanceCache[id];
        return Promise.all([
            moduleInstanceP,
            componentsP
        ]).then(function (_a) {
            var moduleInstance = _a[0], componentsInstance = _a[1];
            moduleInstance.components = componentsInstance;
            return moduleInstance;
        });
    };
    return VueModuleFactory;
}(index_1.ModuleFactoryBase));
exports.VueModuleFactory = VueModuleFactory;
//# sourceMappingURL=vueModuleFactory.js.map
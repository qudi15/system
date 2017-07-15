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
var base_1 = require("../base");
function checkModuleExists(id, cache) {
    return !!cache[id];
}
var ModuleFactoryBase = (function (_super) {
    __extends(ModuleFactoryBase, _super);
    function ModuleFactoryBase(loader) {
        var _this = _super.call(this) || this;
        _this.loader = loader;
        return _this;
    }
    ModuleFactoryBase.prototype.put = function (moduleId) {
        var _this = this;
        if (!checkModuleExists(moduleId, this.cache)) {
            this.cache[moduleId] = this.loadModule(moduleId).then(function (module) {
                return Promise.all([
                    _this.handleDeps(module),
                    _this.createModule(module),
                    _this.createComponents(module),
                    _this.createMainComponent(module),
                    _this.createServices(module),
                    _this.createStore(module)
                ]).then(function (_a) {
                    var deps = _a[0], moduleInstance = _a[1];
                    return _this.changeComponentToModuleView(moduleInstance, deps);
                });
            });
        }
        return this.cache[moduleId];
    };
    ModuleFactoryBase.prototype.createStore = function (constructor) { };
    ModuleFactoryBase.prototype.changeComponentToModuleView = function (moduleInstance, deps) { };
    ModuleFactoryBase.prototype.createServices = function (constructor) { };
    ModuleFactoryBase.prototype.createMainComponent = function (constructor) { };
    ModuleFactoryBase.prototype.handleDeps = function (constructor) {
        var _this = this;
        var options = constructor.prototype.options;
        var deps = options.modules || [];
        return Promise.all(deps.map(function (namespace) { return _this.put(namespace); }));
    };
    ModuleFactoryBase.prototype.loadModule = function (moduleId) {
        return this.loader.load(moduleId).then(function (output) { return output.default; });
    };
    ModuleFactoryBase.prototype.createModule = function (constructor) { };
    ModuleFactoryBase.prototype.createComponents = function (constructor) { };
    return ModuleFactoryBase;
}(base_1.FactoryBase));
exports.ModuleFactoryBase = ModuleFactoryBase;
//# sourceMappingURL=moduleFactoryBase.js.map
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
function generateComponentTag(name, parentName) {
    return name.startsWith(parentName) ? name : parentName.concat("-", name);
}
var ComponentFactoryBase = (function (_super) {
    __extends(ComponentFactoryBase, _super);
    function ComponentFactoryBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentFactoryBase.prototype.put = function (constructor, moduleId) {
        var _this = this;
        var options = constructor.prototype.options;
        var tagName = generateComponentTag(options.name, moduleId);
        var cache = this.cache;
        if (!cache[tagName]) {
            cache[tagName] = Promise.resolve(constructor);
            return this.instanceCache[tagName] = this.createComponent(tagName, constructor)
                .then(function (componentIns) {
                _this.exchange(componentIns, constructor);
                _this.register(tagName, componentIns);
                return componentIns;
            });
        }
        return this.instanceCache[tagName];
    };
    ComponentFactoryBase.prototype.changeComponentToModuleView = function (component, service, store) { };
    ComponentFactoryBase.prototype.createComponent = function (tagName, constructor) { };
    ComponentFactoryBase.prototype.exchange = function (componentIns, constructor) { };
    ComponentFactoryBase.prototype.register = function (tagName, componentIns) { };
    return ComponentFactoryBase;
}(base_1.FactoryBase));
exports.ComponentFactoryBase = ComponentFactoryBase;
//# sourceMappingURL=componentFactoryBase.js.map
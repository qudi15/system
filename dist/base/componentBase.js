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
var base_1 = require("./base");
function Component(options) {
    return function (constructor) {
        constructor.prototype.options = options;
    };
}
exports.Component = Component;
var ComponentBase = (function (_super) {
    __extends(ComponentBase, _super);
    function ComponentBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentBase.prototype.beforeMount = function () { };
    ComponentBase.prototype.mounted = function () { };
    ComponentBase.prototype.beforeUpdate = function () { };
    ComponentBase.prototype.updated = function () { };
    ComponentBase.prototype.activated = function () { };
    ComponentBase.prototype.deactivated = function () { };
    return ComponentBase;
}(base_1.Base));
exports.ComponentBase = ComponentBase;
//# sourceMappingURL=componentBase.js.map
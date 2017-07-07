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
var moduleFactoryBase_1 = require("./moduleFactoryBase");
var VueModuleFactory = (function (_super) {
    __extends(VueModuleFactory, _super);
    function VueModuleFactory(componentFactory) {
        var _this = _super.call(this) || this;
        _this.componentFactory = componentFactory;
        return _this;
    }
    VueModuleFactory.prototype.put = function (module) {
        console.log(module, this.componentFactory);
        window['appModule'] = module;
    };
    return VueModuleFactory;
}(moduleFactoryBase_1.default));
exports.default = VueModuleFactory;
//# sourceMappingURL=vueModuleFactory.js.map
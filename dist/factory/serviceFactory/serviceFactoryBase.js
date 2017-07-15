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
var ServiceFactoryBase = (function (_super) {
    __extends(ServiceFactoryBase, _super);
    function ServiceFactoryBase() {
        var _this = _super.call(this) || this;
        window.serviceFactory = _this;
        return _this;
    }
    ServiceFactoryBase.prototype.put = function (service, moduleId) {
        var instanceCache = this.instanceCache;
        if (!instanceCache[moduleId]) {
            instanceCache[moduleId] = {};
        }
        instanceCache[moduleId][service.name] = Promise.resolve(service);
        return instanceCache[moduleId][service.name];
    };
    return ServiceFactoryBase;
}(base_1.FactoryBase));
exports.ServiceFactoryBase = ServiceFactoryBase;
//# sourceMappingURL=serviceFactoryBase.js.map
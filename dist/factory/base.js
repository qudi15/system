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
var index_1 = require("../base/index");
var FactoryBase = (function (_super) {
    __extends(FactoryBase, _super);
    function FactoryBase() {
        var _this = _super.call(this) || this;
        _this.cache = {};
        _this.instanceCache = {};
        return _this;
    }
    FactoryBase.prototype.put = function (namespance, parent) { };
    FactoryBase.prototype.del = function (id) {
        delete this.cache[id];
        delete this.instanceCache[id];
    };
    FactoryBase.prototype.clear = function () { };
    FactoryBase.prototype.get = function (id) {
        return {
            instance: this.instanceCache[id],
            constructor: this.cache[id]
        };
    };
    return FactoryBase;
}(index_1.Base));
exports.FactoryBase = FactoryBase;
//# sourceMappingURL=base.js.map
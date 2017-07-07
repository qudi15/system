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
var base_1 = require("../base/base");
var FactoryBase = (function (_super) {
    __extends(FactoryBase, _super);
    function FactoryBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FactoryBase.prototype.put = function (module) { };
    FactoryBase.prototype.del = function () { };
    FactoryBase.prototype.clear = function () { };
    return FactoryBase;
}(base_1.default));
exports.default = FactoryBase;
//# sourceMappingURL=base.js.map
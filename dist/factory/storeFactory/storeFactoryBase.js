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
var StoreFactoryBase = (function (_super) {
    __extends(StoreFactoryBase, _super);
    function StoreFactoryBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoreFactoryBase.prototype.put = function (constructor, moduleId) {
        if (!this.cache[moduleId]) {
            this.cache[moduleId] = this.createStore(moduleId, constructor);
        }
        return this.cache[moduleId];
    };
    StoreFactoryBase.prototype.createStore = function (id, constructor) { };
    return StoreFactoryBase;
}(base_1.FactoryBase));
exports.StoreFactoryBase = StoreFactoryBase;
//# sourceMappingURL=storeFactoryBase.js.map
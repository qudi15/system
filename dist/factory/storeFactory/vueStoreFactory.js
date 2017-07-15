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
var storeFactoryBase_1 = require("./storeFactoryBase");
var VueStoreFactory = (function (_super) {
    __extends(VueStoreFactory, _super);
    function VueStoreFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VueStoreFactory.prototype.createStore = function (moduleId, constructor) {
        var ins = new constructor();
        this.cache[moduleId] = Promise.resolve(ins);
        this.instanceCache[moduleId] = Promise.resolve(new window.Vuex.Store(ins));
        return this.instanceCache[moduleId];
    };
    return VueStoreFactory;
}(storeFactoryBase_1.StoreFactoryBase));
exports.VueStoreFactory = VueStoreFactory;
//# sourceMappingURL=vueStoreFactory.js.map
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
var componentFactoryBase_1 = require("./componentFactoryBase");
var util_1 = require("../../util/util");
var VueComponentFactory = (function (_super) {
    __extends(VueComponentFactory, _super);
    function VueComponentFactory() {
        var _this = _super.call(this) || this;
        _this.instanceCache = {};
        window.componentFactory = _this;
        return _this;
    }
    VueComponentFactory.prototype.boot = function (options, selector) {
        return new window.Vue(options).$mount(selector);
    };
    VueComponentFactory.prototype.changeComponentToModuleView = function (options, service, store) {
        var tag = options.name;
        service = service ? service : {};
        store = store ? store : {};
        return {
            name: "",
            data: function () {
                return {
                    service: service,
                    store: store
                };
            },
            template: "<div><" + tag + " :service=\"service\" :store=\"store\"></" + tag + "></div>"
        };
    };
    VueComponentFactory.prototype.createComponent = function (tagName, constructor) {
        var ins = new constructor();
        return Promise.resolve(ins);
    };
    VueComponentFactory.prototype.exchange = function (options, constructor) {
        util_1.mixin(options, constructor.prototype.options);
        this.exchangeData(options);
        this.cloneLifecycleHook(options);
        return options;
    };
    VueComponentFactory.prototype.exchangeData = function (options) {
        var data = options.data;
        if (data) {
            options.data = data;
        }
        return options;
    };
    VueComponentFactory.prototype.cloneLifecycleHook = function (options) {
        ["beforeCreate",
            "created",
            "beforeMount",
            "mounted",
            "beforeUpdate",
            "updated",
            "activated",
            "deactivated",
            "beforeDestroy",
            "destroyed"].forEach(function (hook) {
            if (options[hook] != null) {
                options[hook] = options[hook];
            }
        });
        return options;
    };
    VueComponentFactory.prototype.register = function (tagName, options) {
        return window.Vue.component(tagName, options);
    };
    return VueComponentFactory;
}(componentFactoryBase_1.ComponentFactoryBase));
exports.VueComponentFactory = VueComponentFactory;
//# sourceMappingURL=vueComponentFactory.js.map
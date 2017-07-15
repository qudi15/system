(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
var index_1 = __webpack_require__(8);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Base = (function () {
    function Base() {
    }
    Base.prototype.beforeCreate = function () { };
    Base.prototype.created = function () { };
    Base.prototype.beforeDestroy = function () { };
    Base.prototype.destroyed = function () { };
    return Base;
}());
exports.Base = Base;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
var vueComponentFactory_1 = __webpack_require__(12);
exports.ComponentFactory = vueComponentFactory_1.VueComponentFactory;
__export(__webpack_require__(14));
var vueModuleFactory_1 = __webpack_require__(15);
exports.ModuleFactory = vueModuleFactory_1.VueModuleFactory;
var serviceFactoryBase_1 = __webpack_require__(16);
exports.ServiceFactory = serviceFactoryBase_1.ServiceFactoryBase;
__export(__webpack_require__(4));
var vueStoreFactory_1 = __webpack_require__(17);
exports.StoreFactory = vueStoreFactory_1.VueStoreFactory;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(0);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(0);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(6);
var index_2 = __webpack_require__(2);
function broswerPlatform() {
    var ModuleFactoryInstance;
    var StoreFactoryInstance;
    var ComponentFactoryInstance;
    var ServiceFatoryInstance;
    var LoaderInstance;
    function instantiation() {
        if (!LoaderInstance) {
            LoaderInstance = new index_1.Loader();
        }
        if (!ComponentFactoryInstance) {
            ComponentFactoryInstance = new index_2.ComponentFactory();
        }
        if (!ServiceFatoryInstance) {
            ServiceFatoryInstance = new index_2.ServiceFactory();
        }
        if (!StoreFactoryInstance) {
            StoreFactoryInstance = new index_2.StoreFactory();
        }
        if (!ModuleFactoryInstance) {
            ModuleFactoryInstance = new index_2.ModuleFactory({
                loader: LoaderInstance,
                componentFactory: ComponentFactoryInstance,
                serviceFactory: ServiceFatoryInstance,
                storeFactory: StoreFactoryInstance
            });
        }
    }
    function loadModule(namespace) {
        return ModuleFactoryInstance.put(namespace).then(function (moduleInstance) {
            ComponentFactoryInstance.boot(moduleInstance.moduleView, "#app");
        });
    }
    return {
        bootStrapModule: function (namespace) {
            instantiation();
            loadModule(namespace);
        }
    };
}
exports.broswerPlatform = broswerPlatform;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var systemjsLoader_1 = __webpack_require__(7);
exports.Loader = systemjsLoader_1.SystemJsLoader;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SystemJsLoader = (function () {
    function SystemJsLoader() {
    }
    SystemJsLoader.prototype.config = function () { };
    SystemJsLoader.prototype.load = function (namespace) {
        return window.SystemJS.import(namespace);
    };
    return SystemJsLoader;
}());
exports.SystemJsLoader = SystemJsLoader;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(1);
exports.Base = base_1.Base;
var componentBase_1 = __webpack_require__(9);
exports.ComponentBase = componentBase_1.ComponentBase;
exports.Component = componentBase_1.Component;
var moduleBase_1 = __webpack_require__(10);
exports.ModuleBase = moduleBase_1.ModuleBase;
exports.Module = moduleBase_1.Module;
var StoreBase_1 = __webpack_require__(11);
exports.StoreBase = StoreBase_1.StoreBase;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(1);
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(1);
function Module(options) {
    return function (constructor) {
        constructor.prototype.options = options;
    };
}
exports.Module = Module;
var ModuleBase = (function (_super) {
    __extends(ModuleBase, _super);
    function ModuleBase(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    return ModuleBase;
}(base_1.Base));
exports.ModuleBase = ModuleBase;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(1);
var StoreBase = (function (_super) {
    __extends(StoreBase, _super);
    function StoreBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StoreBase;
}(base_1.Base));
exports.StoreBase = StoreBase;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
var componentFactoryBase_1 = __webpack_require__(3);
var util_1 = __webpack_require__(13);
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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function mixin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var t = args.shift();
    var i = 0;
    var len = args.length;
    while (i < len) {
        var s = args[i];
        for (var key in s) {
            t[key] = s[key];
        }
        i++;
    }
    return t;
}
exports.mixin = mixin;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(0);
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


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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
var index_1 = __webpack_require__(2);
var VueModuleFactory = (function (_super) {
    __extends(VueModuleFactory, _super);
    function VueModuleFactory(args) {
        var _this = _super.call(this, args.loader) || this;
        _this.instanceCache = {};
        _this.loader = args.loader;
        _this.componentFactory = args.componentFactory;
        _this.serviceFactory = args.serviceFactory;
        _this.storeFactory = args.storeFactory;
        window.moduleFactory = _this;
        return _this;
    }
    VueModuleFactory.prototype.createServices = function (constructor) {
        var _this = this;
        var options = constructor.prototype.options;
        var services = options.services || [];
        var id = options.id;
        var servicesP = Promise.all(services.map(function (service) { return _this.serviceFactory.put(service, id); }));
        var moduleInstanceP = this.instanceCache[id];
        return Promise.all([
            moduleInstanceP,
            servicesP
        ]).then(function (_a) {
            var moduleInstance = _a[0], services = _a[1];
            moduleInstance.services = services;
            return moduleInstance;
        });
    };
    VueModuleFactory.prototype.changeComponentToModuleView = function (moduleInstance, deps) {
        var depT = deps.concat(moduleInstance).reduce(function (_a, dep) {
            var services = _a.services, stores = _a.stores;
            var id = dep.id;
            services[id] = dep.services.reduce(function (res, service) {
                res[service.name] = service;
                return res;
            }, {});
            stores[id] = dep.store;
            return { services: services, stores: stores };
        }, { services: {}, stores: {} });
        var mainComponent = moduleInstance.bootStrap;
        var view = this.componentFactory.changeComponentToModuleView(mainComponent, depT.services, depT.stores);
        moduleInstance.moduleView = view;
        return Promise.resolve(moduleInstance);
    };
    VueModuleFactory.prototype.createStore = function (constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var store = options.store;
        var moduleInstanceP = this.instanceCache[id];
        var storeP = this.storeFactory.put(store, id);
        return Promise.all([
            moduleInstanceP,
            storeP
        ]).then(function (_a) {
            var moduleInstance = _a[0], store = _a[1];
            moduleInstance.store = store;
            return moduleInstance;
        });
    };
    VueModuleFactory.prototype.createMainComponent = function (constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var mainComponent = options.bootStrap;
        var moduleInstanceP = this.instanceCache[id];
        var componentP = this.componentFactory.put(mainComponent, id);
        return Promise.all([
            moduleInstanceP,
            componentP
        ]).then(function (_a) {
            var moduleInstance = _a[0], componentInstance = _a[1];
            moduleInstance.bootStrap = componentInstance;
            return moduleInstance;
        });
    };
    VueModuleFactory.prototype.createModule = function (constructor) {
        var options = constructor.prototype.options;
        var id = options.id;
        var ins = new constructor(options.id);
        this.instanceCache[id] = Promise.resolve(ins);
        return this.instanceCache[id];
    };
    VueModuleFactory.prototype.createComponents = function (constructor) {
        var _this = this;
        var options = constructor.prototype.options;
        var id = options.id;
        var components = options.components || [];
        var componentsP = Promise.all(components.map(function (component) { return _this.componentFactory.put(component, id); }));
        var moduleInstanceP = this.instanceCache[id];
        return Promise.all([
            moduleInstanceP,
            componentsP
        ]).then(function (_a) {
            var moduleInstance = _a[0], componentsInstance = _a[1];
            moduleInstance.components = componentsInstance;
            return moduleInstance;
        });
    };
    return VueModuleFactory;
}(index_1.ModuleFactoryBase));
exports.VueModuleFactory = VueModuleFactory;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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
var base_1 = __webpack_require__(0);
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


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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
var storeFactoryBase_1 = __webpack_require__(4);
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


/***/ })
/******/ ])));
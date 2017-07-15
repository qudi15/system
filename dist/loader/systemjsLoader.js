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
//# sourceMappingURL=systemjsLoader.js.map
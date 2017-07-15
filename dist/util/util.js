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
//# sourceMappingURL=util.js.map
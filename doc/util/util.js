export function mixin(...args) {
    const t = args.shift();
    // tslint:disable-next-line:one-variable-per-declaration
    let i = 0;
    const len = args.length;
    while (i < len) {
        const s = args[i];
        for (const key in s) {
            t[key] = s[key];
        }
        i++;
    }
    return t;
}
//# sourceMappingURL=util.js.map
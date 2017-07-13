/**
 * Class File loader with SystemJs
 */
export class SystemJsLoader {
    config() { }
    /**
     * @public
     * @param {String} namespace - Module namespace.
     * @return {Promise<Object>}
     */
    load(namespace) {
        return window['SystemJS'].import(namespace);
    }
}
//# sourceMappingURL=systemjsLoader.js.map

/**
 * Class File loader with SystemJs
 */
export class SystemJsLoader {
    config(){}

    /**
     * @public
     * @param {String} namespace - Module namespace.
     * @return {Promise<Object>}
     */
    load(namespace: string){
        return (<any>window)['SystemJS'].import(namespace);
    }
}
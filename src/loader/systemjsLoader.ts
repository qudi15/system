
interface IWindowWithSystemJS extends Window {
    SystemJS: any;
}

/**
 * Class File loader with SystemJs
 */
export class SystemJsLoader {
    public config() {}

    /**
     * @public
     * @param {String} namespace - Module namespace.
     * @return {Promise<Object>}
     */
    public load(namespace: string){
        return (window as IWindowWithSystemJS).SystemJS.import(namespace);
    }
}
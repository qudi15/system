import * as systemjs from "systemjs";

export default class Loader {
    config(){}
    load(namespace: string){
        return systemjs.import(namespace);
    }
}
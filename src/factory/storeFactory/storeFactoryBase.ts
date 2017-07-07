import Factory from "../base";
import { StoreBase } from "../../base/storeBase";

export default class ComponentFactoryBase extends Factory {
    cache: Array<StoreBase>;
}
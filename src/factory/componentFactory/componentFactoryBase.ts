import Factory from "../base";
import { ComponentBase } from "../../base/componentBase";

export default class ComponentFactoryBase extends Factory {
    cache: Array<ComponentBase>;
}
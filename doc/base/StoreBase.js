import { Base } from "./base";
/**
 * Class StoreBase
 * @extends Base
 * @description Data store. more detail. {@link https://vuex.vuejs.org/ Vuex}
 * @example <caption>Flux</caption>
 * import { StoreBase } from "system/base/storeBase"
 * export default class Store extends StoreBase {
 *   state = {
 *     count: 0
 *   };
 *   getters = {
 *     count: state => {
 *       return state.count;
 *     }
 *   };
 *   mutations = {
 *     increment (state) {
 *       state.count++
 *     }
 *   };
 *   actions = {
 *     increment (context) {
 *       context.commit('increment')
 *     }
 *   };
 * }
 */
export class StoreBase extends Base {
}
//# sourceMappingURL=storeBase.js.map
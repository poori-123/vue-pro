import http from '../../api/http';
import {GETORDER} from '../../api/url';
export default {
    namespaced: true,
    state: {
        orderList: [],
    },
    mutations: {
        setOrder(state,payload){
            state.orderList = payload;
        }
    },
    actions: {
        async getOrder(store){
            var {data: {data}} = await http.get(GETORDER);
            // console.log(data);
            store.commit('setOrder', data);
        }
    }
}
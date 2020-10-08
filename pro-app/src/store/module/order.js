import http from '../../api/http';
import {GETORDERLIST} from '../../api/url';
export default {
    namespaced: true,
    state: {
        orderList: []
    },
    mutations: {
        setList(state,payload){
            state.orderList = payload;
        }
    },
    actions: {
        async getList(store, payload){
            var res = await http.get(GETORDERLIST,{
                id: payload
            });
            store.commit('setList', res.data.data);
        }
    }
}
import http from '../../api/http';
import {GETDISHINIT,GETDISH} from '../../api/url';
export default{
    namespaced: true,
    state: {
        listlength: 0,
        list: [],
    },
    mutations: {
        setInit(state,payload){
            state.listlength = payload.length;
            state.list = payload.data;
        },
        setList(state,payload){
            state.list = payload;
        },
    },
    actions: {
        async initDish(store){
            var {data: {length, data}} = await http.get(GETDISHINIT);
            store.commit('setInit',{
                data,
                length
            })
        },
        async GETDISHINIT(store,payload){
            var {data: {data}} = await http.get(GETDISH,{page: payload});
            store.commit('setList',data);
        }
    }
}
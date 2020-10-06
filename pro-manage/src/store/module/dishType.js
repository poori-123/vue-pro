import http from '../../api/http';
import {GETDISHTYPE} from '../../api/url';
export default{
    namespaced: true,
    state: {
        typeList: [],
    },
    mutations: {
        setTypeList(state, payload){
            state.typeList = payload;
        }
    },
    actions: {
        async getTypeList(store,payload){
            var { data : {list}} = await http.get(GETDISHTYPE);
            store.commit('setTypeList', list);
        }
    }
}
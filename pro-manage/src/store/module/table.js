import http from '../../api/http';
import {GETTABLELIST} from '../../api/url';

export default {
    namespaced: true,
    state: {
        tableList: [],
    },
    mutations: {
        setTableList(state,payload){
            state.tableList = payload;
        }
    },
    actions: {
        async getTableList(store,payload){
            var {data: {data}} = await http.get(GETTABLELIST);
            store.commit('setTableList',data);
        }
    }
}
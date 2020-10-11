import http from '../../api/http';
import {GETDISHINIT,GETDISH, GETTOPTENDISH} from '../../api/url';
export default{
    namespaced: true,
    state: {
        listlength: 0,
        list: [],
        topTen: []
    },
    mutations: {
        setInit(state,payload){
            state.listlength = payload.length;
            state.list = payload.data;
        },
        setList(state,payload){
            state.list = payload;
        },
        setTopTen(state,payload){
            state.topTen = payload;
        }
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
        },
        async getTopTen(store,payload){
            var {data: {data}} = await http.get(GETTOPTENDISH);
            data = data.map( item => ({
                name: item.dishName,
                img: item.dishImg,
                sales: item.dishSales,
                id: item._id
            }));
            store.commit('setTopTen', data);
        }
    }
}
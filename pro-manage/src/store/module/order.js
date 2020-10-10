import http from '../../api/http';
import {GETORDER, GETORDERPAGE} from '../../api/url';
export default {
    namespaced: true,
    state: {
        orderList: [],
        length: 0,
        orders: []
    },
    mutations: {
        setOrder(state,payload){
            state.orderList = payload;
        },
        setOrderInit(state,payload){
            state.length = payload.length;
            state.orders = payload.orders;
        },
        setOrderPage(state,payload){
            state.orders = payload;
        }
    },
    actions: {
        async getOrder(store){
            var {data: {data}} = await http.get(GETORDER);
            // console.log(data);
            store.commit('setOrder', data);
        },
        async getOrderInit(store){
            var {data: {data}} = await http.get(GETORDER);
            var length = data.length;
            if(length > 10){
               data = data.splice(0,10); 
            }
            var arr = data.map(item => ({
                id: item._id,
                time: item.time,
                price: item.money,
                tId: item.tableId.tableId,
                status: item.status
            }));
            store.commit('setOrderInit', {
                length,
                orders: arr
            })
        },
        async getOrderPage(store,payload){
            var {data: {data}} = await http.get(GETORDERPAGE, {page:payload});
            var arr = data.map(item => ({
                id: item._id,
                time: item.time,
                price: item.money,
                tId: item.tableId.tableId,
                status: item.status
            }));
            store.commit('setOrderPage', arr);
        }

    }
}
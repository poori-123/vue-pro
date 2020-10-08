import http from '../../api/http';
import { GETDISH, GETDISHTYPE } from '../../api/url';
export default{
    namespaced: true,
    state: {
        dishes: []
    },
    mutations: {
        setInit(state,payload){
            state.dishes = payload;
        }
    },
    actions: {
        async getDishes(store){
            var {data: {type}} = await http.get(GETDISHTYPE);
            var {data: {dishes}} = await http.get(GETDISH);
            dishes.forEach(item => {
                item.dishTage = JSON.parse(item.dishTage);
            });
            var list = type.map( item => ({
                tn: item.typeName,
                ti: item._id,
                list: dishes.filter( dish=> {
                    return dish.dishType == item._id;
                } )
            }) );
            var obj1 = {
                tn: '热销',
                ti: '001',
                list: dishes.filter( item => {
                    return item.dishTage.indexOf('推荐') != -1;
                } )
            };
            var obj2 = {
                tn: '新品',
                ti: '002',
                list: dishes.filter( item => {
                    return item.dishTage.indexOf('新品') != -1;
                } )
            };
            list.unshift(obj2);
            list.unshift(obj1);

            store.commit('setInit', list);
        }
    }
}
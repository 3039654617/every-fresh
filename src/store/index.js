import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    size: 7,
    sortType: 'all',
    goodsList: [],
    loading: false,
    preGoods: '',
    goodsType: '',
    counterMap: {},
  },
  mutations: {
    storageChange(state, obj) {
      if(state.counterMap[obj.id]){
        if((obj.value === -1 && state.counterMap[obj.id]  === +1) || obj.value === -Infinity){
          Vue.delete(state.counterMap, obj.id);
        }else{
          Vue.set(state.counterMap, obj.id, state.counterMap[obj.id] + obj.value);
        }
      }else{
        Vue.set(state.counterMap, obj.id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setGoodsList(state, arr) {
      state.goodsList = [...arr.list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, goodsType) {
      state.goodsType = goodsType;
    },
  },
    
  actions: {
    getSideList({commit, state}, type) {
      commit('setLoading', true);
      return api.getSideArr(type).then((data) =>{
        setTimeout(() => {
          commit('setSideList', data);
          console.log(data, state)
          commit('setLoading', false);
        },1000);
      })        
    },
    getGoodsList({ commit, state }, t) {
      if(state.preGoods === t.type){
        return
      }
      state.preGoods = t.type;
      const type = t.type || state.goodsType;
      const { page } = t;
      return api.getGoodsList(type, page, state.size, state.sortType).then((data) => {
        commit('setGoodsList', data);
        console.log(data)
        commit('setGoodsType', type);
        // if(data.total > state.goodsList.length){
          // return true
        // }
        // return false
      });
    },
  },
  modules: {
  },
});


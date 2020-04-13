// 状态管理

const state = {
    nm : window.localStorage.getItem('nowNM') || '北京',
    id : window.localStorage.getItem('nowID') ||  1
};

const actions = {

};

const mutations = {
    CITY_INFO(state , payload){//状态管理的方法大写
        state.nm = payload.nm;
        state.id = payload.id;
    }
};

export default { 
    namespaced : true,
    state,
    actions,
    mutations
}
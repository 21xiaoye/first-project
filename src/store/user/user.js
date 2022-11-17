export default {
    actions: {
        
    },
    mutations: {
        USERTOKEN(state, value) {
            state.usertoken=value
        },
        USERINFO(state, value) {
            state.userinfo=value
        }
    },
    state: {
        usertoken: localStorage.getItem("Token"),
        userinfo:{}
    },
    getters: {
        
    }
}
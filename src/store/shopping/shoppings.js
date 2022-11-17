export default {
    actions: {
        
    },
    mutations: {
        CLASSF(state, value) {
            state.classF = value
        },
        BANNERLIST(state, value) {
            state.bannerlist = value
        },
        CLASSFLIST(state, value) {
            state.classFList = value
        },
        PRODUCTIONFO(state, value) {
            state.productinfoList=value
        },
        COMMODITY(state, value) {
            state.commodity=value
        }
    },
    state: {
        classF: {},
        bannerlist: [],
        classFList: {},
        productinfoList: {},
        commodity:[]
    },
    getters: {
        brand(state) {//品牌
			return state.classFList[0]|| []
		},
		other(state) {//其它
			return state.classFList[2] || []
		},
		recommend(state) {//推荐
			return state.classFList[1] || []
		}
    }
}
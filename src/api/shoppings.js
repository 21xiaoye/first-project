import axios from "axios";
import store from '../store/index'
axios.defaults.withCredentials=true
const shoppings = axios.create({
    baseURL: '',
    timeout:5000
})

shoppings.interceptors.request.use((config) => {
    if (store.state.user.usertoken) {
        config.headers['Authorization'] = store.state.user.usertoken;
    }
    return config;
})

shoppings.interceptors.response.use((res) => {
    return res.data;
})
export default shoppings
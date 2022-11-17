import {
    Notify,Toast
} from 'vant';
// 全局注册
Vue.use(Notify, Toast);

export function Notifys(err) {
    // Notify({
    //     type: 'warning', message: err, background: 'red', color: 'white', duration: 1500,
    // })
}
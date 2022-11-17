<!--vant组件二次封装-->
<template>
    <div @click="onChange">
        <!--性别的弹出层-->
        <div class="sex" v-show='rn=="sex"'>
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                <van-picker
                    title="选择性别"
                    show-toolbar
                    :columns="columns"
                    @confirm='onConfirm'
                />
            </van-popup>
        </div>

        <!--年龄的弹出层 -->
        <div v-show='rn=="age" '>
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                <div>
                    <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        title="选择年龄"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @confirm='onDate("ages")'
                    />
                </div>
            </van-popup>
        </div>

        <!-- 生日的弹出层 -->
        <div v-show='rn=="birthday" '>
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                <div>
                    <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        title="选择生日"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @confirm='onDate("birthday")'
                    />
                </div>
            </van-popup>
        </div>

        <!-- 所在地弹出层 -->
        <div v-show='rn=="city"'>
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                <div>
                    这里是所在地的弹出层
                </div>
            </van-popup>
        </div>

        <!--购物车弹出层-->
        <div v-show='rn=="chart"'>
            <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
                <div>
                    这里是购物车的弹出层
                </div>
            </van-popup>
        </div>
    </div>

</template>
<script>
import Vue from 'vue';
import { Picker } from 'vant';
Vue.use(Picker);
import {
    updateUserInfo
} from '../api/index'
export default {
    data() {
        return {
            show: true,
            columns: ['男', '女'],
            minDate: new Date(1901, 0, 1),//最小时间
            maxDate: new Date(),//最大时间
            currentDate: new Date(),
        }
    },
    props:['rn'],
    methods: {
        onConfirm(sex) {//确定
            updateUserInfo({ sex });
        },
        onDate(cs) {
            let y = new Date().getFullYear()//当前年
            var d = this.currentDate
            var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                //+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            //分割时间
            let date = datetime.split('-')
            console.log(cs)
            if (cs == 'ages') {
                let age = String(y - date[0])
                updateUserInfo({ age });
            } else {
                var birthday =date[1] + "月" + date[2] + "日"
                updateUserInfo({ birthday})
            }
        },
        onChange() {//该方法用来通知父组件重新渲染页面、显示和隐藏弹出层
            this.$bus.$emit("www",false);
        },
    }
}
</script>
<style lang="less" scoped>
// .sex{
//     .van-popup{
//         .main{
//             ul{
//                 display: flex;
//                 li{
//                     flex: 1;
//                     padding-top:4vw;
//                 }
//                 li:first-child{
//                     padding-left:4vw;
//                 }
//                 li:last-child{
//                     text-align: right;
//                     padding-right: 4vw;
//                 }
//                 li:nth-child(2){
//                     text-align: center;
//                 }
//             }
//         }
//     }
// }
</style>
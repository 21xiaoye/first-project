<template>
    <div>
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="floor" v-show="$route.meta.productinfo">
            <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o" @click="$router.push({name:'shoppinghome'})">首页</van-tabbar-item>
                <van-tabbar-item icon="search" @click="getClassF">分类</van-tabbar-item>
                <van-tabbar-item icon="shop-collect-o">购物车·</van-tabbar-item>
                <van-tabbar-item icon="smile-o">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div> 
</template>

<script>
import { classFList } from '../../api';
export default {
    data() {
        return {
            active: 0,
            value:''
        }
    },
    methods: {
        getClassF() {
            this.$router.push({ name: 'classf' });
            classFList(100).then((res) => {
                if (res.code == 200) {
                    this.$store.commit("CLASSFLIST",res.data)
                }
            })
        }
    },
    mounted() {
        this.$router.push({
            name:'shoppinghome'
        })
    }
}
</script>

<style lang="less" scoped>
    .main{
    }

</style>
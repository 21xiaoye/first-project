<!--底部-->
<template>
    <div v-show="$route.meta.show">
        <van-tabbar v-model="active" >
            <van-tabbar-item icon="home-o" @click="$router.push({name:'home'})">首页</van-tabbar-item>
            <van-tabbar-item icon="search" @click="$router.push({name:'search'})">搜索</van-tabbar-item>
            <van-tabbar-item icon="friends-o" @click="$router.push({name:'personal'})">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    watch: {
    }
}
</script>

<style>

</style>
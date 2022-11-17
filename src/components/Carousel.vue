<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="1500">
            <van-swipe-item v-for="bannerlist in list">
                <img :src="bannerlist.banner" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['list']
}
</script>

<style lang="less" scoped>
.my-swipe {
    width: 100%;
    height: 200px;
    .van-swipe-item {
        img {
            width: 100%;
            height: 200px;
        }
    }
}
</style>
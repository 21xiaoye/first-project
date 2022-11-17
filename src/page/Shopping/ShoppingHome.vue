<template>
    <div class="control">
        <div class="header">
            <ul>
                <li @click="$router.push({name:'personal'})"><van-icon name="arrow-left"/></li>
                <li><van-search v-model="value" placeholder="请输入搜索关键词" /></li>
                <li><van-icon name="ellipsis" /></li>
            </ul>
        </div>
        <div>
            <carousel :list="bannerlist"></carousel>
        </div>
    </div>
</template>
<script>
import {
    BannerList
} from '../../api/index'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            value:""
        }
    },
    mounted() {
        BannerList().then((res) => {
            if (res.code == 200) {
                this.$store.commit("BANNERLIST",res.data)
            }
        })
    },
    computed: {
        ...mapState({
            bannerlist: (state) => {
                return state.shoppings.bannerlist
            }
        })
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
.control{
    .header{
        background-color: transparent;
        display: block;
        ul{
            display: flex;
            li{
                font-size: 20px;
                padding-left: 3vw;
                flex: 1;
            }
            li:not(:nth-child(2)){
                padding-top: 4vw;
            }
            li:nth-child(2){
                flex:4;
            }
        }
    }
}

</style>
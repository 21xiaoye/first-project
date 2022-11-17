<template>
    <div class="header">
        <div class="main">
            <ul @click="$router.push({name:'photos'})">
                <li><van-icon name="photo-o" color="#1989fa"/></li>
                <li>精选照片</li>
                <li><van-icon name="arrow" /></li>
            </ul>
            <ul >
                <li v-for="(photos,index) in userinfolist.featured" v-if="index<4">
                    <van-image
                        width="100"
                        height="100"
                        :src="photos.content"
                    />
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            userinfolist: (state) => {
                return state.user.userinfo
            }
        })
    },
}
</script>
<style lang="less" scoped>
.header{
    .main{
        ul:first-child{
            display: flex;
            li{
                margin: auto;
            }
            li:first-child{
                flex:1;
                font-size: 30px;
                padding-left: 2vw;
            }
            li:nth-child(2){
                flex:3;
                letter-spacing: 2px;
            }
            li:last-child{
                flex:3;
                text-align: right;
                padding-right: 5vw;
            }
        }
        ul:last-child{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 24%;
                height: 100%;
                margin-top: 5px;
            }
            .list:last-child:nth-child(4n - 1) {
                margin-right: calc(24% + 4% / 3);
            }
            li:last-child:nth-child(4n - 2) {
                margin-right: calc(24% + 8% / 3);
            }
        }
    }
}
</style>
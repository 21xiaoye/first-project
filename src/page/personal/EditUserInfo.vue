<template>
    <div>
        <div class="header" v-show="$route.meta.edit">
            <div class="image">
                <van-nav-bar
                    left-arrow
                    @click-left="onClickLeft"
                />
                <van-image
                    round
                    width="8rem"
                    height="8rem"
                    :src="userinfolist.user_pic"
                />
            </div>
            <div class="edit">
                <ul>
                    <span>
                        <li>昵称</li>
                        <li>{{userinfolist.username}}<van-icon name="arrow" /></li>
                    </span>
                    <span>
                        <li>封面</li>
                        <li><img :src="userinfolist.user_bg" style="width:12vw;"/></li>
                    </span>
                    <span @click="$router.push({name:'sign'})">
                        <li>个性签名</li>
                        <li>{{userinfolist.sign}}<van-icon name="arrow" /></li>
                    </span>
                </ul>
                <ul>
                    <span @click='Onpop("sex")'>
                        <li>性别</li>
                        <li>{{userinfolist.sex}}<van-icon name="arrow" /></li>
                    </span>
                    <span @click='Onpop("age")'>
                        <li>年龄</li>
                        <li>{{userinfolist.age}}<van-icon name="arrow" /></li>
                    </span>
                    <span @click='Onpop("birthday")'>
                        <li>生日</li>
                        <li>{{userinfolist.birthday}}<van-icon name="arrow" /></li>
                    </span>
                    <span @click='Onpop("city")'>
                        <li>所在地</li>
                        <li>{{userinfolist.city}}<van-icon name="arrow"/></li>
                    </span>
                </ul>
                <ul>
                    <span>
                        <li>兴趣标签</li>
                        <li>{{userinfolist.interest}}<van-icon name="arrow"/></li>
                    </span>
                </ul>
            </div>
        </div>
        <PopUp v-show="pop" :key="componentKey" :rn="rn"></PopUp>
        <router-view></router-view>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import {
    userinfo
} from '../../api/index'
import PopUp from '../../components/popUp.vue';
export default {
    data() {
        return {
            pop: false,//控制弹出层
            componentKey: 0,
            rn:''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        Onpop(value) {
            this.pop = true;
            this.rn = value
        }
    },
    mounted() {
        this.$bus.$on("www", (value) => {
            this.pop = value;
            this.componentKey+=1//强制渲染popUp页面
            userinfo().then((res) => {
                if (res.code == 200) {
                    this.$store.commit("USERINFO", res.data)
                }
            })
        })
    },
    computed: {
        ...mapState({
            userinfolist: (state) => {
                return state.user.userinfo;
            }
        })
    },
    components: { PopUp }
}
</script>

<style lang="less" scoped>
.header{
    overflow: auto;
    .image{
        background-color:  #d3d3d32c;
        height: 53.5vw;
        .van-image{
            display:block;
            margin:3.5vw auto;
            border:1px solid white;
        }
        .van-nav-bar{
            background-color: #d3d3d30c;
        }
    }
    .edit{
        ul:not(:first-child){
            margin-top:10%;
        }
        ul:first-child{
            span:nth-child(2){
                height: 15vw;
                li:first-child{
                    margin:auto
                }
                li:last-child{
                    margin: auto;
                    padding-right: 6vw;
                }
            }
        }
        ul{
            margin-top:2%;
            span{
                margin: 4vw 0 0 3vw;
                padding-bottom: 3vw;
                border-bottom: 1px solid rgba(189, 186, 186, 0.226);
                display: flex;
                li:first-child{
                    flex:1;
                }
                li:last-child{
                    flex:4;
                    text-align: right;
                    .van-icon{
                        padding-right: 4vw;
                    }
                }
            }
        }
    }
}
</style>
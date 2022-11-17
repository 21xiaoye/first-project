<template>
    <div>
            <div class="header" v-show="$route.meta.show">
                <div class="main">
                    <!--功能区-->
                    <div class="icon"  @click="showbg=true" :style="{ backgroundImage: `url(${this.userinfolist.user_bg})`}"> 
                        <ul>
                            <li><van-icon name="friends-o" /></li>
                            <li @click="$router.push({name:'setup'})"><van-icon name="setting-o"/></li>
                            <li><van-icon name="chat-o" /></li>
                        </ul>
                    </div>
                    <!--用户-->
                    <div class="image">
                        <!--头像-->
                        <div class="images">
                            <van-image style="position:relative;" round width="100%" height="100%"
                                :src="userinfolist.user_pic" @click="show=true"/>
                            <van-uploader :after-read="afterRead" style="position:absolute" />
                            <van-overlay :show="show" @click="show = false" ><!--遮障层-->
                                <div class="wrapper" @click.stop>
                                    <div class="block" @click="show=false">
                                        <img :src="userinfolist.user_pic" style="width:100%;height:100%;"/>
                                    </div>
                                </div>
                            </van-overlay>
                        </div>
                        <!--用户信息-->
                        <div class="user-text">
                            <ul>
                                <h2>{{ userinfolist.username }}</h2>
                                <li>{{ userinfolist.email}}</li>
                            </ul>
                        </div>
                    </div>

                    
                    <div class="personal">
                        <!--个性签名-->
                        <div class="sign" @click="$router.push({name:'sign'})">
                            <p>{{userinfolist.sign}}<span><van-icon name="edit" /></span></p>
                        </div>
                        <!--兴趣标签-->
                    </div>
                    
                    <!--精选图片-->
                    <Featuredphotos></Featuredphotos>

                    <!--购物-->
                    <Shopping></Shopping>
                </div>
            </div>
            <router-view></router-view>
        <!--弹出层-->
        <van-popup v-model="showbg" position="bottom" :style="{ height: '33%' }">
            <li>
                <van-uploader :after-read="setbg">
                    <van-button>自定义封面</van-button>
                </van-uploader>
            </li>
            <li @click="getshowbg = true, showbg = false">
                查看封面
            </li>
            <li @click="showbg = false">
                取消
            </li>
        </van-popup>
        
        <!--遮障层-->
        <van-overlay :show="getshowbg" @click="getshowbg = false" >
            <div class="wrapper" @click.stop>
                <div class="block" @click="getshowbg=false">
                    <img :src="userinfolist.user_bg" style="width:100%;height:100%;"/>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import {
    avatars,
    userinfo,
    userBg
} from '../../api/index'
import {
    mapState
} from 'vuex'
import Featuredphotos from './Featuredphotos.vue'
import Shopping from '../Shopping/Shopping.vue'
export default {
    data() {
        return {
            show: false,
            count: 0,
            isLoading: false,
            showbg: false,
            getshowbg:false
        }
    },
    components: {
        Featuredphotos,
        Shopping
    },
    methods: {
        setbg(file) {//设置背景
            let name = file.file.name
            let bg = file.content;
            userBg({ name, bg }).then((res) => {
                if (res.code == 200) {
                    this.getUserInfo()
                    this.showbg = false;//设置完背景，弹出层隐藏
                }
            })
        },
        afterRead(file) {//上传头像
            // let fd = new FormData();
            // fd.append('file', params.file)
            let name = file.file.name
            let avatar = file.content;
            avatars({ name, avatar }).then((res) => {
                if (res.code == 200) {
                    this.getUserInfo()//更换头像刷新
                }
            })
        },
        getUserInfo() {
            userinfo().then((res) => {
                if (res.code == 200) {
                    this.$store.commit("USERINFO", res.data)
                    this.$bus.$emit("photos","23")
                }
            })
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
.header {
    .main {
        .icon{
            height: 60vw;
            background-size: cover;
            ul{
                list-style: none;
                li{
                    float: right;
                    font-size:20px;
                    font-weight: bolder;
                    margin-top:1.5vw;
                    margin-right: 2vw;
                }
                li:not(:first-of-type){
                    margin-right: 15px;
                }
            }
        }
        .image {
            width: 100vw;
            height: 33vw;
            display: flex;
            .images {
                width: 30%;
                height: 31vw;
                margin-top: 1vw;

                .van-uploader {
                    margin: 5.5vw 0 0 -25vw;
                    opacity: 0;
                }

                .van-overlay{
                    .wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        .block {
                            width: 100%;
                            height: 60%;
                            background-color: #fff;
                        }
                    }
                }
            }
        }

        .user-text {
            width: 65%;
            height: 100%;
            margin-left: 10px;
            display: block;

            ul {
                h1 {
                    letter-spacing: 1px;
                }
            }

            .set-bottom {
                float: left;

                li {
                    float: left;
                    list-style: none;
                    margin-top: 8vw;
                    font-size: 10px;
                    line-height: 13px;
                }

                li:not(:first-child) {
                    margin-left: 8vw;
                }
            }
        }

        .personal{
            padding-left: 2vw;
            .sign{
                p{
                    border-bottom:1px solid rgb(224, 224, 224);
                    line-height: 26px;
                }
            }
        }
    }
}
.van-popup{
    li{
        list-style: none;
        text-align: center;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 1px;
        padding: 5vw 0 5vw 0;
        border-bottom: 1px solid rgb(231, 229, 229);
    }        
    li:last-child{
        border-bottom: none;
    }
    li:first-child{
        .van-uploader{
            width: 100%;
            height: 100%;
            .van-button{
                background-color:white;
                color: black;
                width: 100vw;
                height: 10vw;
                font-size: 20px;
                border: none;
                }
            }
        }
    }
</style>
<template>
    <div class="header">
        <div class="main" v-show="$route.meta.update">
            <div>
                <van-nav-bar title="设置">
                    <template #left>
                        <van-icon name="arrow-left" size="25" @click="$router.push({name:'personal'})"/>
                    </template>
                    <template #right>
                        <van-icon name="home-o" size="25" @click="$router.push({name:'home'})"/>
                    </template>
                </van-nav-bar>
            </div>
            <div class="set">
                <ul>
                    <span style="display:flex">
                        <li style="flex:1;padding-top:8vw">账号</li>
                        <li style="font-size:10px;flex:4">
                            <img :src="userinfolist.user_pic" style="width:16vw;padding-left:50%"/>
                        </li>
                    </span>
                    <span style="display:flex">
                        <li style="flex:1">邮箱</li>
                        <li style="font-size:14px;flex:4">{{userinfolist.email}}</li>
                    </span>
                </ul>
                <ul>
                    <span @click="$router.push({name:'edituserinfo'})">
                        <li>编辑资料</li>
                        <li><van-icon name="arrow" /></li>
                    </span>
                    <span @click="$router.push({name:'register'})">
                        <li>注册账号</li>
                        <li><van-icon name="arrow" /></li>
                    </span>
                    <span @click="$router.push({name:'updatepassword'})">
                        <li>修改密码</li>
                        <li><van-icon name="arrow" /></li>
                    </span>
                </ul>
                <ul>
                    <span>
                        <li>帮助</li>
                        <li><van-icon name="arrow" /></li>
                    </span>
                </ul>
                <ul>
                    <li @click="loginout">退出</li>
                </ul>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import {
    Dialog
} from 'vant';
export default {
    methods: {
        loginout() {
            Dialog.confirm({
                title: '退出登录',
                message: '确认退出登录？',
                })
                .then(() => {
                    this.$store.commit("USERTOKEN", '');
                    this.$store.commit("USERINFO",'')
                    localStorage.removeItem("Token");
                    this.$router.push({name:'home'})
            })
                .catch(() => {
            });
        }
    },
    computed: {
        ...mapState({
            userinfolist: (state) => {
                return state.user.userinfo
            }
        })
    }
}
</script>

<style lang="less" scoped> 
.header{
    .main{
        background-color: rgb(237, 243, 248);
        .set{
            ul{
                span{
                    display: flex;
                    li{
                        background-color: white;
                        flex: 1;
                        font-size: 20px;
                        line-height: 25px;
                        letter-spacing: 2px;
                        padding: 2vw 0 2vw 0;
                        padding-left: 5%;
                        border-bottom: 1px solid rgb(228, 226, 226);
                    }
                    li:last-child{
                        padding-left: 30%;
                        i{
                            padding-left: 70%;
                        }
                    }
                }
            }
            ul:not(:first-child){
                padding-top:5vw;
            }
            ul:last-child{
                li{
                    width: 100%;
                    background-color: white;
                    text-align: center;
                    border-bottom: 1px solid rgb(228, 226, 226);
                    padding: 2vw 0 2vw 0;
                }
            }
        }
    }
}
</style>
<template>
    <div class="header">
        <div class="home">
            <span><van-icon name="home-o" @click="$router.push({name:'home'})"/></span>
        </div>
        <div class="main">
            <p>添加账号</p>
        </div>
        <div class="lg">
            <ul>
                <li><input value="" placeholder="用户名/手机号" v-model="username"/></li>
                <li><input type="password" placeholder="密码" v-model="password"/></li>
            </ul>
        </div>
        <div class="submit">
            <li><button @click="login">登录</button></li>
        </div>
        <div class="set">
            <ul>
                <li @click="$router.push({name:'register'})">新用户注册</li>
                <li>忘记密码</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    Notify,Toast
} from 'vant';
// 全局注册
Vue.use(Notify,Toast);
import {
    login,
    userinfo
} from '../../api/index'
export default {
    data() {
        return {
            username: '',
            password:''
        }
    },
    methods: {
        login() {
            const { username, password } = this
            let vm=this
            if (!username) {
                Notify({
                    type: 'warning', message: '用户名不能为空', background: 'red', color: 'white', duration: 1500,
                });
            }
            else if (!password) {
                Notify({
                    type: 'warning', message: '密码不能为空', background: 'red', color: 'white', duration: 1500,
                });
            }
            else {
                Toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '登陆中...',
                });
                login({ username, password }).then((res) => {
                    if (res.code == 200) {
                        this.$store.commit("USERTOKEN", res.token)
                        localStorage.setItem("Token", res.token)
                        Toast.success('登录成功')
                        Toast.clear()
                        const timer = setTimeout(function () {
                            vm.$router.push({ name: 'personal' })
                            clearImmediate(timer);
                        },500)
                    } else {
                        Toast.fail(res.msg)
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    .home{
        margin-top:3vw;
        span{
            margin-left:5%;
            font-size: 25px;
        }
    }
    .main{
        padding:30% 0 0 15vw;
        p{
            font-size:30px;
            font-weight: bold;
        }
    }
    .lg{
        ul{
            margin-left:15%;
            li{
                input{
                    height: 15vw; 
                    width:80%;
                    border:none;
                    border-bottom: 1px solid rgb(226, 225, 225);
                }
            }
        }
    }
    .submit{
        li{
            list-style: none;
            margin:10% 0 0 15%;
            button{
                width: 80%;
                height:13vw;
                border:none;
                background-color: rgb(91, 177, 247);
                color: white;
                font-size: 20px;
                letter-spacing: 10px;
            }
        }
    }
    .set{
        ul{
            margin:40vw 0 0 25%;
            li{
                float: left;
                width:30%;
            }
            li:not(:last-child){
                padding-right: 4vw;
            }
            li:last-child{
                text-align: right;
                border-left: 1px solid rgb(20, 20, 20);
            }
        }
    }
}
</style>
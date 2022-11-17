<template>
    <div class="header">
        <div class="main">
            <div class="login">
                <p>
                    <span style="color: rgb(0, 162, 255);margin-right: 53vw;" @click="$router.go(-1)">
                        <van-icon name="arrow-left"/>
                    </span>
                    已有账号
                    <span @click="$router.push({name:'login'})">登录</span>
                </p>
                <p>注册账号</p>
            </div>
            <div class="reg">
                <ul>
                    <li>
                        <input type="text" v-model="username" placeholder="请输入用户名"/>
                    </li>
                    <li>
                        <input type="text" v-model="email" placeholder="请输入邮箱"/>
                    </li>
                    <li>
                        <van-cell-group>
                            <van-field
                                v-model="code"
                                center
                                clearable
                                placeholder="请输入邮箱验证码"
                            >
                                <van-button slot="button" size="small" type="primary" @click="getcode()">发送验证码</van-button>
                            </van-field>
                        </van-cell-group>
                    </li>
                    <li>
                        <input type="password" v-model="password" placeholder="请输入密码"/>
                    </li>
                </ul>
            </div>
            <div class="button">
                <li>
                    <button @click="reg()">注册</button>
                </li>
            </div>
            <div class="hiht">
                <p>提示:暂只支持<span>qq邮箱</span>注册</p>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    Notify,Toast
} from 'vant';
// 全局注册
Vue.use(Notify, Toast);

import {
    reguser,postCode
} from '../../api/index'
export default{
    data(){
        return{
            username: '',//用户名
            email: '',//邮箱
            password: '',//密码
            code:''//验证码
        }
    },
    methods: {
        isMobile (mobile) {//验证邮箱
            return /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(mobile)
        },
        Notifys(err) {
            Notify({
                type: 'warning', message: err, background: 'red', color: 'white', duration: 1500,
            });
        },
        reg() {//注册
            const { username, password, code ,email} = this
            if (!username) {
                this.Notifys("用户名不能为空")
            } else if (!code) {
                this.Notifys('验证码不能为空')
            } else if (!password) {
                this.Notifys('密码不能为空')
            }
            reguser({ username, password, code, email }).then((res) => {
                if (res.code == 200) {
                    Notify({ type: 'success', message: '注册成功', color: 'white', duration: 1500 });
                    this.$router.push({name:'login'})
                }
            })
        },
        getcode() {//发送验证码
            const {email}=this
            if (!email) {
                this.Notifys("邮箱不能为空")
            } else {
                this.isMobile(email) ? postCode({email}) : this.Notifys("邮箱格式不正确")
            }
        }
    } 
}
</script>
<style lang="less" scoped>
.header{
    .main{
        .login{
            p{
                span{
                    color:red;
                    padding-right:4vw;
                    font-weight: bold;
                }
            }
            p:first-child{
                text-align: right;
                line-height: 26px;
                letter-spacing: 1px;
            }
            p:last-child{
                padding-left:5vw ;
                font-size: 20px;
            }
        }
        .reg{
            ul{
                li{
                    margin-top: 5vw;
                    height: 15vw;
                    input{
                        width:90%;
                        border: none;
                        height: 15vw;
                        border-bottom: 1px solid rgb(231, 225, 225);
                        padding-left: 4vw;
                        font-size: 15px;
                        letter-spacing: 1px;
                    }
                    input::placeholder{
                        color: rgb(223, 226, 226);
                    }
                }
            }
        }
        .button{
            li{
                width: 100%;
                list-style: none;
                margin-top:8vw;
                button{
                    height: 14vw;
                    width: 76%;
                    margin-left: 12%;
                    border:none;
                    background-color: rgb(85, 128, 248);
                    font-size: 20px;
                    color: white;
                    letter-spacing: 5px;
                }
            }
        }
        .hiht{
            padding-left: 5vw;
            margin-top:10vw;
            p{
                font-size: 15px;
                line-height: 20px;
                letter-spacing: 1px;
                text-align: right;
                padding-right: 5vw;
                span{
                    color: red;
                }
            }
        }
    }
}
</style>
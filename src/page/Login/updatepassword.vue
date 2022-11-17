<template>
    <div>
        <div class="header">
            <div class="main">
                <van-nav-bar
                    title="修改密码"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                />
            </div>
            <div class="fromlist">
                <ul>
                    <li>
                        <input type="text" placeholder="请输入用户名" v-model="username"/>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入邮箱"  v-model="email"/>
                    </li>
                    <li>
                        <input type="text" placeholder="验证码" v-model="code"/><i @click="getcode"><button>验证码</button></i>
                    </li>
                    <li>
                        <input type="password" placeholder="请输入旧密码" v-model="oldpassword"/>
                    </li>
                    <li>
                        <input type="password" placeholder="请输入新密码" v-model="newpassword"/>
                    </li>
                </ul>
            </div>

            <div class="control">
                <li @click="updatepwd">
                    <button>修改密码</button>
                </li>
            </div>

            <div class="hiht">
                <li>温馨提示:密码必须是6到18位的英文字母、数字、字符组合</li>
                <li>忘记原密码？</li>
            </div>
        </div>
    </div>
</template>

<script>
import {
    postCode,updatePassword
} from '../../api/index'
import Vue from 'vue';
import {
    Notify,Toast
} from 'vant';
// 全局注册
Vue.use(Notify, Toast);
export default {
    data() {
        return {
            email: '',
            oldpassword: '',
            newpassword:'',
            code: '',
            username:''
        }
    },
    methods: {
        Notifys(err) {
            Notify({
                type: 'warning', message: err, background: 'red', color: 'white', duration: 1500,
            });
        },
        onClickLeft() {
            this.$router.push({name:'setup'})
        },
        updatepwd() {
            const { username, oldpassword, newpassword, code } = this
            if (!username) {
                this.Notifys("用户名不能为空")
            }
            else if (!code) {
                this.Notifys("验证码不能为空")
            }
            else if (oldpassword == newpassword) {
                this.Notifys("新密码不能和旧密码相同")
            } else {
                updatePassword({oldpassword, newpassword, username, code }).then((res) => {
                    console.log(res)
                })
            }
        },
        getcode() {
            const { email } = this
            if (!email) {
                this.Notifys("邮箱不能为空")
            } else {
                this.isMobile(email) ? postCode({email}) : this.Notifys("邮箱格式不正确")
            }
        }
    },
    computed: {
    },
}
</script>

<style lang="less" scoped>
.header{

    .fromlist{
        ul{
            li{
                margin:5vw 0 0 10%;
                border-bottom: 1px solid rgb(236, 233, 233);
                input{
                    height: 10vw;
                    border:none
                }
            }
            li:nth-child(3){
                button{
                    margin-left: 3vw;
                    height: 10vw;
                    width: 25vw;
                    border: none;
                    background-color: rgb(81, 208, 240);
                    color: white;
                    line-height: 26px;
                    letter-spacing: 1px;
                    
                }
            }
        }
    }
    .control{
        li{
            list-style: none;
            margin-top:10vw;
            button{
                width: 80%;
                height: 12vw;
                background-color: rgb(102, 154, 250);
                border: none;
                color: white;
                line-height: 26px;
                font-size: 18px;
                letter-spacing: 1px;
                margin-left: 10%;
            }
        }
    }

    .hiht{
        li{
            list-style: none;
            padding:5vw 0 0 10%;
            line-height: 24px;
        }
        li:last-child{
            color: rgb(134, 175, 250);
        }
    }
}
</style>
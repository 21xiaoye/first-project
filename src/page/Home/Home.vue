<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="header">
                <div class="main">
                    <div class="start">
                        <van-image round width="100%" height="100%" 
                            :src="userinfolist.user_pic">
                        </van-image>
                    </div>
                    <div class="end">
                        <li>
                            {{userinfolist.username}}
                        </li>
                    </div>
                </div>
            </div>
            <div class="control">
                <div class="web-im">
                    聊天室
                    <button @click="login">开始聊天</button>
                </div>
                <div class="content">
                    <div class="li" :class="{user: item.uid == uid}" v-for="item in messageList">
                        <template v-if="item.type===1">
                        <p class="join-tips">{{item.msg}}</p>
                        </template>
                        <template v-else>
                        <div class="img">{{item.nickname}}</div>
                        <p class="message-box">{{item.msg}}{{item.date}}</p>
                        </template>
                    </div>
                </div>
                <div class="footer">
                    <input type="text" v-model="msg" placeholder="请输入内容">
                    <button @click="send">发送</button>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            isLoading: false,
            nickname: "",
            uid: '',
            msg:'',
            messageList: [],
            socket:''
        }
    },
    computed: {
        ...mapState({
            userinfolist: (state) => {
                return state.user.userinfo
            }
        })
    },
    methods: {
        onRefresh() {//下拉刷新
            setTimeout(() => {
                this.$router.go(0)//刷新页面
                this.isLoading = false;
            }, 1000);
        },
        login() {
            this.uid = this.userinfolist.id;
            this.nickname = this.userinfolist.username;
            console.log(this.uid,this.nickname)
            this.conWebSocket();
        },
        conWebSocket() {
            let vm = this;
            if (window.WebSocket) {
                vm.socket = new WebSocket('ws://localhost:8001');
                let socket = vm.socket;
                socket.onopen = function (e) {//连接建立时触发
                    console.log("连接服务器成功");
                    localStorage.setItem('WEB_IM_USER', JSON.stringify({
                    uid: vm.uid,//存储用户信息
                    nickname: vm.nickname
                    }))
                    vm.sendMessage(1)
                }
                socket.onclose = function (e) {//服务器关闭
                    console.log("服务器关闭");
                }
                socket.onerror = function (e) {
                    console.log("连接出错",e);
                },
                    socket.onmessage = function (e) {//接收服务器的数据
                    let message = JSON.parse(e.data);
                    vm.messageList.push(message);
                }    
            }
        },
        send() {
            if (!this.msg) {
                return 
            }
            this.sendMessage(2, this.msg);
            console.log(this.msg)
        },
        sendMessage(type, msg){
            this.socket.send(JSON.stringify({
                uid: this.uid,
                type: type,
                nickname: this.nickname,
                msg: msg
            }));
            this.msg = '';
        },
    },
    mounted() {
        let vm = this;
        let user = localStorage.getItem("WEB_IM_USER");
        user = user && JSON.parse(user) || {};
        vm.uid = user.uid;
        vm.nickname = user.nickname;
        if(!vm.uid){
            vm.$refs.loginDialog.show()
        } else {
            vm.conWebSocket();
        }
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                vm.send()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    .main{
        display: flex;
        .start{
            width:20vw;
            height: 20vw;
            flex:1;
        }
        .end{
            flex:4;
            li{
                list-style: none;
                padding:2vw 0 0 2vw;
                line-height: 26px;
            }
        }
    }
}

.control{
    overflow: auto;
    height: 140vw;
    margin-top:3vw;
    background-color: rgba(137, 252, 252, 0.11);
    .web-im{
        border-bottom: 1px solid rgba(153, 149, 149, 0.466);
        line-height: 30px;
        padding-left: 3vw;
        letter-spacing: 2px;
        font-weight: bold;
        background-color: rgb(233, 240, 238);
        button{
            border: none;
            font-size: 15;
            background-color: aquamarine;
            font-weight:500;
        }
    }
    .content{
        height: 85%;
        overflow:auto;
    }
    .footer{
        background-color:white;
        height: 8%;
        border-bottom: 1px solid rgb(180, 178, 178);
        input{
            width: 75%;
            border: none;
            height: 30px;
        }
        button{
            width: 20%;
            background-color: aquamarine;
            border: none;
            line-height: 26px;
            height: 31px;
        }
    }
}
</style>
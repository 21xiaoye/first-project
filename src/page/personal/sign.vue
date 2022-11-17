<template>
    <div>
        <div class="header">
            <div class="rn">
                <li>
                    <van-nav-bar
                        left-arrow
                        @click-left="onClickLeft"
                    />
                </li>
                <li><button @click="postsign">发布</button></li>
            </div>
            <div class="text">
                <van-field
                    v-model="sign"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="30"
                    placeholder="编辑个性签名"
                    show-word-limit
                />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Notify } from 'vant'
Vue.use(Notify)
import {
    updateUserInfo
} from '../../api/index'
export default {
    data() {
        return {
            sign:''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        postsign() {
            const { sign } = this
            updateUserInfo({ sign }).then((res) => {
                if (res.code == 200) {
                    Notify({ type: 'success', message: '发布成功', duration: 1000})
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    .rn{
        display:flex;
        li{
            flex:1;
            list-style: none;
        }
        li:last-child{
            button{
                border: none;
                height: 8vw;
                width: 15vw;
                background-color: rgba(68, 108, 240, 0.692);
                color: white;
                margin:2vw 0 0 30vw;
                letter-spacing: 2px;
            }
        }
    }

    .text{
        margin-top:5vw;
        width: 90%;
        border:1px solid rgb(248, 244, 244);
        padding: 5vw 0 5vw 0;
        margin-left:5%;
        background: linear-gradient(to left, transparent, mistyrose);
        .van-field{
            border:1px solid rgba(223, 220, 220, 0.384);
            width: 80%;
            margin:auto;
            display: block;
        }
    }
}
</style>
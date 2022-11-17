<template>
    <div>
        <div class="header">
            <div class="setup">
                <ul>
                    <li @click="$router.go(-1)"><van-icon name="arrow-left"/></li>
                    <li>精选照片</li>
                    <li @click="Ondelete">{{EC}}</li>
                </ul>
            </div>
        </div>
        <div class="main">
            <div class="image">
                <ul>
                    <li v-for="photos in userinfolist.featured"  @click="getid(photos.id)">
                        <input type="checkbox" v-show="ckb" :checked="hook" :key="code"/>
                            <van-image
                            class="img-icon"
                            width="100"
                            height="100"
                            :src="photos.content"
                        />
                    </li>
                </ul>
            </div>
            <van-uploader v-model="fileList" multiple :max-count="4" v-show="!ckb"/>
        </div>
        <div class="floor">
            <div class="bottom">
                <button>
                    <li v-show="!ckb" @click="setphotos">上传照片</li>
                    <li><van-icon name="delete-o" v-show="ckb" @click="deletephotos"/></li>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    userFeaturedphotos,userinfo,deletephotos
} from '../../api/index'
import {
    mapState
} from 'vuex'
import {
    nanoid
} from 'nanoid'
import Vue from 'vue';
import { Dialog,Toast} from 'vant';

// 全局注册
Vue.use(Dialog,Toast);
export default {
    data() {
        return {
            fileList: [],//待上传图片
            ckb: false,
            EC: '',
            deleteID: [], 
            hook: false,
            code:0,
        }
    },
    methods: {
        getuserinfo() {
            userinfo().then((res) => {
                if (res.code == 200) {
                    this.$store.commit("USERINFO", res.data)
                }
            })
        },
        Ondelete() {
            this.ckb = !this.ckb
        },
        async setphotos() {
            Toast.loading({
                message: '图片上传中...',
                forbidClick: true,
            });
            const { fileList } = this
            let photos=[]
            for (let item of fileList) {
                //生成唯一id
                let id = nanoid()
                let content = item.content;
                let name=item.file.name
                photos.push({id,content,name})
            }
            await userFeaturedphotos({ photos }).then((res) => {
                if (res.code == 200) {
                    Toast.clear()
                    this.getuserinfo();
                    this.fileList = []
                } else {
                    oast.fail("上传失败")
                }
            })
        },
        getid(id) {
            this.deleteID.push(id)
        },
        deletephotos() {
            Dialog.confirm({
            message: `确定要删除这${this.deleteID.length}张图片吗？`,
            })
            .then(() => {
                const { deleteID } = this
                deletephotos({ deleteID }).then((res) => {
                    if (res.code == 200) {
                        this.getuserinfo();
                        this.code += 1
                        this.deleteID=[]
                    }
                })
            })
            .catch(() => {
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
    watch: {
        ckb: {
            handler() {
                this.EC=this.ckb ? "取消" : "编辑"
            },
            immediate: true
        },
    },
}
</script>

<style lang="less" scoped>
.header{ 
    .setup{
        height: 12vw;
        background-color: rgba(12, 139, 243, 0.651);
        ul{
            display: flex;
            li{
                flex: 1;
                font-size: 16px;
                color: white;
                margin-top: 3vw;
                letter-spacing: 2px;
            }
            li:first-child{
                color: black;
                font-size: 20px;
                margin-left: 2vw;
            }
            li:nth-child(2){
                text-align: center;
            }
            li:last-child{
                text-align: right;
                padding-right: 3vw;
            }
        }
    }
}
.main{
    overflow:auto;
    height: 145.9vw;
    .image{
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 24%;
                height: 100%;
            }
            li:last-child:nth-child(4n - 1) {
                margin-right: calc(24% + 4% / 3);
            }
            li:last-child:nth-child(4n - 2) {
                margin-right: calc(24% + 8% / 3);
            }
        }
    }
}
.floor{
    bottom: 0;
    position:fixed;
    height: 15vw;
    background-color: rgba(225, 228, 231, 0.63);
    margin-top: 5vw;
    position: relative;
    .bottom{
        button{
            border:none;
            background-color: rgba(12, 189, 243, 0.61);
            width: 90%;
            height: 11vw;
            margin: 2vw 0 0 5%;
            border-radius: 5px;
            color: white;
            letter-spacing: 2px;
            position:relative;
            li{
                list-style: none;
            }
        }
    }
}
</style>
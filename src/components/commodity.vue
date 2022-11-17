<!--商品列表展示-->
<template>
<div class="header">
        <!-- <van-loading size="50px" vertical v-if="show">加载中...</van-loading> -->
        <div class="main">
            <ul>
                <li @click="$router.go(-1)"><van-icon name="arrow-left"/></li>
                <li><van-search v-model="value" placeholder="请输入搜索关键词"  background="rgba(12, 139, 243, 0.651)"/></li>
                <li><van-icon name="ellipsis" /></li>
            </ul>
        </div>
        <div class="item">
            <ul>
                <li>综合</li>
                <li>销量</li>
                <li>价格</li>
                <li>店铺</li>
            </ul>
            <div class="item-m" v-for="pcf of list" @click=" getrn(pcf.id,pcf.pname)">
                <div class="item-im">
                    <img :src="pcf.pphotos"/>
                </div>
                <div class="item-tx">
                    <li>{{pcf.pname}}</li>
                    <li>
                        <i>{{pcf.parameter.xinhao}}</i>
                        <i>{{pcf.parameter.caizhi}}</i>
                        <i>{{pcf.parameter.qita}}</i>
                    </li>
                    <li>
                    </li>
                    <li>
                        ￥<span>{{pcf.pirce}}</span>
                        <i>月销量:{{pcf.count}}</i>
                        <!-- <span><van-icon name="cart-o"  color="#1989fa"/></span> -->
                    </li>
                    <li>{{pcf.pshop}}<span><van-icon name="arrow" /></span></li>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { async } from 'q';

export default {
    data() {
        return {
            
        }
    },
    props: ['list'],
    methods: {
        getrn(id, name) {
            name = name.replace(/\s*/g, "");
            this.$router.push({ name: 'commodity', params: { id: id || undefined, keyword: name } })
            this.$store.commit("COMMODITY",undefined)
        },
        // shoppingCart(pcf) {
        //     console.log(pcf)
        // }
    }
}
</script>

<style lang="less" scoped>
.header{
    background-color: rgba(231, 238, 238, 0.596);
    .main{
        height: 14vw;
        ul{
            list-style: none;
            display: flex;
            background-color: rgba(12, 139, 243, 0.966);
            li{
                flex: 1;
                text-align: center;
            }
            li:not(:nth-child(2)){
                padding-top: 5vw;
                font-size: 18px;
                color: white;
            }
            li:nth-child(2){
                flex: 5;
            }
        }
    }
    .item{
        overflow: auto;
        background-color: white;
        width: 100%;
        margin-top: 5vw;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        ul{
            display: flex;
            li{
                flex:1;
                text-align: center;
                padding: 2vw 0 2vw 0;
                line-height: 25px;
                letter-spacing: 1px;
                border-bottom: 1px solid rgba(218, 213, 213, 0.548);
            }
            li:not(:first-child){
                border-left: 1px solid rgba(236, 231, 231, 0.438);
            }
        }
        .item-m{
            display: flex;
            height: 33vw;
            display: flex;
            margin-top: 3vw;
            .item-im{
                flex: 1;
                border: 1px solid rgba(211, 209, 209, 0.452);
                img{
                    width: 100%;
                    height: 33vw;
                }
            }
            .item-tx{
                flex:2;
                li{
                    list-style: none;
                    padding-left: 2vw;
                    font-size: 15px;
                }
                li:nth-child(4){
                    color:red;
                    font-size: 13px;
                    display: flex;
                    span{
                        font-weight: bold;
                        font-size: 18px;
                        flex: 1;
                    }
                    span:last-child{
                        text-align: center;
                        .van-icon{
                            border: 1px solid rgb(212, 206, 206);
                            margin: auto;
                            line-height: 20px;
                            padding: 1vw;
                            border-radius: 20px;
                            font-size: 20px;
                        }
                    }
                    i{
                        color: black;
                        font-size: 10px;
                        padding-left: 2vw;
                        flex:1;
                    }
                }
                li:nth-child(2){
                    display: flex;
                    i{
                        font-size: 10px;
                        text-align: center;
                        flex:1;
                        color: rgb(129, 131, 133);
                    }
                    i:not(:last-child){
                        border-right: 1px solid rgba(185, 181, 181, 0.808);
                    }
                }
                li:last-child{
                    font-size: 10px;
                    color: rgb(192, 188, 188);
                    span{
                        padding-left: 10vw;
                    }
                }
            }
        }
    }
}
</style>
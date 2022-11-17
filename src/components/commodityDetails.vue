<!--商品详情-->
<template>
<div style="background-color: rgba(120, 120, 110, 0.06);">
    <div class="navigation">
        <div class="icon">
            <li>
                <van-icon name="arrow-left" @click="$router.go(-1)"/>
            </li>
            <li>
                <van-icon name="share-o" />
            </li>
        </div>
    </div>
    <div class="control">
        <!--轮播图-->
        <div class="header">
            <div class="main">
                <carousel :list="list[0].banner"></carousel>
            </div>
        </div>
        <!--商品信息展示-->
        <div class="item" v-for="pcf of list">
            <!--价格-->
            <div class="item-h">
                <li>
                    预估到手￥<span>{{pcf.pirce}}</span>
                </li>
                <p>也许需要你的点缀,才会精彩</p>
            </div>
            <!--名称-->
            <div class="item-m">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item name="1">
                        <template #title>
                            <div class="title">{{pcf.pname}}</div>
                            <li>
                                <span>{{pcf.parameter.xinhao}}</span>
                                <span>{{pcf.parameter.caizhi}}</span>
                                <span>{{pcf.parameter.qita}}</span>
                            </li>
                        </template>
                        <p>{{pcf.pinfo}}</p>
                    </van-collapse-item>
                </van-collapse>
                <ul>
                    <li><span>分享<i class="iconfont icon-fenxiang"></i></span></li>
                    <li><span>收藏<i class="iconfont icon-shoucang"></i></span></li>
                    <li><span>降价通知</span><i class="iconfont icon-zhifushezhi"></i></li>
                </ul>
            </div>
        </div>

        <div class="location">
            <ul>
                
            </ul>
        </div>
        <div class="evaluation">
            <span>
                <li>评价</li>
                <li>好评度<van-icon name="arrow" /></li>
            </span>
        </div>
    </div>
    <div class="add">
        <div class="add-s">
            <ul>
                <span>
                    <li class="iconfont icon-dianpu"></li>
                    <li>店铺</li>
                </span>
                <span>
                    <li class="iconfont icon-kefu"></li>
                    <li>客服</li>
                </span>
                <span>
                    <li class="iconfont icon-gouwuche"></li>
                    <li>购物车</li>
                </span>
            </ul>
        </div>
        <div class="add-e">
            <span>
                <button @click='shoppingCart(list,"chart")'>加入购物车</button>
            </span>
            <span>
                <button style="background-color: rgba(247, 203, 9, 0.719);">立即购买</button>
            </span>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
            <div style="height:55vw">
                <img :src="list[0].pphotos" style="height:200px;margin: auto;display: block;"/>
            </div>
            <div class="van-m">
                <p><span><i>￥</i>{{list[0].pirce}}<i>起</i></span>
                    <span ><van-icon name="cross"  @click="getout()"/></span>
                </p>
                <ul>
                    <li v-for="cls of list[0].have">
                        {{cls.class}}
                        <br/>
                        <span v-for="centent of  cls.leix">
                            <button :class="{ cur: isActive }" @click="choose(centent)">{{centent}}</button>
                        </span>
                    </li>
                </ul>
            </div>
        </van-popup>
    </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            activeName: '1',
            show: false,
            isActive:false
        }
    },
    props: ['list'],
    methods: {
        shoppingCart(pcf) {
            this.show=true
            console.log(pcf[0].parameter)
        },
        getout() {
            this.show=false
        },
        choose(value) {
            this.isActive = true;
            console.log(value)
        }
    }
}
</script>

<style lang="less" scoped>
.navigation{ 
    background-color: rgba(128, 126, 126, 0.274);
    .icon{
        display: flex;
        color: white;
        li{
            flex: 1;
            list-style: none;
            padding: 3vw;
            .van-icon{
                font-size: 18px;
                padding: 1vw;
                border-radius: 20px;
                background-color: rgba(210, 241, 250, 0.26);
            }
        }
        li:last-child{
            text-align: right;
            padding-right: 3vw;
        }
    }
}
.control{
    overflow:scroll;
    height: 149.5vw;
    .header{
        .main{
            height: 40vw;
        }
    }
    .item{
        height: auto;
        width: 98%;
        margin: 15vw 0 0 1%;
        background-color: white;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        .item-h{
            height: 20vw;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            background-color: rgba(42, 42, 43, 0.671);
            display: flex;
            li{
                color: white;
                list-style: none;
                padding: 3vw;
                font-size: 10px;
                font-weight: bold;
                line-height: 30px;
                flex: 1;
                span{
                    font-size: 25px;
                }
            }
            p{
                flex:1;
                padding-right: 5vw;
                font-size: 14px;
            }
        }

        .item-m{
            background-color: white;
            .van-collapse{
                .van-collapse-item{
                    .title{
                        font-size:18px;
                        font-weight: bold;
                        line-height: 26px;
                        letter-spacing: 1px;
                    }
                    li{
                        list-style: none;
                        display: flex;
                        span{
                            flex: 1;
                            color: rgba(155, 157, 158, 0.993);
                        }
                    }
                    p{
                        text-indent: 2em;
                    }
                }
            }
            ul{
                display: flex;
                margin-top: 3vw;
                li{
                    flex: 1;
                    text-align: center;
                    letter-spacing: 1px;
                    font-size: 12px;
                    padding-bottom: 2vw;
                }
            }
        }
    }
    .location{
        height: 30vw;
        margin: 3vw 0 0 1%;
        width: 98%;
        background-color: white;
    }
    .evaluation{
        margin: 3vw 0 0 1%;
        width: 98%;
        background-color: white;
        height: 50vw;
        span{
            display: flex;
            list-style: none;
            li{
                flex: 1;
                padding-left: 5vw;
                margin-top: 3vw;
                letter-spacing: 2px;
                font-weight: bold;
                font-size: 15px;
            }
            li:last-child{
                text-align: right;
                padding-right: 5vw;
            }
        }
    }
}
.add{
    height: 15vw;
    display: flex;
    width: 98%;
    margin-left: 1%;
    background-color: rgba(250, 247, 247, 0.137);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 1px solid rgba(201, 195, 195, 0.685);
    border-bottom: none;
    .add-s{
        flex: 45%;
        ul{
            display: flex;
            span{
                flex: 1;
                text-align: center;
                margin-top: 3vw;
                li:first-child{
                    font-size: 18px;
                }
                li{
                    font-size: 15px;
                }
            }
        }
    }
    .add-e{
        flex: 55%;
        height: 15vw;
        display: flex;
        span{
            flex: 50%;
            button{
                width: 95%;
                font-size: 15px;
                display: block;
                border: none;
                margin: 3vw 0 0 2.5%;
                height: 8.5vw;
                border-radius: 20px;
                color: white;
                letter-spacing: 1px;
            }
            button:first-child{
                background-color: rgba(248, 9, 9, 0.781);
            }
        }
    }
    .van-popup{
        .van-m{
            height: 60%;
            overflow: auto;
            background-color: rgba(240, 243, 243, 0.685);
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            p{
                width: 100%;
                display: flex;
                span{
                    line-height: 26px;
                    font-size: 25px;
                    padding-left: 5vw;
                }
                span:first-child{
                    flex:2;
                    color:red;
                    text-align: right;
                    i{
                        font-size: 15px;
                    }
                }
                span:last-child{
                    text-align: right;
                    flex:1;
                    .van-icon{
                        border-radius: 20px;
                        margin-right: 5vw;
                        background-color: rgb(212, 211, 211);
                    }
                }
            }
            ul{
                width: 96%;
                margin-left: 2%;
                background-color: white;
                height: auto;
                li{
                    width:100%;
                    margin-top: 5vw;
                    line-height: 26px;
                    color: rgb(121, 117, 117);
                    span{
                        padding-left: 5vw;
                        button{
                            border: none;
                            margin-top: 4vw;
                            font-size: 15px;
                            line-height: 25px;
                            color: black;
                        }
                        .cur{
                            color: red;
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div>
        <div class="header">
            <ul @click="$router.push({name:'exhibit'})">
                <li><van-icon name="cart-o" color="#ee0a24"/></li>
                <li>购物</li>
                <li><van-icon name="arrow" /></li>
            </ul>
        </div>
        <div class="main">

        </div>
        <div class="floor">
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.header{
    ul:first-child{
            display: flex;
            li{
                margin: auto;
            }
            li:first-child{
                flex:1;
                font-size: 30px;
                padding-left: 2vw;
            }
            li:nth-child(2){
                flex:3;
                letter-spacing: 2px;
            }
            li:last-child{
                flex:3;
                text-align: right;
                padding-right: 5vw;
            }
        }
}
</style>
<template>
    <div>
        <div class="classFItem">
            <p>{{ recommend.class }}</p>
            <ul>
                <span  v-for="recommendList of recommend.recommend" @click="getClassFId(recommendList.id)">
                    <li>
                        <img :src="recommendList.url" style="width: 80px;height: 100px;"/>
                    </li>
                    <li>{{recommendList.phonename}}</li>
                </span>
            </ul>
            <p>{{brand.class}}</p>
            <ul>
                <span  v-for="barndList of brand.brand" @click="getClassFId(barndList.id)">
                    <li>
                        <img :src="barndList.url" style="width: 100%;height: 100%;"/>
                    </li>
                    <li>{{barndList.name}}</li>
                </span>
            </ul>
            <p>{{other.class}}</p>
            <ul>
                <span  v-for="otherList of other.other" @click="getClassFId(otherList.id)">
                    <li>
                        <img :src="otherList.url" style="width: 80px;height: 100px;"/>
                    </li>
                    <li>{{otherList.content}}</li>
                </span>
            </ul>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['brand', 'other', 'recommend'],
    methods: {
        getClassFId(id) {
            this.$router.push({ name: 'productinfo', params: { id: id || undefined } });
            this.$store.commit("PRODUCTIONFO",undefined)
        }
    }
}

</script>


<style lang="less" scoped>
    .classFItem{
        height: 300vw;
        ul{
            display: flex;
            flex-wrap: wrap;
            span{
                width: 30%;
                height: 130px;
                margin:1vw 0 0 2%;
                li:last-child{
                    text-align: center;
                    font-size: 12px;
                }
                li{
                    text-align: center;
                }
            }
        }
        p{
            padding-left: 5vw;
            font-weight: bolder;
        }
    }
</style>
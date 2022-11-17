<!--分类-->
<template>
    <div class="classFheader"> 
        <div class="classFList">
            <van-sidebar v-model="activeKey" >
                <van-sidebar-item :title="classFlist.classification" 
                    @click="getcurr(classFlist.id,index)"
                    v-for="(classFlist,index) of classf"
                    :key="classFlist.id"/>
            </van-sidebar>
        </div>
        <div class="end">
            <classFItem :brand="brand" :other="other" :recommend="recommend"></classFItem>
        </div>
        
    </div>
</template>

<script>
import {
    Classification,classFList
} from '../../api/index'
import {
    mapState,
    mapGetters
} from 'vuex'
import classFItem from '../../components/classFItem.vue'
export default{
    data(){
        return {
            currenIndex: -1,
            activeKey:0
        }
    },
    methods: {
        getcurr(id,index) {
            this.currenIndex = id;
            this.activeKey=index
            classFList(id).then((res) => {
                if (res.code == 200) {
                    this.$store.commit("CLASSFLIST",res.data)
                }
            })
        }
    },
    mounted() {
        Classification().then((res) => {
            if (res.code == 200) {
                this.$store.commit("CLASSF", res.data)
            }
        })
    },
    computed: {
        ...mapState({
            classf: (state) => {
                return state.shoppings.classF
            }
        }),
        ...mapGetters(['brand','other','recommend'])
    },
    components: {
        classFItem
    }
}
</script>

<style lang="less" scoped>
.classFheader{
    display: flex;
    .classFList{
        overflow: scroll;
        position:fixed;
        
        .van-sidebar{
        }
    }
    .end{
        height: auto;
        margin-left: 20vw;
    }
}
</style>
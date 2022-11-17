<!--商品列表展示-->
<template>
    <div>
        <commodity  :list="productinfo"></commodity>
    </div>
</template>

<script>
import {
    productinfoList
} from '../../api/index'
import {
    mapState
} from 'vuex'
import CommodityDetails from '../../components/commodityDetails.vue'
export default {
    data() {
        return {
            show: true
        };
    },
    mounted() {
        productinfoList(this.$route.params.id).then((res) => {
            if (res.code == 200) {
                this.$store.commit("PRODUCTIONFO", res.data);
            }
        });
    },
    computed: {
        ...mapState({
            productinfo: (state) => {
                return state.shoppings.productinfoList;
            }
        })
    },
    watch: {
        // productinfo: {
        //     handler(oldvalue, newvalue) {
        //         if (newvalue != null || oldvalue != null) {
        //             this.show = false;
        //         }
        //         else {
        //             this.show = true;
        //         }
        //     },
        //     immediate: true
        // }
    },
    components: { CommodityDetails }
}
</script>
<style lang="less" scoped>
</style>
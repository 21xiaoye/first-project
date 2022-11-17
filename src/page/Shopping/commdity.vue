<template>
    <div>
        <commodityDetails :list="commodityList"></commodityDetails>
    </div>
</template>
<script>
import {
    commodityDetails
} from '../../api/index'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        commodityDetails(this.$route.params.id).then((res) => {
            if (res.code == 200) {
                this.$store.commit("COMMODITY",res.data)
            }
        })
    },
    computed: {
        ...mapState({
            commodityList: (state) => {
                return state.shoppings.commodity
            }
        })
    }
}
</script>

<style lang="less" scoped>

</style>
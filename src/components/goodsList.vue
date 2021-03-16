<template>
  <div class="goodsWrapper">
    <div class="nav">
      <div :class="{active: type === 'all'}" @touchend='navEvent("all")'>综合</div>
      <div :class="{active: type === 'sale'}" @touchend='navEvent("sale")'>销量</div>
      <div :class="{active: type === 'price', priceTop: priceType === 'priceTop', priceDown: priceType === 'priceDown'}" class="price" @touchend='navEvent("price")'>价格</div>
    </div>
    <van-pull-refresh v-model="isLoading"  @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='isLoading'
      >
        <goodsCard 
        v-for="item in goodsList"
        :key="item.id"
        v-bind='item'
        :thumb="item.images[0]"
        :num='counterMap[item.id]'/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions} from 'vuex';
import GoodsCard from './goodsCard.vue';

export default {
    data() {
      return {
        loading: false,
        isLoading: false,
        finished: false,
        page: 1,
        type: 'all',
        priceType: 'priceDown',
      }
    },
    computed: {
      ...mapState({
        goodsList: state => state.goodsList,
        counterMap: state => state.counterMap,
        }),
    },
    components: {
      GoodsCard,
    },
    methods: {
      ...mapActions(['getGoodsList']),
      ...mapMutations(['resetGoodsList']),
      async onLoad() {
        // this.page += 1;
        this.loading = true;
        // const result = await this.getGoodsList({page: this.page, sortType: this.type})
        // if(result){
          // this.loading = false;
        // }else{
          // this.finished = true;
        // }
      },
      onRefresh() {
        this.isLoading = true;
        this.finished = false;
        this.loading = false;
        this.page = 1;
        // this.resetGoodsList([]);
        // this.getGoodsList({page: 1, sortType: this.type});
        this.isLoading = false;
      },
      navEvent(type) {
        if(type === 'all'){
          this.type = 'all'
        }else if(type === 'sale'){
          this.type = 'sale'
        }else{
          this.type = 'price';
          if(this.priceType === 'priceDown'){
            this.priceType = 'priceTop';
          }else{
            this.priceType = 'priceDown';
          }
        }
        // this.onRefresh();
      }
    },
}
</script>

<style  lang='less' scoped>
.goodsWrapper{
  background-color: #eee;
  // position: relative;
  margin: 72px 0 0 80px;
  top: 72px;
  left: 80px;
  right: 0;
  height: 458px;
  overflow: auto;
}
.nav{
  position: fixed;
  display: flex;
  right: 0;
  top: 136px;
  width: 295px;
  height: 25px;
  background-color: rgb(223, 219, 219);
  justify-content: flex-end;
  >div{
    margin-right: 20px;
    height: 25px;
    line-height: 25px;
  }
  .active{
    color: rgb(230, 39, 39);
  }
  .price::before{
    position: relative;
    left: 38px;
    bottom: 12px;
    content: '';
    border: 4px solid transparent;
    border-bottom-color: white
  }
  .price::after{
    position: relative;
    left: 6px;
    top: 12px;
    content: '';
    border: 4px solid transparent;
    border-top-color: white;
  }
  .active.priceDown::after{
    border-top-color: tomato;
  }
  .active.priceTop::before{
    border-bottom-color: tomato;
  }
}
</style>
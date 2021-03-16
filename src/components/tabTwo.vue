<template>
  <div class="slideBar-wrapper">
      <div
        v-for="(data, i) in list"
        :key="data.id"
        class="item"
        :class="{active: i === index}"
        @touchend='getGoods(data.type, i)'
        @touchmove = "move = true"
        @touchstart = "move = false"
      > {{ data.type }} </div>
  </div>
</template>

<script>
import { mapState ,mapActions } from 'vuex'
export default {
    data() {
      return {
        move: false,
        index: 0,
        list: [{type:'全部',id: 0}, {type:'苹果',id: 1}, {type:'香梨',id: 2}, {type:'榴莲',id: 3}, {type:'柚子',id: 4}, {type:'西瓜',id: 5}, {type:'车厘子',id: 6}, {type:'百香果',id: 7}, {type:'牛油果',id: 8}, {type:'奇异果',id: 9}, {type:'甜瓜蜜瓜',id: 10}, {type:'草莓蓝莓',id: 11}, {type:'香蕉葡萄',id: 12}, {type:'饮用水',id: 13}, {type:'碳酸饮料',id: 14}, {type:'咖啡',id: 15}, {type:'茶饮料',id: 16}, {type:'果汁',id: 17}, {type:'功能饮料',id: 18}, {type:'啤酒',id: 19}, {type:'白酒',id: 20}, {type:'洋酒',id: 21}, {type:'葡萄酒',id: 22}, {type:'谷物冲调',id: 23},],
      }
    },
    computed: {
        ...mapState({
          slideList: state => {
            return state.sideList;
          },
        }),
    },
    created() {
      this.getGoodsList({type: '碳酸饮料', page: 1, sortType: 'all'});
    },
    methods: {
      ...mapActions(['getGoodsList']),
      getGoods(data, i){
        if(this.move){
          return
        }
        this.index = i;
        if(i === 0){
          this.getGoodsList({type: '碳酸饮料', page: 1});
        }else{
          this.getGoodsList({type: data, page: 1});
        }
      }
    }
}
</script>

<style lang='less' scoped>
.slideBar-wrapper{
    padding-top: 10px;
    width: 79px;
    position: fixed;
    left: 0;
    top: 135px;
    bottom: 50px;
    overflow: auto;
    background: #f8f8f8;
    .item{
        width: 79px;
        height: 40px;
        text-align: center;
        font-weight: bold;
    }
    .active{
      color: rgb(148, 11, 211);
    }
}
.slideBar-wrapper::-webkit-scrollbar{
  width: 0;
  background: none;
}
</style>
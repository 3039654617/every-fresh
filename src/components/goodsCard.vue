<template>
  <div class="goods-wrapper">
      <div class="img">
          <img :src="thumb" alt="" ref="img">
      </div>
      <div class="content">
          <div class="title"> {{title}} </div>
          <div class="desc"> {{desc}} </div>
          <div class="tags"> 
              <div 
              v-for="i in tags"
              :key="i"
              >{{i}}</div>
          </div>
          <div class="price"> ￥{{price}}</div>
          <div class="counter">
             <div class="reduce" @touchend = 'numEvent(id, -1)' v-if="num">-</div>
             <div v-if="num">{{ num }}</div>
             <div class="increase" @touchend = 'numEvent(id, +1)'>+</div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools/animate';
export default {
    props: ['thumb', 'tags', 'title', 'price', 'desc', 'id', 'num'],
    data() {
        return {
            goodsNum: 1,
        }
    },
    methods: {
        ...mapMutations(['storageChange']),
        numEvent(id, num) {
            this.storageChange({id, value: num});
            const {top, left} = this.$refs.img.getBoundingClientRect();
            const {offsetWidth: imgWidth, offsetHeight: imgHeight} = this.$refs.img;
            const shopCar = document.getElementById('shopCar');
            //购物的位置
            const {left: carX, top: carY} = shopCar.getBoundingClientRect();
            //购物车的大小
            const {offsetWidth: carWidth, offsetHeight: carHeight} = shopCar;
            const endX = carX + carWidth/2;
            const endY = carY + carHeight/2;
            Animate({
              startX: left,
              startY: top,
              endX,
              endY,
              src: this.$refs.img.src,
              width: '190px',
              height: '190px',
            });
        }
    }
}
</script>

<style lang='less' scoped>
.goods-wrapper{
    display: flex;
    background-color: #dee;
    margin-bottom: 5px;
    height: 100px;
    .img{
        width: 100px;
        height: 90px;
        img{
            height: 100%;
        }
    }
    .content{
        flex: 1;
        position: relative;
        >div{
            width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .title{
            font-size: 13px;
            color: #1a1a1a;
            margin-top: 5px;
        }
        .desc{
            color: #aaa;
            font-size: 11px;
            margin-top: 5px;
        }
        .tags{
            display: flex;
            margin-top: 4px;
            >div{
                font-size: 10px;
                padding: 2px;
                color: #aaa;
                border-radius: 3px;
                margin-right: 5px;
                border: 2px solid;
            }
        }
        .price{
            margin-top: 5px;
            color: rgb(22, 212, 124);
            font-size: 14px;
        }
        .counter{
            position: relative;
            left: 110px;
            bottom: 20px;
            display: flex;
            width: 75px;
            justify-content: flex-end;
            >div{
                margin-right: 10px;
            }
            .reduce, .increase{
                width: 8px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                font-size: 16px;
                font-weight: bolder;
                background-color: #999;
                color: rgb(70, 152, 167);
                padding: 0 5px;
                border-radius: 9px;
            }
            .increase{
                right: 0;
            }

        }
    }
}
</style>
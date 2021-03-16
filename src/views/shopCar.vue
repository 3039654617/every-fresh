<template>
  <div class="shop-car">
      <div class="top-nav">
        <van-nav-bar
          title="购物车"
          right-text="删除"
          @click-right="del"
        />
      </div>
      <div class="card-list">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div 
            class="card-item"
            v-for="item in list"
            :key="item.id"
          >
            <van-checkbox :name="item.id" class="check"></van-checkbox>
            <div class="card-content">
              <div class="img">
                 <img :src="item.images[0]" alt="" ref="img">
              </div>
              <div class="content">
                  <div class="title"> {{item.title}} </div>
                  <div class="desc"> {{item.desc}} </div>
                  <div class="tags"> 
                      <div 
                      v-for="i in item.tags"
                      :key="i"
                      >{{i}}</div>
                  </div>
                  <div class="price"> ￥{{item.price}}</div>
                  <div class="counter">
                     <div class="reduce" @click = 'numEvent(item.id, -1)' v-if="counterMap[item.id]">-</div>
                     <div v-if="counterMap[item.id]">{{ counterMap[item.id] }}</div>
                     <div class="increase" @click = 'numEvent(item.id, +1)'>+</div>
                  </div>
              </div>
            </div>
          </div>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="choose" :price="allPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
  
          <!-- <van-checkbox-group v-model="result"> -->
            <!-- <van-checkbox name="a">复选框 a</van-checkbox> -->
            <!-- <van-checkbox name="b">复选框 b</van-checkbox> -->
          <!-- </van-checkbox-group> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Toast } from 'vant';
import { Dialog } from 'vant';

export default {
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    }
  },
  computed: {
    ...mapState(['counterMap']),
     allPrice(){
       const resArr = this.list.filter(item => this.result.includes(item.id));

       return resArr.reduce((prev, next) => {
         const num = this.counterMap[next.id] || 0;
         return Math.round(num * next.price * 100) + prev;
       }, 0)
     },
  },
  watch: {
    result() {
      if(this.result.length === this.list.length){
        this.checked = true;
      }else{
        this.checked = false;
      }
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    ...mapMutations(['storageChange']),
    onClickRight() {
      console.log('cacaca');
    },
    del() {
      if(this.result.length === 0){
        Toast('还没选择商品呢');
        return;
      }
      try {
        Dialog.confirm({message: '确认删除已选商品吗'}).then(() => {
          this.result.forEach( (id) => {
          this.storageChange({id, value: -Infinity});
          this.list = this.list.filter(item => !this.result.includes(item.id));
        });
        });
      } catch (error) {
        console.log(error)
        Toast('取消了');
      }
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    checkAll() {
      if(this.checked){
         this.$refs.checkboxGroup.toggleAll(true);
      }else{
         this.$refs.checkboxGroup.toggleAll();
      }
    },
    async getAllData() {
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
      console.log(this.list);
    },
    onSubmit() {

    },
    numEvent(id, num) {
      this.storageChange({id, value: num});
    }
  },
}
</script>

<style lang='less' scoped>
.top-nav{
  height: 45px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 2;
}
.card-list{
  z-index: 1;
  width: 100%;
  .card-item{
    width: 100%;
    display: flex;
    .check{
      margin: 0 10px;
    }
    .card-content{
      flex: 1;
      display: flex;
      background-color: #dee;
      margin-bottom: 5px;
      width: 100%;
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
              left: 150px;
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
  }
}
.choose{
  position: fixed;
  bottom:49px;
}
</style>
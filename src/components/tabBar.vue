<template>
    <van-tabbar router fixed v-model="active">
        <van-tabbar-item icon="home-o" to="/home/first">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
        <van-tabbar-item id='shopCar' icon="cart-o" to="/home/shopping" :badge='badge'>购物车</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to="/home/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
     data() {
        return {
          active: 0,
        };
      },
      computed: {
        ...mapState(['counterMap']),
        badge() {
          const value = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0)
          if(value === 0){
            return ''
          }
          return value
        }
      }

}
</script>

<style>

</style>
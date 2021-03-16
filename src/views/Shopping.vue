<template>
  <div class="shopping-wrapper">
      <ShopCar/>
  </div>
</template>

<script>
import ShopCar from './shopCar.vue';
export default {
  components: {
    ShopCar,
  }

}
</script>

<style lang='less' scoped>
.shopping-wrapper{
    margin-top: 50px;
    margin-bottom: 100px;
}
</style>
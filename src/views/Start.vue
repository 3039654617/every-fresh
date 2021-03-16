<template>
  <div class="start-wrapper">
      每日优鲜App<tabBar/>
  </div> 
</template>

<script>
import tabBar from '../components/tabBar.vue';
export default {
    components: {
        tabBar,
    }
}
</script>

<style scoped>
.start-wrapper{
    color: aquamarine;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
    margin-top: 250px;
}
</style>
<template>
    <div class="home-wrapper">
        <router-view></router-view>
        <tabBar/>
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
</style>
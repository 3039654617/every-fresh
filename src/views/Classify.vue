<template>
  <div class="classify-wrapper">
    <div class="search-wrapper">
      <router-link class="search-btn" tag="div" to="/search">
        <van-icon name="search" />
        <div>苹果西瓜草莓1元1斤</div>
      </router-link>
    </div>
    <tabOne/>
    <tabTwo/>
    <div class="loading" v-if="loading">
      <van-loading size='2rem' vertical color="pink" type='spinner'/>
    </div>
    <goodsList/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import tabOne from '../components/tabOne';
import tabTwo from '../components/tabTwo';
import goodsList from '../components/goodsList'
export default {
  computed: {
    ...mapState(['loading'])
  },
  methods: {
  },
  components: {
    tabOne,
    tabTwo,
    goodsList,
  }
}
</script>

<style lang='less' scoped>
.search-wrapper{
  width: 375px;
  height: 80px;
  .search-btn{
    height: 33px;
    line-height: 33px;
    font-size: 14px;
    color: rgb(158, 88, 88);
    text-align: center;
    vertical-align: middle;
    width: 355px;
    margin: 11px auto;
    background-color: #ccc;
    border-radius: 10px;
    >*{
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.loading{
  margin-top: 80px;
  margin-left: 35px;
}
</style>
<template>
  <div class="history-wrapper">
      <h3>历史记录</h3>
        <div class="item-list">
            <span 
                class="item"
                v-for="item in searchList"
                :key="item.time"
            > {{item.name}} </span>
        </div>
  </div>
</template>

<script>
export default {
   props: {
       searchList: {
           default: [],
       }
   }
}
</script>

<style lang='less' scoped>
h3{
    margin-left: 15px;
}
.item-list{
    width: 90%;
    margin: 0 auto;
    .item{
        margin-bottom: 10px;
        background-color: rgb(170, 138, 138);
        display: inline-block;
        height: 12px;
        padding: 10px;
        line-height: 12px;
        text-align: center;
        margin-left: 10px;
        border-radius: 14px;
    }
}
</style>
<template>
  <div class="search-wrapper">
        <div class="search-header"> 
            <van-icon name="arrow-left" class="arrow-left" @touchend="$router.goBack()"/>
            <van-search
              v-model="value"
              show-action
              placeholder="place"
              class="search"
              @search="onSearch"
              @input="input"
              @focus="focus"
            >
              <template #action >
                <div @click="onSearch(value)" v-if="!showCar">搜索</div>
                <van-icon name="cart-o" v-if="showCar" class="Car" id="Car" @touchend='$router.push("/home/shopping")'/>
              </template>
              <template>
                  <van-icon name="chat-o" color="#1989fa" v-if="showCar" ref="car"/>
              </template>
          </van-search>
        </div>
        <div class="like-search" v-if="likeList.length && show">
            <van-list>
                <van-cell
                 v-for="item in likeList"
                 :key="item"
                 @click='onSearch(value)'
                >
                  <template>
                      <span class="custom-title" v-html="forMatHTML(item)"></span>
                  </template>
                </van-cell>
            </van-list>
        </div>
        <div class="goods-list">
          <div class="item"
              v-for="item in goodsList"
              :key="item.id"
          >
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
        <div class="history" v-if="!likeList.length && show">
            <History :searchList = "searchList" @search="onSearch"/>
        </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import History from '../components/History';

export default {
    data() {
        return {
            place: '酒',
            value: this.place,
            likeList: [],
            timer: null,
            loading: false,
            finished: true,
            isLoading: true,
            goodsList: [],
            page: 1,
            size: 5,
            show: true,
            total: null,
            showCar: false,
            searchList: [],
        }
    },
    components: {
        History,
    },
    computed: {
        ...mapState({
          counterMap: state => state.counterMap,
          counterMap: state => state.counterMap,
        }),
    },
    created() {
        this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
    },
    methods: {
        ...mapMutations(['storageChange']),
        async onLoad() {
            this.show = false;
            const value = await this.$api.search(this.value, this.page, this.size);
            this.goodsList = value.list;
            console.log(this.goodsList);
            // this.total = value.total;
            // if(this.goodsList >= this.total){
                // this.finished = true;
            // }else{
                // this.page += 1;
            // }
            // this.length = data.data.total;
            // this.list = [...this.list, ...data.data.list];
            this.loading = false;
            // 数据全部加载完成
            // if (this.list.length >= this.length) {
            //   this.finished = true;
            // }
        },
        onSearch(value) {
            if(value === 'place'){
                return
            }
            if(value === ''){
                return
            }else{
                this.value = value;
            };
            this.likeList = [];
            this.page = 1;
            this.finished = false;
            this.showCar = true;
            //缓存历史搜索记录       
            
            const result = this.searchList.find( item => item.value === this.value);
            if(result){
                result.time = new Date().getTime();
                this.searchList.sort( (a, b) => {
                    b.time - a.time;
                })
            }else{
                if(this.searchList.length >= 8){
                    this.searchList.pop();
                }else{
                    this.searchList.unshift({name: this.value, time: new Date().getTime()});
                }
            }
            localStorage.setItem('searchList', JSON.stringify(this.searchList));  

            this.onLoad();
        },
        async input() {
            if(this.value === ''){
                this.likeList = [];
                return;
            }

            if(this.timer){
                 clearTimeout(this.timer);
                 this.timer = null;
            }else{
                this.timer = setTimeout( async () => {
                const value = await this.$api.likeSearch(this.value);
                console.log(value)
                this.likeList = value.result;
                clearTimeout(this.timer);
                this.timer = null;
            }, 300)
            }
        },
        forMatHTML(item){
            const reg = new RegExp(this.value, 'g');
            return item.replace(reg, this.value.fontcolor('red'))
        },
        focus() {

        },
        numEvent(id, num) {
            this.storageChange({id, value: num});
            // const {top, left} = this.$refs.car.getBoundingClientRect();
            // const {offsetWidth: imgWidth, offsetHeight: imgHeight} = this.$refs.car;
            // const shopCar = document.getElementById('Car');
            //购物的位置
            // const {left: carX, top: carY} = shopCar.getBoundingClientRect();
            //购物车的大小
            // const {offsetWidth: carWidth, offsetHeight: carHeight} = shopCar;
            // const endX = carX + carWidth/2;
            // const endY = carY + carHeight/2;
            // Animate({
            //   startX: left,
            //   startY: top,
            //   endX,
            //   endY,
            //   src: this.$refs.car.src,
            //   width: '190px',
            //   height: '190px',
            // });
        }
    }
}
</script>

<style lang='less' scoped>
.search-wrapper{
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: #fff;
    .search-header{
        display: flex;
        width: 345px;
        background-color: #fff;
        margin: 0 auto;
        align-items: center;
        position: fixed;
        top: 0;
        .arrow-left{
            font-size: 22px;
        }
        .search{
            flex: 1;
        }
        .Car{
            font-size: 24px;
            color: rgb(44, 173, 130);
            height: 20px;
            padding-top: 10px;
        }
    }
    .like-search {
      top: 50px;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding-left: 30px;
      background: #fff;
      z-index: 10;
    }
    .goods-list{
        margin-top: 66px;
        position: fixed;
        width: 100%;
        .item{
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
                    // background-color: #000;
                    left: 180px;
                    bottom: 20px;
                    display: flex;
                    width: 85px;
                    justify-content: flex-end;
                    >div{
                        margin-left: 10px;
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
    .history{
        width: 100%;
        margin-top: 60px;
    }
}
</style>
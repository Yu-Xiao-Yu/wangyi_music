<template>
  <div class="musicList">
    <div class="musicTop">
        <div class="title">发现好歌单</div>
        <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
        <van-swipe  :loop="false" :width="150" class="my-swpie" :show-indicators="false">

        <van-swipe-item class="a" v-for="item in state.musicList" :key="item">
            <router-link :to="{path:'/item_music', query:{id:item.id}}">
                <img :src="item.picUrl" alt="">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-play" />
                    </svg>
                    {{changeCount(item.playCount)}}
                </span>
                <span class="name">{{item.name}}</span>
            </router-link>
        </van-swipe-item>
</van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home'
import { reactive,onMounted } from 'vue'
export default {
    //vue2
    // data(){
    //     return{
    //         musicList:[]
    //     }
    // },
    // methods:{
    //     async getGedan(){
    //         let res = await getMusicList();
    //         console.log(res);
    //         this.musicList = res.data.result
    //     },
    //     changeCount:function(num){
    //         if(num >= 100000000 ){
    //             return(num/100000000).toFixed(1) + "亿"
    //         }else if(num >= 10000 ){
    //             return(num/10000).toFixed(1) + "万"
    //         }
    //     }
    // },
    // mounted(){
    //     this.getGedan() 
    // }

    //vue3
    setup(){
        const state = reactive({
            musicList:[],
        })

        function changeCount(num){
            if(num >= 100000000 ){
                return(num/100000000).toFixed(1) + "亿"
            }else if(num >= 10000 ){
                return(num/10000).toFixed(1) + "万"
            }
        }

        onMounted(async () => {
            let res = await getMusicList();
            console.log(res)
            state.musicList = res.data.result;
        })

        return {state, changeCount}
    }
}
</script>

<style lang="less" scoped>
.musicList{
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        .title{
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }
    .musicContent{
        width: 100%;
        height: 4rem;
        .my-swpie{
            height: 100%;
            // padding: 0 0 0 0.2rem;
            img{
                width: 100%;
                height: 3rem;
                border-radius: 0.4rem;
            }
        }
        .a{
            position: relative;
            padding: 0 0.2rem 0 0 ;
        }
        .playCount {
          position: absolute;
          top: 0.05rem;
          right: 0.2rem;
          font-size: 0.2rem;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 0.1rem 0 0.1rem;
          border-radius: 0.1rem;
        }
        .icon {
            color: rgba(227, 25, 25, 0.84);
            width: 0.3rem;
            height: 0.3rem;
        }
        .name {
          display: -webkit-box;
          font-size: 0.22rem;
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          //   text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          overflow: hidden;
        //   white-space: pre;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          color: #333;
        }
    }

}
</style>
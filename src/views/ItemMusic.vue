<template>
  <ItemMusicTop :playlist="state.playlist" />
  <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount" />
</template>

<script>
import { onMounted, reactive } from 'vue';
import {useRoute} from 'vue-router'
import {getItemList, getMusicItemList} from '@/request/api/item'
import ItemMusicTop from '@/components/item_music/ItemMusicTop.vue'
import ItemMusicList from '@/components/item_music/ItemMusicList.vue'

export default {
    setup(){
        const state = reactive({
            playlist:{},
            itemlist:[],     
        })

        onMounted(async () => {
            let id = useRoute().query.id
            // console.log(id)

            //获取歌单详情页
            let res = await getMusicItemList(id);
            console.log(res)
            state.playlist = res.data.playlist

            //获取歌单的歌曲
            let result = await getItemList(id)
            console.log(result);
            state.itemlist = result.data.songs

            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })

        return {state}
    },
     components:{
            ItemMusicTop,ItemMusicList
        }
};
</script>

<style>
</style>
<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg aria-hidden="true" class="icon" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg aria-hidden="true" class="icon" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
  <audio
    ref="audio"
    @timeupdate="updateTime"
    :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
  ></audio>
  <!-- @timeupdate="updateTime" //durationchange  //用ended事件监听-->
  <van-popup
    v-model:show="detailShow"
    position="bottom"
    :style="{ height: '100%', width: '100%' }"
  >
    <MusicDetail
      :musicList="playList[playListIndex]"
      :play="play"
      :isbtnShow="isbtnShow"
      :addDuration="addDuration"
    />
  </van-popup>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item_music/MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  components: {
    MusicDetail,
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    console.log("2", this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime() {
      this.updateCurrentTime(this.$refs.audio.currentTime);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
    //
    // const audio = ref(null)
    // return audio
  },
  watch: {
    playListIndex() {
      //监听如果下标发生改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果是暂停状态，改变图标
        this.updateIsbtnShow(false);
      }
    },
    playList() {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        //如果是暂停状态，改变图标
        this.updateIsbtnShow(false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: white;
  position: fixed; //固定定位
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
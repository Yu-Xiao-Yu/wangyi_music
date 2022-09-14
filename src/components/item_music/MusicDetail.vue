<template>
  <img :src="musicList.al.picUrl" class="bgimg" alt="" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg aria-hidden="true" class="icon" @click="updateDetailShow">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="leftMarquee">
      <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
      <span v-for="item in musicList.ar" :key="item">
        {{ item.name }}
      </span>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-youjiantou1"></use>
      </svg>
    </div>
    <div class="detailTopRight">
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow = true">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/disc-plus.png" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      :class="{
        img_ar_active: !isbtnShow, //可以省略
        img_ar_paused: isbtnShow,
      }"
    />
  </div>
  <div
    class="musicLyric"
    ref="musicLyric"
    v-show="isLyricShow"
    @click="isLyricShow = false"
  >
    <p
      v-for="lyr in lyric"
      :key="lyr"
      :class="{
        active: currentTime * 1000 >= lyr.time && currentTime * 1000 < lyr.pre,
      }"
    >
      {{ lyr.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <!-- <van-progress
        :percentage="currentTime"
        class="range"
        min="0"
        max="duration"
        v-model="currentTime"
        step="0.05"
      /> -->
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>
    <div class="footer">
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg aria-hidden="true" class="icon" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg aria-hidden="true" class="icon" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg aria-hidden="true" class="icon" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg aria-hidden="true" class="icon" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg aria-hidden="true" class="icon">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  props: ["musicList", "isbtnShow", "play", "addDuration"],
  components: {
    Vue3Marquee,
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          //let min = this.lyricList.lyric.match(/\d{2}(?=:)/gm)
          let sec = item.slice(4, 6);
          //let sec = this.lyricList.lyric.match(/\d{2}(?=\.)/gm)
          let mill = item.slice(7, 10);
          //只获取数字
          // let mill = parseInt(item.slice(7, 10));
          //let mill = item.indexOf(']')
          //let mill = this.lyricList.lyric.match(/\d{3}(?=\])/gm)
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          //优化后
          // let min = item.slice(item.indexOf("[") + 1,item.indexOf(':'))
          // let sec = item.slice(item.indexOf(':') + 1,item.indexOf('.'))
          // let mill = item.slice(item.indexOf('.') + 1,item.indexOf(']'))
          // console.log("ge", min, sec, Number(mill), lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 11111110;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
  methods: {
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.active");
      //console.log(p.offsetTop);
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 200;
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
      // console.log([this.$refs.musicLyric]);
    },
  },
  mounted() {
    // console.log("list", this.musicList);
    // console.log("geci", this.lyricList.lyric);
    this.addDuration();
  },
};
</script>

<style lang="less" scoped >
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(100px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
  }
  .leftMarquee {
    width: 50%;
    height: 100%;
    span {
      color: #999;
    }
    .icon {
      width: 0.3rem;
      height: 0.2rem;
      fill: #999;
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column; //居中
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  //过度动画
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 0.3rem;
  overflow: scroll;
  p {
    color: rgb(193, 164, 164);
    margin-bottom: 0.3rem;
    text-align: center;
  }
  .active {
    color: #fff;
    font-size: 0.4rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      //   width: 0.36rem;
      //   height: 0.36rem;
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(245, 234, 234);
    }
  }
}
</style>
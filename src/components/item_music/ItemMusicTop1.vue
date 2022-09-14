<!-- 练习换个排版方式 -->
<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou" />
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo" />
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao" />
      </svg>
    </div>
  </div>

  <div class="detailTop" v-if="playlist.creator != null">
    <div class="itemTopContent">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" class="a" alt="" />
        <div class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gl-play-copy" />
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <p>{{ playlist.name }}</p>
        <div class="right_img">
          <img :src="playlist.creator.avatarUrl" class="b" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou" />
          </svg>
        </div>
        <p class="right_two">
          <span>{{ playlist.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou" />
          </svg>
        </p>
      </div>
    </div>

    <div class="itmeTopFooter">
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110" />
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang" />
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146" />
        </svg>
        <span>下载</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan" />
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    let pic = "";
    // 通过props进行传值，如果数据拿不到就去获取sessiostorage里面的数据
    if ((props.playlist.creator = "")) {
      props.playlist = sessionStorage.getItem("itemDetail").playlist;
    }

    function changeCount(count) {
      if (count >= 100000000) {
        return (count / 100000000).toFixed(1) + "亿";
      } else if (count >= 10000) {
        return (count / 10000).toFixed(0) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: .2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between; //两端对齐
    align-items: center; //垂直居中
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px); //虚化
  }
}

.detailTop {
  .itemTopContent {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    .contentLeft {
      position: relative;
      width: 30%;
      margin: 0 0.4rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
      .playCountent {
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
    }
  }
}

.b {
  width: 130px;
  height: 130px;
}
</style>
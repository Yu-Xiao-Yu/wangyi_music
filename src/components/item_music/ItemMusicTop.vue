<template>
  <div class="tou">
    <div class="back_img">
      <img :src="playlist.coverImgUrl" alt="" />
    </div>
    <div class="musicitemtop">
      <div class="bg">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="buttons">
        <div class="left">
          <div class="back_btn" @click="$router.go(-1)">
            <svg aria-hidden="true" class="icon_back">
              <use xlink:href="#icon-zuojiantou"></use>
            </svg>
          </div>
          <span>歌单</span>
        </div>
        <div class="right">
          <div class="search_btn">
            <svg aria-hidden="true" class="icon">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </div>
          <div class="MusicListbtn">
            <svg aria-hidden="true" class="icon">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="musicItemContent">
      <div class="cover">
        <img :src="playlist.coverImgUrl" alt="" />
        <span class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          {{ changeCount(playlist.playCount) }}
        </span>
      </div>
      <div class="info">
        <h3>{{ playlist.name }}</h3>
        <div class="auth">
          <img :src="playlist.creator.avatarUrl" alt="" />
          <span class="autu_name">{{ playlist.creator.nickname }}</span>
          <svg aria-hidden="true" class="right_arr">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="desc">
          <p>{{ playlist.description }}</p>
          <svg aria-hidden="true" class="right_arr">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
    </div>

    <div class="musicItemBottom">
      <a class="op_item" href="">
        <div class="icon">
          <svg aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
          </svg>
        </div>
        <span>{{ playlist.commentCount }}</span></a
      >
      <a class="op_item" href="">
        <div class="icon">
          <svg aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </div>
        <span>{{ playlist.shareCount }}</span></a
      >
      <a class="op_item" href="">
        <div class="icon">
          <svg aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
        </div>
        <span>下载</span></a
      >
      <a class="op_item" href="">
        <div class="icon">
          <svg aria-hidden="true">
            <use xlink:href="#icon-show_duoxuan"></use>
          </svg>
        </div>
        <span>多选</span></a
      >
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: ["playlist"],
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

    onMounted(() => {
      //   console.log(props.playlist);
    });

    return {
      changeCount,
    };
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.musicitemtop {
  width: 100%;
  height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: float;
  z-index: 0;

  .bg {
    width: 100%;
    height: 1rem;
    // background-color: black;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -2;
    overflow: hidden;
    filter: blur(30px);

    img {
      width: 100%;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.icon {
  width: 0.5rem;
  height: 0.5rem;
  fill: #fff;
}

.icon_back {
  width: 0.8rem;
  height: 0.8rem;
  fill: #fff;
}

.back_btn {
  transform: translateY(3%);
}

.musicitemtop span {
  font-size: 0.4rem;
}

.musicitemtop .left,
.musicitemtop .right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.musicitemtop .right {
  margin-right: 0.2rem;
}

.search_btn {
  margin-right: 0.5rem;
}

.musicitemtop span {
  margin-left: 0.4rem;
  color: #fff;
}

.back_img img {
  position: fixed;
  top: 0;
  width: 100%;
  height: auto;
  filter: blur(30px);
  z-index: -1;
}

.musicItemContent {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.musicItemContent .cover {
  /* width: 2rem;
    height: 2rem; */
  position: relative;
  width: 30%;
  margin: 0 0.2rem;
}
.musicItemContent .cover .playCount {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  font-size: 0.2rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.1rem 0 0.1rem;
  background-color: rgba(115, 115, 115, 0.4);
  border-radius: 0.1rem;

  .icon {
    color: #fff;
    width: 0.2rem;
    height: 0.2rem;
  }
}

.musicItemContent .cover img {
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
}

.musicItemContent .info {
  box-sizing: border-box;
  /* flex: 7; */
  width: 70%;
  margin-right: 0.2rem;
}

.musicItemContent .info .auth {
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: left;
}

.musicItemContent .info h3 {
  font-size: 0.3rem;
  color: #fff;
}

.musicItemContent .info img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.musicItemContent .info span {
  font-size: 0.2rem;
  color: rgb(214, 210, 210);
  margin-left: 0.2rem;
}

.musicItemContent .info .desc {
  display: flex;
  align-items: center;
}

.musicItemContent .info p {
  width: 100%;
  font-size: 0.2rem;
  color: rgb(214, 210, 210);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  padding-right: 0.2rem;
}

.right_arr {
  width: 0.2rem;
  height: 0.2rem;
  fill: rgb(214, 210, 210);
}

.musicItemBottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
  transform: translateY(20%);
}

.musicItemBottom .op_item {
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0;
}

.musicItemBottom .op_item .icon {
  width: 0.7rem;
  height: 0.7rem;
}

.musicItemBottom .op_item .icon svg {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}

.musicItemBottom .op_item span {
  color: #fff;
  font-size: 0.3rem;
  text-decoration: none;
}
</style>
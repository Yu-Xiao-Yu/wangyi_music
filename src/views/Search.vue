<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou" />
    </svg>
    <van-search
      class="sreach"
      v-model="searchKey"
      placeholder="好久不见  陈奕迅"
      shape="round"
      @search="onSearch"
    />
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span
      v-for="item in keyWorldList"
      :key="item"
      class="spanKey"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="deHistory">
      <use xlink:href="#icon-shanchu" />
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.ar" :key="index">
            {{ item1.name }}
          </span>
        </div>
      </div>
      <div class="itemRight">
        <svg aria-hidden="true" class="icon bofang" v-if="item.mv != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg aria-hidden="true" class="icon liebiao">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/home";
export default {
  //   setup() {
  //     const value = ref("");
  //     return { value };
  //   },
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList")) || [];
  },
  methods: {
    async onSearch() {
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey);
        //去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        //固定长度
        if (this.keyWorldList.length > 8) {
          this.keyWorldList.pop();
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        let res = await getSearchMusic(this.searchKey);
        console.log("搜索", res);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    deHistory() {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    async searchHistory(item) {
      let res = await getSearchMusic(item);
      console.log("历史", res);
      this.searchList = res.data.result.songs;
    },
    updateIndex(item) {
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  .sreach {
    width: 100%;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: #999;
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.35rem;
    height: 0.35rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
  width: 100%;
  padding: 0.2rem;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
        margin-left: 0.3rem;
      }
    }
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
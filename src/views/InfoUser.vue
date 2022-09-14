<template>
  <div class="User">
    <img :src="user.data.profile.avatarUrl" alt="" class="user_img" />
    <div class="user_name">{{ user.data.profile.nickname }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.User {
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .user_img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .user_name {
    font-weight: 700;
    font-size: 0.4rem;
  }
}
</style>
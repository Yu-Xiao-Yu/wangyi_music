<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="password"
        class="password"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from "@/request/api/home";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      // console.log("登录", res);
      if (res.data.code === 200) {
        //如果code返回200，则登录成功
        this.$store.commit("/updateIsLogin", true);
        let result = await getLoginUser(res.data.account.id);
        this.$store.commit("/updateToken", res.data.token);
        this.$store.commit("/updateUser", result);
        this.$router.push("/info_user");
      } else {
        res.message;
      }
    },
  },
};
</script>

<style>
</style>
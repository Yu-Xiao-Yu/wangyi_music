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
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    Login() {
      let res = this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      console.log("登录", res);
      if (res.data.code === 200) {
        this.$store.commit("/updateIsLogin", true);
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
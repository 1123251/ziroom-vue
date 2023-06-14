<template>
  <div id="elmenu">
    <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/renthouse">租房</el-menu-item>
    <el-menu-item index="#">自如寓</el-menu-item>
    <el-menu-item index="#">自如驿</el-menu-item>
    <el-menu-item index="#">服务</el-menu-item>
    <el-menu-item index="#">加入我们</el-menu-item>
    <el-menu-item index="#">App下载</el-menu-item>
    <el-menu-item index="#">成为房东</el-menu-item>
    <el-menu-item index="/login">登录</el-menu-item> 
    <el-menu-item index="/register">注册</el-menu-item>
    <span id="my-span">当前登录:{{this.LoginName}}</span>
    <el-button type="danger" icon="el-icon-delete" circle @click="exit" id="exit"></el-button>
</el-menu>

  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
      return {
        LoginName:{},
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      exit(){
        this.cookie.clearCookie("LoginName");
        this.cookie.clearCookie("openId");
        this.$router.push("/");
      }
    },
    mounted(){
        this.LoginName=this.cookie.getCookie("LoginName")
    }
}
</script>
<style>
#my-span {
        font-size: 18px;
        font-weight: bold;
    }
    #exit{
        margin-left: 100px;
    }
</style>


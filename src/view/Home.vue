<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="logo">
          <div class="logo_img">
            <img src="../assets/logo.png" alt="" />
          </div>
          <h3>后台管理系统</h3>
        </div>
        <div class="news_box">
          <div class="userinfo">
            <div class="pain">
              <i
                class="el-icon-user-solid"
                v-show="!$store.state.userinfo.user_pic"
              ></i>
              <img
                :src="$store.state.userinfo.user_pic"
                alt=""
                v-show="$store.state.userinfo.user_pic"
              />
            </div>
            <h5>{{ $store.state.userinfo.username }}</h5>
          </div>
          <el-button type="info" icon="el-icon-switch-button" @click="Sign"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            background-color="#b1c6f2"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document-copy"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-menu"></i>
                  <span>文章类别</span>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-menu"></i>
                  <span>文章列表</span>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <i class="el-icon-menu"></i>
                  <span>发表文章</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/update">
                  <i class="el-icon-menu"></i>
                  <span>修改资料</span>
                </el-menu-item>
                <el-menu-item index="/home/reset">
                  <i class="el-icon-menu"></i>
                  <span>重置密码</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
    this.Userinfo();
  },
  methods: {
    Sign() {
      sessionStorage.removeItem("token");
      this.$router.replace("/");
    },
    async Userinfo() {
      const { data: res } = await this.$http.get("/my/userinfo");
      if (res.status !== 200) {
        this.$message({
          type: "error",
          msg: "获取用户信息失败",
        });
        return;
      }
      this.$store.commit("User", res.data);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #a3bcef;
}
.logo {
  display: flex;
  align-items: center;
}
.logo_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  margin-right: 5px;
}
.logo_img img {
  width: 100%;
  height: 100%;
}
.logo h3 {
  color: #fff;
}
.news_box {
  display: flex;
}
.userinfo {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.pain {
  font-size: 28px;
  text-align: center;
  overflow: hidden;
}
.pain img {
  width: 100%;
  height: 100%;
}
.news_box .pain {
  width: 40px;
  height: 40px;
  /* background-color: aqua; */
  border-radius: 50%;
  margin-right: 5px;
  border: 2px solid #fff;
}
.el-aside {
  background-color: #b1c6f2;
}
::v-deep .el-submenu__title i {
  color: #fff !important;
}
.el-menu {
  border: none;
}
.el-icon-menu {
  color: #fff;
}
</style>
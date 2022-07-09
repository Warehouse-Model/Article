<template>
  <div class="container">
    <div class="box">
      <div class="box_left">
        <div class="title">
          <h2 style="margin-bottom: 8px">Welcome</h2>
          <h3>后台管理系统</h3>
        </div>
      </div>
      <div class="box_right">
        <div class="portrait">
          <div class="min_box">
            <img src="../assets/logo.png" alt="" />
          </div>
        </div>
        <el-form ref="form" label-width="0px">
          <el-form-item>
            <el-input prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
        </el-form>
        <div class="register">
          <a href="#" @click="show = !show">账户注册</a>
        </div>
        <el-button class="login" type="primary">登录</el-button>

        <div class="reg_box" v-if="show">

          <h3 style="color:#000">用户注册</h3>
          <el-form ref="form" label-width="0px">
            <el-form-item >
              <el-input prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input prefix-icon="el-icon-lock" placeholder="确认密码"></el-input>
            </el-form-item>
          </el-form>
            <el-button type="primary" style="width:100%">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      show: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.container {
  height: 100%;
  background-image: linear-gradient(25deg, #d1c9ee, #84b4ef);
}
.box {
  display: flex;
  width: 640px;
  height: 350px;
  background: #f1f2f6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  box-shadow: 0 0 5px #ccc;
  overflow: hidden;
}
.box_left,
.box_right {
  width: 50%;
  height: 100%;
}
.box_left {
  background-image: linear-gradient(25deg, #d1c9ee, #84b4ef);
}
.title {
  margin-top: 130px;
}
.title h2,
h3 {
  color: #fff;
  text-align: center;
}
.box_right {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}
.portrait {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-image: linear-gradient(25deg, #d1c9ee, #84b4ef);
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.min_box {
  width: 90%;
  height: 90%;
  background: #fff;
  border-radius: 50%;
  overflow: hidden;
}
.min_box img {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  font-size: 12px;
  color: #66b1ff;
}
.register {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 15px;
  padding-right: 5px;
  box-sizing: border-box;
}
.login {
  width: 100%;
}
.reg_box {
  position: absolute;
  top: 0;
  left: 0;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background: #f1f2f6;
  padding: 10px;
  box-sizing: border-box;
}

</style>
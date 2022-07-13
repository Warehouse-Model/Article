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
        <el-form ref="form" label-width="0px" :rules="check" :model="rulesForm">
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="rulesForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="rulesForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="register">
          <a href="#" @click="Register">账户注册</a>
        </div>
        <el-button class="login" type="primary" @click="Login">登录</el-button>

        <div class="reg_box" v-show="show">
          <h3 style="color: #000; margin-bottom: 20px">用户注册</h3>
          <el-form
            ref="logon"
            label-width="0px"
            :rules="rules"
            :model="regisForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="regisForm.username"
                prefix-icon="el-icon-user"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="regisForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPass">
              <el-input
                v-model="regisForm.confirmPass"
                prefix-icon="el-icon-lock"
                placeholder="确认密码"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="login_btn">
            <a href="#" @click="Logins">去登陆</a>
          </div>
          <el-button type="primary" style="width: 100%" @click="Regi"
            >注册</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validPass = (rulse, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regisForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      rulesForm: {
        username: "",
        password: "",
      },
      regisForm: {
        username: "",
        password: "",
        confirmPass: "",
      },
      check: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3~5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6~12个字符", trigger: "blur" },
        ],
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3~5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6~12个字符", trigger: "blur" },
        ],
        confirmPass: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validPass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    Logins() {
      this.show = !this.show;
      this.$refs.logon.resetFields();
    },
    Register() {
      this.show = !this.show;
      this.$refs.form.resetFields();
    },
    // 用户注册
    Regi() {
      this.$refs.logon.validate(async (v) => {
        if (!v) return;
        const { data: res } = await this.$http.post("/api/reguser", {
          username: this.regisForm.username,
          password: this.regisForm.password,
        });
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.msg,
          });
          return;
        }
        this.$message({
          type: "success",
          message: res.msg,
        });
      });
    },

    // 用户登录
    Login() {
      this.$refs.form.validate(async (v) => {
        if (!v) return;
        const {data:res} = await this.$http.post("/api/login", {
          username: this.rulesForm.username,
          password: this.rulesForm.password,
        });
        if(res.status!==200){
          this.$message({
            type:'error',
            message:res.msg
          })
          return
        }
        sessionStorage.setItem('token',res.token)
        this.$message({
          type:'success',
          message:res.msg
        })
      });
    },
  },
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
  width: 100%;
  height: 100%;
  background: #f1f2f6;
  padding: 20px 15px;
  box-sizing: border-box;
}
.login_btn {
  margin-bottom: 15px;
  margin-left: 5px;
}
</style>
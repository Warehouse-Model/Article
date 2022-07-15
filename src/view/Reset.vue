<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>重置密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2>重置密码</h2>
      <el-form
        ref="ruleForms"
        :model="Info"
        :rules="Resues"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input
            placeholder="请输入旧密码"
            type="password"
            v-model="Info.oldPwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input
            placeholder="请输入新密码"
            type="password"
            v-model="Info.newPwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="fixPwd">
          <el-input
            placeholder="请确认新密码"
            type="password"
            v-model="Info.fixPwd"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="Resetting">重置密码</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validPass = (rulse, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.Info.newPwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var Diffs = (rulse, value, callback) => {
      if (value == this.Info.oldPwd) {
        callback(new Error("新密码不能与旧密码一致"));
      } else {
        callback();
      }
    };
    return {
      Info: {},
      Resues: {
        oldPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 ~ 12 个字符", trigger: "blur" },
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 ~ 12 个字符", trigger: "blur" },
          { validator: Diffs, trigger: "blur" },
        ],
        fixPwd: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validPass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    Resetting() {
      this.$refs.ruleForms.validate(async (v) => {
        if (!v) return;
        const { data: res } = await this.$http.post("/my/updatepwd", {
          id: this.$store.state.userinfo.id,
          oldPwd: this.Info.oldPwd,
          newPwd: this.Info.newPwd,
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
        setTimeout(()=>{
           this.$router.replace('/')
        },300)
      });
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #a9a5a0;
}
.btn {
  display: flex;
  flex-direction: row-reverse;
}
</style>
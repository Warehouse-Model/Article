<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改资料</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2>修改个人资料</h2>
      <div class="from_box">
        <el-form
          ref="ruleForms"
          :model="userinfo"
          :rules="Resues"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userinfo.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userinfo.email"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/file/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img
                v-if="userinfo.user_pic"
                :src="userinfo.user_pic"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <div class="btn">
          <el-button type="primary" @click="Keep">保存修改</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Update",

  data() {
    var checkEmail = (rule, value, ck) => {
      var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email.test(value)) {
        return ck();
      }
      ck(new Error("请输入合法邮箱"));
    };
    return {
      userinfo: {},
      Resues: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 ~ 5 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.Userinfo();
  },
  methods: {
    async Userinfo(v) {
      const { data: res } = await this.$http.get("/my/userinfo");
      if (res.status !== 200) {
        this.$message({
          type: "error",
          msg: "获取用户信息失败",
        });
        return;
      }
      if(v){
        this.$store.commit('User',res.data)
        return
      }
      this.userinfo = res.data;
    },
    handleAvatarSuccess(res) {
      if (res.status !== 200) {
        this.$message({
          type: "error",
          message: "上传失败,请稍后再试",
        });
        return;
      }
      this.userinfo.user_pic = res.url;
    },
    
    Keep() {
      this.$refs.ruleForms.validate(async (v) => {
        if (!v) return;
        const {data:res} = await this.$http.post("/my/userinfo", {
          id: this.userinfo.id,
          username: this.userinfo.username,
          url: this.userinfo.user_pic,
          email: this.userinfo.email,
        });
        if(res.status!==200){
          this.$message({
            type:"error",
            message:res.msg
          })
          return
        }
        this.$message({
          type:'success',
          message:res.msg
        })
        this.Userinfo(1)
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
.from_box {
  width: 100%;
}
.btn {
  display: flex;
  flex-direction: row-reverse;
}
</style>
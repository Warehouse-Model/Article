<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/home/artilist'}">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>修改文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>文章标题</span>
          <el-input v-model="title" placeholder="请输入文章标题"></el-input>
        </el-col>
        <el-col :span="8">
          <span>文章类别</span>
          <el-select v-model="value" placeholder="请选择文章类别">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>上传文章封面</span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3000/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>

      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        /><Editor
          style="height: 370px; overflow-y: hidden"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
          v-model="html"
        />
      </div>
      <div class="btn">
        <el-button type="primary" @click="Uplish">修改文章</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: {
        MENU_CONF: {
          uploadImage: {
            server: "http://127.0.0.1:3000/file/upload",
            fieldName: "file",
          },
        },
        autoFocus: false,
      },
      mode: "default",
      // data数据
      imageUrl: "",
      title: "",
      options: [],
      value: "",
    };
  },
  components: { Editor, Toolbar },

  mounted() {
    this.ListType();
    this.$route.query.id && this.UpdateArti(this.$route.query.id);
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor);

      this.editor.getMenuConfig("uploadImage").customInsert = function (
        res,
        insertFn
      ) {
        insertFn(res.url);
      };
      this.toolbarConfig = {
        excludeKeys: [
          "group-video",
          "insertImage",
          "redo",
          "todo",
          "fullScreen",
          "bgColor",
          "group-indent",
          "code",
          "emotion",
        ],
      };
    },

    async ListType() {
      const { data: res } = await this.$http.get("/my/article/cates");
      if (res.status !== 200) {
        this.$message({
          type: "error",
          message: "获取文章分类失败",
        });
        return;
      }
      this.options = res.date;
    },
    handleAvatarSuccess(res) {
      if (res.errno !== 0) {
        this.$message({
          type: "error",
          msg: "上传失败",
        });
        return;
      }
      this.imageUrl = res.url;
    },

    async UpdateArti(id) {
        this.showId=id
      const { data: res } = await this.$http.get("/my/article/details/" + id);
      if (res.status !== 200) {
        this.$message({
          type: "error",
          message: res.msg,
        });
        return;
      }

      this.title = res.data.title;
      this.value = res.data.cate_id;
      this.imageUrl = res.data.cover_img;
      this.editor.setHtml(res.data.content);
    },
    async Uplish() {
      if (!this.title) {
        this.$message({
          type: "error",
          message: "文章标题不能空",
        });
        return;
      }
      if (!this.value) {
        this.$message({
          type: "error",
          message: "请选择文章类别",
        });
        return;
      }
      if (!this.imageUrl) {
        this.$message({
          type: "error",
          message: "请上传文章封面",
        });
        return;
      }
      let content = this.editor.getHtml();

      // let reg = /<p>/gim;
      // let regs = /<\/p>/gim;
      let regse = /<p><br><\/p>/;
      do {
        content = content
          // .replace(reg, "")
          // .replace(regs, "\n")
          .replace(regse, "");
      } while (regse.test(content));
      console.log(content);

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      let time =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day) +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (minute < 10 ? "0" + minute : minute) +
        "-" +
        (second < 10 ? "0" + second : second);
      const { data: res } = await this.$http.post(
        "/my/article/details/" + this.showId,
        {
          title: this.title,
          cate_id: this.value,
          content: content,
          cover_img: this.imageUrl,
          pub_date: time,
          author_id: this.$store.state.userinfo.id,
        }
      );
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
    },
  },
};
</script>

<style scoped>
.btn {
  margin-top: 10px;
}
.avatar-uploader-icon {
  font-size: 25px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.el-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.el-col {
  display: flex;
  align-items: center;
}
.el-col span {
  display: inline-block;
  text-align: center;
  width: 100px;
  color: #595959;
}
.avatar-uploader {
  margin-left: 5px;
}
</style>
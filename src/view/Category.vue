<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章类别</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input placeholder="请输入分类名称" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = !dialogVisible"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <el-table border stripe style="width: 100%" :data="sort">
        <el-table-column type="index" label="序号" width="120">
        </el-table-column>
        <el-table-column label="文章分类" prop="name"> </el-table-column>
        <el-table-column label="分类别名" prop="alias"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="EditMath(scope.row.id)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="Delete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="dialogVisible" width="45%">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="AddDate"
          label-width="70px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="分类名称" prop="name">
            <el-input
              placeholder="请输入分类名称"
              v-model="AddDate.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="alias">
            <el-input
              placeholder="请输入分类别名"
              v-model="AddDate.alias"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="AddInfo">添 加</el-button>
        </span>
      </el-dialog>
      <!-- 编辑分类 -->
      <el-dialog title="编辑分类" :visible.sync="editorVisible" width="45%">
        <el-form
          ref="editForm"
          :rules="editRules"
          :model="EditDate"
          label-width="70px"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <el-form-item label="分类名称" prop="name">
            <el-input
              placeholder="请输入分类名称"
              v-model="EditDate.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="alias">
            <el-input
              placeholder="请输入分类别名"
              v-model="EditDate.alias"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Editcancel">取 消</el-button>
          <el-button type="primary" @click="UpadateEdit">保 存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var Alias = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("别名不能为空"));
      }
      const reg = /^[a-zA-Z]{3,16}$/;
      if (!reg.test(value)) {
        callback(new Error("别名建议使用3~16位英文字母"));
      } else {
        callback();
      }
    };
    return {
      sort: [],
      dialogVisible: false,
      editorVisible: false,
      AddDate: {},
      EditDate: {},
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 ~ 5 个字符", trigger: "blur" },
        ],
        alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 ~ 16 个字符", trigger: "blur" },
          { validator: Alias, trigger: "blur" },
        ],
      },
      editRules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 ~ 5 个字符", trigger: "blur" },
        ],
        alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 ~ 16 个字符", trigger: "blur" },
          { validator: Alias, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.ListType();
  },
  methods: {
    async ListType() {
      const { data: res } = await this.$http.get("/my/article/cates");
      if (res.status !== 200) {
        this.$message({
          type: "error",
          message: "获取文章分类失败",
        });
        return;
      }
      this.sort = res.date;
    },
    // 添加分类
    AddInfo() {
      this.$refs.ruleForm.validate(async (v) => {
        if (!v) return;
        const { data: res } = await this.$http.post(
          "/my/article/addcates",
          this.AddDate
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
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
        this.ListType();
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },

    // 编辑分类查询
    async EditMath(id) {
      this.editorVisible = true;
      const { data: res } = await this.$http.get(`/my/article/cates/${id}`);
      this.EditDate = res.date;
    },

    // 编辑修改分类
    UpadateEdit() {
      this.$refs.editForm.validate(async (v) => {
        if (!v) return;
        const { data: res } = await this.$http.post(
          `/my/article/updatecate/${this.EditDate.id}`,
          { name: this.EditDate.name, alias: this.EditDate.alias }
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
        this.editorVisible = false;
        this.ListType()
      });
    },
    Editcancel() {
      this.editorVisible = false;
      this.$refs.editForm.resetFields();
    },
    // 删除分类
    Delete(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.get(
            `/my/article/deletecates/${id}`
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
            message: "删除成功!",
          });
          this.ListType();
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
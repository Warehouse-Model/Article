<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table stripe style="width: 100%" border :data="listDate">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱">
          <template slot-scope="scope">
            <span v-if="scope.row.email">{{ scope.row.email }}</span>
            <el-tag type="warning" v-if="!scope.row.email">暂未设置</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="头像">
          <template slot-scope="scope">
            <el-avatar
              size="medium"
              :src="scope.row.user_pic"
              v-if="scope.row.user_pic"
            ></el-avatar>
            <el-tag type="warning" v-if="!scope.row.user_pic">暂未设置</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="状态">
          <el-switch
            v-model="value"
            active-color="#13ce66"
           
          >
          </el-switch>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listDate: [],
      value: true,
    };
  },
  mounted() {
    this.Users();
  },
  methods: {
    async Users() {
      const { data: res } = await this.$http.get("my/users/list");
      if (res.status !== 200) {
        this.$message({
          type: "error",
          message: res.msg,
        });
        return;
      }
      console.log(res);
      this.listDate = res.data;
    },
  },
};
</script>

<style>
</style>
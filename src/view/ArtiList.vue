<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table stripe border style="width: 100%" :data="tableData">
        <el-table-column type="index" label="序列" width="80">
        </el-table-column>
        <el-table-column label="文章标题" prop="title"> </el-table-column>
        <el-table-column label="文章作者" prop="author_id"> </el-table-column>
        <el-table-column label="发布时间" prop="pub_date"> </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.cate_id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.cover_img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看修改"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="EditArti(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="DeleArti(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[4, 6]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      size: 4,
      page: 1,
      num: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get(
        `/my/article/list?size=${this.size}&page=${this.page}`
      );
      if (res.status !== 200) {
        this.$message({
          type: "error",
          message: "数据查询错误",
        });
        return;
      }
      this.tableData = res.data;
      this.num = res.num;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    DeleArti(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post("/my/article/artidel", {
            id: id,
          });

          if (res.status !== 200) {
            this.$message({
              type: "error",
              message: res.msg,
            });
            return;
          }
          let deleteAfterPage = Math.ceil((this.num - 1) / this.size);
          let currentPage =
            this.page > deleteAfterPage ? deleteAfterPage : this.page;
          this.page = currentPage < 1 ? 1 : currentPage;
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    EditArti(id) {
      this.$router.replace("/home/modify?id=" + id);
    },
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
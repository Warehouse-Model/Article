<template>
  <div>
    <div class="box">
      <div class="box_img">
        <img src="../assets/img/404.png" alt="" />
      </div>
      <h4>您访问的页面不存在......</h4>
      <div class="foot">
        <ul>
          <li>您输入网址不正确</li>
          <li>所访问页面已经被移除</li>
        </ul>
      </div>
      <div class="btn" @click="$router.replace('/')">返回首页</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  width: 500px;
  margin: 0 auto;
  padding-top: 60px;
}
.box_img {
  width: 75%;
  height:320px;
  margin: 0 auto;
}
.box_img img {
  width: 100%;
  height: 100%;
}
.box h4 {
  text-align: center;
  margin-bottom: 20px;
}
.foot {
  width: 35%;
  height: 25%;
  margin: 0 auto;
}
ul {
  width: 100%;
}
li {
  text-align: center;
  color: #a9a5a0;
  line-height: 25px;
}
.btn {
  width: 85px;
  height: 35px;
  margin: 0 auto;
  margin-top: 20px;
  background: #0798e6;
  color: #fff;
  text-align: center;
  line-height: 35px;
  border-radius: 3px;
  font-size: 14px;
}
.btn:hover{
    background:#047aba ;
    cursor: pointer;
}
</style>
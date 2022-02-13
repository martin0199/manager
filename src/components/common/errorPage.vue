<template>
  <div class="error-page">
    <el-card class="error-card">
      <img src="@/assets/img/wait.png" alt="blank" />
      <div class="error-msg">敬请期待</div>
    </el-card>
  </div>
</template>

<style scoped>
.error-page {
  height: 100%;
}

.error-card {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-msg {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #b2b2b2;
}
</style>
